import { join, dirname, basename, relative } from 'path';
import {
	existsSync,
	mkdirSync,
	renameSync,
	readdirSync,
	statSync,
	readFileSync,
	writeFileSync,
	unlinkSync,
} from 'fs';
import {
	generateAssetFileContent,
	generateFileHash,
	extractWordPressDependencies,
	moveFile,
	getAllFiles,
} from '../utils/index.js';
import {
	fixCssFiles,
	cleanupCssComments,
	removeCSSImportComments,
} from '../utils/index.js';
import { CHUNK_PATTERNS, WORDPRESS_FILES } from '../../constants.js';

/**
 * Updates import paths in files based on a mapping
 * @param {string} filePath - Path to the file to update
 * @param {Object} mappings - Object mapping old paths to new paths
 */
function updateImportPathsWithMappings(filePath, mappings) {
	try {
		const content = readFileSync(filePath, 'utf8');
		let updatedContent = content;

		// Update import paths for each mapping
		for (const [oldPath, newPath] of Object.entries(mappings)) {
			const oldName = basename(oldPath, '.js');
			const newName = basename(newPath, '.js');

			// Update relative imports pointing to the old file
			const importRegex = new RegExp(
				`import\\s+(.+?)\\s+from\\s+['"](.\/)?${oldName}(\\.js)?['"]`,
				'g'
			);
			updatedContent = updatedContent.replace(
				importRegex,
				(match, imports, prefix, extension) => {
					const relativePath = relative(
						dirname(filePath),
						dirname(newPath)
					);
					const newImportPath = relativePath
						? `${relativePath}/${newName}`
						: `./${newName}`;
					return `import ${imports} from '${newImportPath}'`;
				}
			);
		}

		if (updatedContent !== content) {
			writeFileSync(filePath, updatedContent, 'utf8');
		}
	} catch (error) {
		console.warn(
			`⚠️  Failed to update import paths in ${filePath}:`,
			error.message
		);
	}
}

/**
 * Updates import paths for files in their final locations
 * @param {string} filePath - Path to the file to update
 * @param {string} buildRoot - Build root directory
 * @param {string} editorDir - Editor directory
 */
function updateImportPathsForFinalLocation(filePath, buildRoot, editorDir) {
	try {
		const content = readFileSync(filePath, 'utf8');
		let updatedContent = content;
		const fileDir = dirname(filePath);
		const isInEditorDir = filePath.includes(editorDir);

		// Common chunks that might be referenced
		const chunkMappings = {
			'react-runtime': join(buildRoot, 'react-runtime.js'),
			'editor-dependencies': join(editorDir, 'editor-dependencies.js'),
			'wp-editor': join(editorDir, 'wp-editor.js'),
		};

		for (const [chunkName, chunkPath] of Object.entries(chunkMappings)) {
			if (existsSync(chunkPath)) {
				const importRegex = new RegExp(
					`import\\s+(.+?)\\s+from\\s+['"](.\/)?${chunkName}(\\.js)?['"]`,
					'g'
				);

				updatedContent = updatedContent.replace(
					importRegex,
					(match, imports, prefix, extension) => {
						const relativePath = relative(fileDir, chunkPath);
						return `import ${imports} from '${relativePath}'`;
					}
				);
			}
		}

		if (updatedContent !== content) {
			writeFileSync(filePath, updatedContent, 'utf8');
		}
	} catch (error) {
		console.warn(
			`⚠️  Failed to update final import paths in ${filePath}:`,
			error.message
		);
	}
}

/**
 * Generates WordPress asset files for JavaScript files
 * @param {string[]} allFiles - Array of all files in the output directory
 * @param {string} outputDir - Main output directory
 * @param {string} buildRoot - Build root directory
 */
function generateAssetFiles(allFiles, outputDir, buildRoot) {
	for (const filePath of allFiles) {
		const fileName = basename(filePath);

		// Generate .asset.php files for JavaScript files (excluding certain files)
		if (
			fileName.endsWith('.js') &&
			!fileName.includes('runtime') &&
			!fileName.includes('linkControls') &&
			!fileName.includes('editor-dependencies') &&
			!fileName.includes('style-index') &&
			!fileName.includes('editor-styles') &&
			!fileName.includes('index-css')
		) {
			const assetFileName = fileName.replace('.js', '.asset.php');
			const assetFilePath = join(dirname(filePath), assetFileName);

			// Extract dependencies and generate hash
			const dependencies = extractWordPressDependencies(filePath);
			const version = generateFileHash(filePath);

			// Generate asset file content
			const assetContent = generateAssetFileContent(
				dependencies,
				version
			);

			try {
				writeFileSync(assetFilePath, assetContent, 'utf8');
			} catch (error) {
				console.warn(
					`⚠️  Failed to create asset file ${assetFileName}:`,
					error.message
				);
			}
		}
	}
}

/**
 * Creates a direct output organizer that handles writeBundle phase
 * @param {string} baseOutputDir - Base output directory for blocks
 * @param {string} editorOutputDir - Output directory for editor dependencies
 * @param {Object} inputDirs - Object of input directories (optional, for compatibility)
 * @returns {Function} Function to organize files during writeBundle
 */
export function createDirectOutputOrganizer(
	baseOutputDir,
	editorOutputDir,
	inputDirs = {}
) {
	return function organizeDirectOutput(options, bundle) {
		// Get the build root directory
		const buildRoot = baseOutputDir.split('/')[0]; // 'build' from 'build/blocks'
		const editorDir = editorOutputDir; // Use the provided editor output directory

		// Ensure editor directory exists
		if (!existsSync(editorDir)) {
			mkdirSync(editorDir, { recursive: true });
		}

		// For multi-input setup, we need to process each subdirectory
		const outputDirs =
			Object.keys(inputDirs).length > 0
				? [
						baseOutputDir,
						...Object.keys(inputDirs).map((subDir) =>
							subDir ? join(baseOutputDir, subDir) : baseOutputDir
						),
					]
				: [baseOutputDir];

		// Get all files from all output directories
		const allFiles = [];
		for (const outputDir of outputDirs) {
			if (existsSync(outputDir)) {
				allFiles.push(...getAllFiles(outputDir));
			}
		}

		const filesToMove = [];
		const filesToRemove = [];
		const importPathMappings = {};

		for (const filePath of allFiles) {
			const fileName = basename(filePath);

			// Handle files marked for ROOT
			if (fileName.includes(`${CHUNK_PATTERNS.ROOT_SUFFIX}.js`)) {
				const cleanName = fileName.replace(
					CHUNK_PATTERNS.ROOT_SUFFIX,
					''
				);
				const newPath = join(buildRoot, cleanName);
				filesToMove.push({ from: filePath, to: newPath });
				importPathMappings[filePath] = newPath;
			}

			// Handle files marked for EDITOR
			if (fileName.includes(`${CHUNK_PATTERNS.EDITOR_SUFFIX}.js`)) {
				const cleanName = fileName.replace(
					CHUNK_PATTERNS.EDITOR_SUFFIX,
					''
				);
				const newPath = join(editorDir, cleanName);
				filesToMove.push({ from: filePath, to: newPath });
				importPathMappings[filePath] = newPath;
			}

			// Handle index-css.js files (legacy from previous builds) - remove them as they should now be .css files
			if (fileName === 'index-css.js' && existsSync(filePath)) {
				const relativePath = relative(baseOutputDir, filePath);
				filesToRemove.push(filePath);
				// Only log the first few to avoid spam
				if (filesToRemove.length <= 5) {
					console.log(
						`�️  Removing legacy index-css.js: ${relativePath} (now handled as index.css)`
					);
				}
			}

			// Handle editor-dependencies.css - split it into individual block index.css files
			if (fileName === 'editor-dependencies.css') {
				const relativePath = relative(baseOutputDir, filePath);
				console.log(`🎨 Processing editor dependencies: ${relativePath}`);
				
				try {
					const cssContent = readFileSync(filePath, 'utf8');
					// For now, just ensure the file exists
					// TODO: Implement CSS splitting logic here when needed
					console.log(`📊 Editor dependencies size: ${Math.round(statSync(filePath).size / 1024)}KB`);
				} catch (error) {
					console.warn(`⚠️  Failed to process editor dependencies:`, error.message);
				}
			}

			// Move manifest.json and editor.deps.json to build root
			if (
				fileName === 'manifest.json' ||
				fileName === 'editor.deps.json'
			) {
				const newPath = join(buildRoot, fileName);
				filesToMove.push({ from: filePath, to: newPath });
			}
		}

		// Remove duplicate entries from filesToMove and filesToRemove arrays
		const seenMovePaths = new Set();
		const seenRemovePaths = new Set();

		const uniqueFilesToMove = filesToMove.filter((fileMove) => {
			const key = `${fileMove.from}→${fileMove.to}`;
			if (!seenMovePaths.has(key)) {
				seenMovePaths.add(key);
				return true;
			}
			return false;
		});

		const uniqueFilesToRemove = filesToRemove.filter((filePath) => {
			if (!seenRemovePaths.has(filePath)) {
				seenRemovePaths.add(filePath);
				return true;
			}
			return false;
		});

		console.log(
			`📋 Files to move: ${uniqueFilesToMove.length}, Files to remove: ${uniqueFilesToRemove.length}`
		);

		// Step 1: Move files to their correct locations
		for (const { from, to } of uniqueFilesToMove) {
			try {
				moveFile(from, to);
				console.log(
					`✅ Moved: ${basename(from)} → ${relative(baseOutputDir, dirname(to))}/`
				);
			} catch (error) {
				console.warn(
					`⚠️  Failed to move ${basename(from)}:`,
					error.message
				);
			}
		}

		// Step 1.5: Remove redundant files
		for (const filePath of uniqueFilesToRemove) {
			try {
				if (existsSync(filePath)) {
					unlinkSync(filePath);
					console.log(
						`🗑️  Removed: ${relative(baseOutputDir, filePath)}`
					);
				}
			} catch (error) {
				console.warn(
					`⚠️  Failed to remove ${basename(filePath)}:`,
					error.message
				);
			}
		}

		// Step 2: Update import paths in remaining files
		for (const outputDir of outputDirs) {
			if (existsSync(outputDir)) {
				const remainingFiles = getAllFiles(outputDir);
				for (const filePath of remainingFiles) {
					if (basename(filePath).endsWith('.js')) {
						updateImportPathsWithMappings(
							filePath,
							importPathMappings
						);
					}
				}
			}
		}

		// Step 3: Update import paths for moved files in their new locations
		for (const { to } of uniqueFilesToMove) {
			if (existsSync(to) && basename(to).endsWith('.js')) {
				updateImportPathsForFinalLocation(to, buildRoot, editorDir);
			}
		}

		// Step 4: Generate WordPress asset files
		const finalFiles = [];
		for (const outputDir of outputDirs) {
			if (existsSync(outputDir)) {
				finalFiles.push(...getAllFiles(outputDir));
			}
		}
		finalFiles.push(
			...getAllFiles(buildRoot).filter((f) => f.endsWith('.js')),
			...getAllFiles(editorDir).filter((f) => f.endsWith('.js'))
		);
		generateAssetFiles(finalFiles, baseOutputDir, buildRoot);

		// Step 5: Fix CSS files in all output directories
		for (const outputDir of outputDirs) {
			if (existsSync(outputDir)) {
				fixCssFiles(outputDir);
			}
		}

		// Step 6: Clean up CSS comments in all output directories
		for (const outputDir of outputDirs) {
			if (existsSync(outputDir)) {
				cleanupCssComments(outputDir);
			}
		}
	};
}
