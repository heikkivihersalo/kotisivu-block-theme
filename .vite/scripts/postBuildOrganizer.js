import { join, dirname, basename, relative } from 'path';
import { existsSync, mkdirSync, renameSync, readdirSync, statSync } from 'fs';

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
			const relativePath = relative(outputDir, filePath);
			const fileName = basename(filePath);
			
			// Move React runtime files to build root
			if (
				fileName.includes('jsx-dev-runtime') ||
				fileName.includes('jsx-runtime') ||
				fileName.includes('react-runtime') ||
				relativePath.includes('root-assets/')
			) {
				const newPath = join(buildRoot, fileName);
				console.log(`📦 Moving ${fileName} to build root`);
				moveFile(filePath, newPath);
				continue;
			}
			
			// Move editor dependencies to editor output directory
			if (
				relativePath.includes('editor-deps/') ||
				fileName.includes('wp-editor') ||
				fileName.includes('editor-utils') ||
				fileName.includes('project-utils') ||
				fileName.includes('project-misc') ||
				fileName.includes('gapControls') ||
				fileName.includes('variationPicker') ||
				fileName.includes('innerBlocksAppender') ||
				fileName.includes('getTransformedMetadata') ||
				fileName.includes('tailwind-utilities') ||
				fileName.includes('classnames') ||
				fileName.includes('clsx')
			) {
				const cleanFileName = fileName.replace(/^editor-deps[-_]/, '');
				const newPath = join(editorOutputDir, cleanFileName);
				console.log(`📁 Moving ${fileName} to editor directory`);
				moveFile(filePath, newPath);
				continue;
			}
			
			// Move manifest.json and editor.deps.json to build root
			if (
				fileName === 'manifest.json' ||
				fileName === 'editor.deps.json'
			) {
				const newPath = join(buildRoot, fileName);
				console.log(`📋 Moving ${fileName} to build root`);
				moveFile(filePath, newPath);
				continue;
			}
		}
		
		console.log('✅ Build output organization complete!');
	};
}
