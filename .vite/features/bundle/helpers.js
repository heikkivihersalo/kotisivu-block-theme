import { glob } from 'glob';
import { join, dirname, basename } from 'path';
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
 * Get all block.json files for bundle generation
 * @param {string} blocksDir - Directory to search for blocks
 * @returns {Array} Array of block.json file paths
 */
export function getBlockJsonFiles(blocksDir) {
	return glob.sync(`${blocksDir}/**/block.json`);
}

/**
 * Moves files from source to destination directory
 * @param {string} source - Source file path
 * @param {string} destination - Destination file path
 */
export function moveFile(source, destination) {
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
export function getAllFiles(dir, files = []) {
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
 * Safely reads a file and returns its content
 * @param {string} filePath - Path to the file
 * @returns {string} File content
 */
export function safeReadFile(filePath) {
	try {
		return readFileSync(filePath, 'utf8');
	} catch (error) {
		throw new Error(`Could not read file ${filePath}: ${error.message}`);
	}
}

/**
 * Safely writes content to a file
 * @param {string} filePath - Path to the file
 * @param {string} content - Content to write
 */
export function safeWriteFile(filePath, content) {
	try {
		writeFileSync(filePath, content, 'utf8');
	} catch (error) {
		throw new Error(`Could not write file ${filePath}: ${error.message}`);
	}
}

/**
 * Generates WordPress asset file content
 * @param {string[]} dependencies - Array of WordPress dependencies
 * @param {string} version - Version hash for the file
 * @returns {string} PHP asset file content
 */
export function generateAssetFileContent(dependencies, version) {
	const depsString = dependencies.map((dep) => `'${dep}'`).join(', ');
	return `<?php return array('dependencies' => array(${depsString}), 'version' => '${version}');`;
}

/**
 * Generates a hash for file versioning
 * @param {string} filePath - Path to the file to hash
 * @returns {string} Hash string
 */
export function generateFileHash(filePath) {
	try {
		const content = safeReadFile(filePath);
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
export function extractWordPressDependencies(filePath) {
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
		const content = safeReadFile(filePath);
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
