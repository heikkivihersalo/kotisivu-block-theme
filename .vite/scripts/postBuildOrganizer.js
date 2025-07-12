import { join, dirname, basename, relative } from 'path';
import { existsSync, mkdirSync, renameSync, readdirSync, statSync, readFileSync, writeFileSync } from 'fs';

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
 * Updates import paths in a JavaScript file
 * @param {string} filePath - Path to the JS file
 * @param {Object} pathMap - Map of old paths to new paths
 */
function updateImportPaths(filePath, pathMap) {
	try {
		let content = readFileSync(filePath, 'utf8');
		let hasChanges = false;

		// Update import paths for each mapping
		for (const [oldPath, newPath] of Object.entries(pathMap)) {
			// Escape special regex characters in the filename
			const escapedOldPath = oldPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
			
			// Create patterns to match imports in both minified and regular JS
			// Pattern 1: Match imports like import{...}from"../gapControls.js"
			// Pattern 2: Match imports like import ... from "../gapControls.js"
			// Pattern 3: Match require statements
			const patterns = [
				// Minified imports with double quotes
				new RegExp(`(from")(\\./)?(${escapedOldPath})(")`, 'g'),
				// Minified imports with single quotes  
				new RegExp(`(from')(\\./)?(${escapedOldPath})(')`, 'g'),
				// Regular imports with double quotes
				new RegExp(`(from\\s+")(\\./)?(${escapedOldPath})(")`, 'g'),
				// Regular imports with single quotes
				new RegExp(`(from\\s+')(\\./)?(${escapedOldPath})(')`, 'g'),
				// Require statements
				new RegExp(`(require\\s*\\(\\s*")(\\./)?(${escapedOldPath})(")`, 'g'),
				new RegExp(`(require\\s*\\(\\s*')(\\./)?(${escapedOldPath})(')`, 'g')
			];

			for (const pattern of patterns) {
				if (pattern.test(content)) {
					content = content.replace(pattern, `$1${newPath}$4`);
					hasChanges = true;
				}
			}
		}

		if (hasChanges) {
			writeFileSync(filePath, content, 'utf8');
			console.log(`📝 Updated import paths in ${basename(filePath)}`);
		}
	} catch (error) {
		console.warn(`⚠️  Failed to update imports in ${filePath}:`, error.message);
	}
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
			if (fileName === 'manifest.json' || fileName === 'editor.deps.json') {
				const newPath = join(buildRoot, fileName);
				console.log(`📋 Moving ${fileName} to build root`);
				moveFile(filePath, newPath);
			}
		}

		console.log('✅ Build output organization complete!');
	};
}
