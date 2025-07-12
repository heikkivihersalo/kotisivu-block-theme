import { join, dirname, basename } from 'path';
import {
	existsSync,
	mkdirSync,
	renameSync,
	readdirSync,
	statSync,
	writeFileSync,
	readFileSync,
} from 'fs';
import { createHash } from 'crypto';

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
 * @param {string} dir - Directory to search
 * @param {string[]} files - Array to collect file paths
 * @returns {string[]} Array of file paths
 */
function getAllFiles(dir, files = []) {
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
 * Organizes build output files according to the specified structure
 * @param {string} outputDir - Main output directory for blocks
 * @param {string} editorOutputDir - Output directory for editor dependencies
 * @returns {Function} Function to organize files after build
 */
export function createPostBuildOrganizer(outputDir, editorOutputDir) {
	return function organizeFiles() {
		console.log('🔧 Organizing build output files...');

		// Get the actual build root (where we want manifest.json, etc.)
		// From "build/test/block-library/custom" we want "build/"
		const buildRoot = outputDir.split('/')[0]; // Just get 'build'

		// Get all files in the output directory
		const allFiles = getAllFiles(outputDir);

		for (const filePath of allFiles) {
			const fileName = basename(filePath);

			// Move manifest.json and editor.deps.json to build root
			if (
				fileName === 'manifest.json' ||
				fileName === 'editor.deps.json'
			) {
				const newPath = join(buildRoot, fileName);
				console.log(`📋 Moving ${fileName} to build root`);
				moveFile(filePath, newPath);
			}

			// Generate .asset.php files for JavaScript files (excluding certain files)
			if (
				fileName.endsWith('.js') &&
				!fileName.includes('runtime') &&
				!fileName.includes('linkControls') &&
				!fileName.includes('editor-dependencies') &&
				!fileName.includes('style-index') &&
				!fileName.includes('editor-styles')
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
					console.log(
						`📝 Generated ${assetFileName} with ${dependencies.length} dependencies`
					);
				} catch (error) {
					console.warn(
						`⚠️  Failed to create asset file ${assetFileName}:`,
						error.message
					);
				}
			}
		}

		console.log('✅ Build output organization complete!');
	};
}
