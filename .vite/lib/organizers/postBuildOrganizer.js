import { join, dirname, basename } from 'path';
import { readdirSync, statSync, writeFileSync } from 'fs';
import {
	moveFile,
	getAllFiles,
	generateAssetFileContent,
	generateFileHash,
	extractWordPressDependencies,
} from '../utils/index.js';

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
