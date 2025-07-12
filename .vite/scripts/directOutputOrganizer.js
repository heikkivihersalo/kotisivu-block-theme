import { join, dirname, basename, relative } from 'path';
import {
	existsSync,
	mkdirSync,
	renameSync,
	readdirSync,
	statSync,
	readFileSync,
	writeFileSync,
} from 'fs';
import { createHash } from 'crypto';

/**
 * Generates WordPress asset file content
 * @param {string[]} dependencies - Array of WordPress dependencies
 * @param {string} version - Version hash for the file
 * @returns {string} PHP asset file content
 */
function generateAssetFileContent(dependencies, version) {
	const depsString = dependencies.map((dep) => `'${dep}'`).join(', ');
	return `<?php return array('dependencies' => array(${depsString}), 'version' => '${version}');`;
}

/**
 * Generates a hash for file versioning
 * @param {string} filePath - Path to the file to hash
 * @returns {string} Hash string
 */
function generateFileHash(filePath) {
	try {
		const content = readFileSync(filePath, 'utf8');
		return createHash('md5').update(content).digest('hex').substring(0, 16);
	} catch (error) {
		// Fallback to timestamp-based hash if file reading fails
		return createHash('md5')
			.update(Date.now().toString())
			.digest('hex')
			.substring(0, 16);
	}
}

/**
 * Extracts WordPress dependencies from JavaScript file content
 * @param {string} filePath - Path to the JavaScript file
 * @returns {string[]} Array of WordPress dependencies
 */
function extractWordPressDependencies(filePath) {
	const commonWordPressDeps = [
		'wp-blocks',
		'wp-block-editor',
		'wp-components',
		'wp-compose',
		'wp-data',
		'wp-element',
		'wp-hooks',
		'wp-i18n',
		'wp-primitives',
		'wp-rich-text',
		'wp-server-side-render',
		'wp-url',
		'wp-api-fetch',
		'wp-html-entities',
		'wp-keycodes',
		'wp-notices',
		'wp-viewport',
	];

	try {
		const content = readFileSync(filePath, 'utf8');
		const foundDeps = [];

		// Check for WordPress globals usage
		if (content.includes('wp.')) {
			// Extract wp.* usage patterns
			const wpMatches = content.match(/wp\.([a-zA-Z][a-zA-Z0-9]*)/g);
			if (wpMatches) {
				wpMatches.forEach((match) => {
					const wpModule = match.replace('wp.', 'wp-');
					// Convert camelCase to kebab-case
					const kebabCase = wpModule
						.replace(/([A-Z])/g, '-$1')
						.toLowerCase();
					if (
						commonWordPressDeps.includes(kebabCase) &&
						!foundDeps.includes(kebabCase)
					) {
						foundDeps.push(kebabCase);
					}
				});
			}
		}

		// Check for @wordpress/ imports
		const wpImportMatches = content.match(/@wordpress\/([a-z-]+)/g);
		if (wpImportMatches) {
			wpImportMatches.forEach((match) => {
				const wpDep = match.replace('@wordpress/', 'wp-');
				if (
					commonWordPressDeps.includes(wpDep) &&
					!foundDeps.includes(wpDep)
				) {
					foundDeps.push(wpDep);
				}
			});
		}

		// Add React if JSX is detected
		if (
			content.includes('jsxDEV') ||
			content.includes('jsx') ||
			content.includes('React')
		) {
			if (!foundDeps.includes('react')) {
				foundDeps.unshift('react');
			}
		}

		// Ensure essential WordPress dependencies are included for blocks
		const essentialDeps = ['wp-blocks', 'wp-block-editor', 'wp-i18n'];
		essentialDeps.forEach((dep) => {
			if (!foundDeps.includes(dep)) {
				foundDeps.push(dep);
			}
		});

		return foundDeps.sort();
	} catch (error) {
		console.warn(
			`⚠️  Could not analyze dependencies for ${filePath}:`,
			error.message
		);
		// Return default WordPress block dependencies
		return ['react', 'wp-block-editor', 'wp-blocks', 'wp-i18n'];
	}
}

/**
 * Moves files from source to destination directory
 * @param {string} source - Source file path
 * @param {string} destination - Destination file path
 */
function moveFile(source, destination) {
	const destDir = dirname(destination);
	if (!existsSync(destDir)) {
		mkdirSync(destDir, { recursive: true });
	}
	renameSync(source, destination);
}

/**
 * Recursively finds all files in a directory
 * @param {string} dir - Directory to search
 * @param {string[]} files - Array to collect file paths
 * @returns {string[]} Array of file paths
 */
function getAllFiles(dir, files = []) {
	if (!existsSync(dir)) return files;

	const dirFiles = readdirSync(dir);
	for (const file of dirFiles) {
		const fullPath = join(dir, file);
		if (statSync(fullPath).isDirectory()) {
			getAllFiles(fullPath, files);
		} else {
			files.push(fullPath);
		}
	}
	return files;
}

/**
 * Creates a direct output organizer that handles writeBundle phase
 * @param {string} outputDir - Main output directory for blocks
 * @param {string} editorOutputDir - Output directory for editor dependencies
 * @returns {Function} Function to organize files during writeBundle
 */
export function createDirectOutputOrganizer(outputDir, editorOutputDir) {
	return function organizeDirectOutput(options, bundle) {
		console.log('🔧 Organizing direct output files...');

		// Get the build root directory
		const buildRoot = outputDir.split('/')[0]; // 'build' from 'build/test/block-library/custom'
		const editorDir = join(buildRoot, 'editor');

		// Ensure editor directory exists
		if (!existsSync(editorDir)) {
			mkdirSync(editorDir, { recursive: true });
		}

		// Get all files in the output directory
		const allFiles = getAllFiles(outputDir);
		const filesToMove = [];
		const importPathMappings = {};

		for (const filePath of allFiles) {
			const fileName = basename(filePath);

			// Handle files marked for ROOT
			if (fileName.includes('__ROOT__.js')) {
				const cleanName = fileName.replace('__ROOT__.js', '.js');
				const newPath = join(buildRoot, cleanName);
				filesToMove.push({ from: filePath, to: newPath, type: 'root' });

				// Calculate relative path from blocks to root
				const relativePathFromBlocks = relative(outputDir, newPath);
				// Map both the full filename and relative imports
				importPathMappings[fileName] = relativePathFromBlocks;
				importPathMappings[`./${fileName}`] =
					`./${relativePathFromBlocks}`;
				importPathMappings[`../${fileName}`] =
					`../${relativePathFromBlocks}`;
			}

			// Handle files marked for EDITOR
			else if (fileName.includes('__EDITOR__.js')) {
				const cleanName = fileName.replace('__EDITOR__.js', '.js');
				const newPath = join(editorDir, cleanName);
				filesToMove.push({
					from: filePath,
					to: newPath,
					type: 'editor',
				});

				// Calculate relative path from blocks to editor
				const relativePathFromBlocks = relative(outputDir, newPath);
				// Map both the full filename and relative imports
				importPathMappings[fileName] = relativePathFromBlocks;
				importPathMappings[`./${fileName}`] =
					`./${relativePathFromBlocks}`;
				importPathMappings[`../${fileName}`] =
					`../${relativePathFromBlocks}`;
			}

			// Handle manifest and editor.deps.json
			else if (
				fileName === 'manifest.json' ||
				fileName === 'editor.deps.json'
			) {
				const newPath = join(buildRoot, fileName);
				if (filePath !== newPath) {
					filesToMove.push({
						from: filePath,
						to: newPath,
						type: 'meta',
					});
				}
			}
		}

		// Update import paths in all JS files before moving files
		for (const filePath of allFiles) {
			if (filePath.endsWith('.js')) {
				updateImportPathsWithMappings(filePath, importPathMappings);
			}
		}

		// Move files to their correct locations
		for (const { from, to, type } of filesToMove) {
			console.log(
				`📁 Moving ${type} file: ${basename(from)} → ${relative(process.cwd(), to)}`
			);
			moveFile(from, to);
		}

		// After moving, update import paths in moved files as well
		const movedFiles = filesToMove
			.filter((f) => f.to.endsWith('.js'))
			.map((f) => f.to);
		for (const filePath of movedFiles) {
			updateImportPathsForFinalLocation(
				filePath,
				outputDir,
				editorDir,
				buildRoot
			);
		}

		// Generate asset files for PHP
		generateAssetFiles(allFiles, outputDir, buildRoot);

		console.log('✅ Direct output organization complete!');
	};
}

/**
 * Updates import paths in a JavaScript file using provided mappings
 * @param {string} filePath - Path to the JS file
 * @param {Object} mappings - Map of old paths to new paths
 */
function updateImportPathsWithMappings(filePath, mappings) {
	try {
		let content = readFileSync(filePath, 'utf8');
		let hasChanges = false;

		for (const [oldPath, newPath] of Object.entries(mappings)) {
			const escapedOldPath = oldPath.replace(
				/[.*+?^${}()|[\]\\]/g,
				'\\$&'
			);

			// Handle minified imports (common pattern from Vite)
			const minifiedPattern = new RegExp(
				`(from")(\\./)?(${escapedOldPath})(")`,
				'g'
			);
			if (minifiedPattern.test(content)) {
				content = content.replace(minifiedPattern, `$1$2${newPath}$4`);
				hasChanges = true;
			}

			// Handle regular imports
			const patterns = [
				new RegExp(
					`(from\\s*["'])(\\./)?(${escapedOldPath})(["'])`,
					'g'
				),
				new RegExp(
					`(import\\s*["'])(\\./)?(${escapedOldPath})(["'])`,
					'g'
				),
			];

			for (const pattern of patterns) {
				if (pattern.test(content)) {
					content = content.replace(pattern, `$1$2${newPath}$4`);
					hasChanges = true;
				}
			}
		}

		if (hasChanges) {
			writeFileSync(filePath, content, 'utf8');
			console.log(`📝 Updated import mappings in ${basename(filePath)}`);
		}
	} catch (error) {
		console.warn(
			`⚠️  Failed to update import mappings in ${filePath}:`,
			error.message
		);
	}
}

/**
 * Updates import paths based on the file's final location
 * @param {string} filePath - Path to the JS file
 * @param {string} outputDir - Main output directory for blocks
 * @param {string} editorDir - Editor directory
 * @param {string} buildRoot - Build root directory
 */
function updateImportPathsForFinalLocation(
	filePath,
	outputDir,
	editorDir,
	buildRoot
) {
	try {
		let content = readFileSync(filePath, 'utf8');
		let hasChanges = false;

		// Determine file location
		const isInBuildRoot =
			filePath.startsWith(buildRoot) &&
			!filePath.startsWith(editorDir) &&
			!filePath.startsWith(outputDir);
		const isInEditorDir = filePath.startsWith(editorDir);

		// Fix any remaining relative path issues
		if (isInEditorDir) {
			// Files in editor dir should reference other editor files and root files correctly
			content = content.replace(
				/from\s*["']\.\/([^"']+)__ROOT__\.js["']/g,
				(match, name) => {
					hasChanges = true;
					return match.replace(
						`./${name}__ROOT__.js`,
						`../${name}.js`
					);
				}
			);

			content = content.replace(
				/from\s*["']\.\/([^"']+)__EDITOR__\.js["']/g,
				(match, name) => {
					hasChanges = true;
					return match.replace(
						`./${name}__EDITOR__.js`,
						`./${name}.js`
					);
				}
			);
		}

		// Clean up any remaining marker patterns
		content = content.replace(/__ROOT__\.js/g, '.js');
		content = content.replace(/__EDITOR__\.js/g, '.js');

		if (content !== readFileSync(filePath, 'utf8')) {
			hasChanges = true;
		}

		if (hasChanges) {
			writeFileSync(filePath, content, 'utf8');
			console.log(`📝 Cleaned up final paths in ${basename(filePath)}`);
		}
	} catch (error) {
		console.warn(
			`⚠️  Failed to update final paths in ${filePath}:`,
			error.message
		);
	}
}

/**
 * Generates asset files for PHP based on JavaScript files
 * @param {string[]} allFiles - Array of all file paths
 * @param {string} outputDir - Main output directory for blocks
 * @param {string} buildRoot - Build root directory
 */
/**
 * Generate WordPress asset files for block JavaScript files
 * @param {string[]} allFiles - Array of all files in the output directory
 * @param {string} outputDir - Main output directory for blocks
 * @param {string} buildRoot - Build root directory
 */
function generateAssetFiles(allFiles, outputDir, buildRoot) {
	console.log('📝 Generating WordPress asset files...');

	// Filter for JS files that should have asset files (block files, not utilities)
	const blockJSFiles = allFiles.filter((file) => {
		const fileName = basename(file);
		return (
			file.endsWith('.js') &&
			!fileName.includes('__EDITOR__') &&
			!fileName.includes('__ROOT__') &&
			!fileName.includes('runtime') &&
			!fileName.includes('linkControls') &&
			!fileName.includes('editor-dependencies') &&
			!fileName.includes('style-index') &&
			!fileName.includes('editor-styles')
		);
	});

	for (const filePath of blockJSFiles) {
		const fileName = basename(filePath);
		const assetFileName = fileName.replace('.js', '.asset.php');
		const assetFilePath = join(dirname(filePath), assetFileName);

		// Extract dependencies from the JavaScript file
		const dependencies = extractWordPressDependencies(filePath);
		// Generate a version hash for the file
		const versionHash = generateFileHash(filePath);
		// Generate the asset file content
		const assetFileContent = generateAssetFileContent(
			dependencies,
			versionHash
		);

		try {
			// Write the asset file next to the JS file
			writeFileSync(assetFilePath, assetFileContent, 'utf8');
			console.log(
				`📄 Generated ${assetFileName} with ${dependencies.length} dependencies`
			);
		} catch (error) {
			console.warn(
				`⚠️  Failed to create asset file ${assetFileName}:`,
				error.message
			);
		}
	}
}
