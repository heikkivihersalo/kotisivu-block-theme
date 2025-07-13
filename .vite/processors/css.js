import { writeFileSync, unlinkSync, existsSync, readdirSync } from 'fs';
import { resolve, join } from 'path';
import { ASSET_FOLDERS } from '../config/constants.js';

/**
 * Split editor CSS into individual block-specific files
 * @param {Object} options - Build options
 * @param {Object} bundle - Rollup bundle
 * @param {string} outputDir - Output directory
 */
export async function splitEditorCSS(options, bundle, outputDir) {
	console.log('📝 Creating individual editor CSS files for blocks...');

	let createdCount = 0;
	const editorAssetsDir = resolve(outputDir, ASSET_FOLDERS.EDITOR);

	// Process each CSS file in the bundle
	Object.keys(bundle).forEach((fileName) => {
		const chunk = bundle[fileName];

		// Look for CSS files that should be split into block-specific files
		if (fileName.endsWith('.css') && chunk.type === 'asset') {
			// Extract block path from the CSS content or filename patterns
			// This handles CSS files generated from block entries
			const cssContent = chunk.source;

			// Try to determine the block path from the CSS content
			// Look for block-specific selectors or comments
			const blockPathMatch = fileName.match(/^(.+?)\/index\.css$/);

			if (blockPathMatch) {
				const blockPath = blockPathMatch[1];
				const blockSpecificCssPath = resolve(
					outputDir,
					`${blockPath}/index.css`
				);

				try {
					writeFileSync(blockSpecificCssPath, cssContent);
					console.log(`📄 Created: ${blockPath}/index.css`);
					createdCount++;
				} catch (error) {
					console.warn(
						`⚠️  Failed to create ${blockPath}/index.css:`,
						error.message
					);
				}
			}
		}
	});

	if (createdCount > 0) {
		console.log(`✅ Created editor CSS files for ${createdCount} blocks`);
	}

	// Clean up any unwanted root-level CSS files in editor-assets
	await cleanupUnwantedCSSFiles(editorAssetsDir);
}

/**
 * Clean up unwanted CSS files from the editor-assets directory
 * @param {string} editorAssetsDir - Editor assets directory path
 */
async function cleanupUnwantedCSSFiles(editorAssetsDir) {
	console.log('🧹 Cleaning up unwanted root-level CSS files...');

	if (!existsSync(editorAssetsDir)) {
		return;
	}

	let cleanedCount = 0;

	try {
		const files = readdirSync(editorAssetsDir);
		const unwantedCssFiles = files.filter(
			(file) => file.endsWith('.css') && file.match(/^index\d*\.css$/)
		);

		unwantedCssFiles.forEach((file) => {
			try {
				const filePath = join(editorAssetsDir, file);
				unlinkSync(filePath);
				console.log(`🗑️  Removed unwanted CSS file: ${file}`);
				cleanedCount++;
			} catch (error) {
				console.warn(`⚠️  Failed to remove ${file}:`, error.message);
			}
		});

		if (cleanedCount > 0) {
			console.log(`✅ Cleaned up ${cleanedCount} unwanted CSS files`);
		}
	} catch (error) {
		console.warn('⚠️  Error during CSS cleanup:', error.message);
	}
}
