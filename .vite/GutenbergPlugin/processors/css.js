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
			const cssContent = chunk.source;

			// Handle editor-styles entries that should become index.css
			const editorStylesMatch = fileName.match(
				/^(?:editor-assets\/)?(.+?)\/editor-styles\.css$/
			);
			if (editorStylesMatch) {
				const blockPath = editorStylesMatch[1];
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
				return;
			}

			// Handle direct index.css entries (CSS-only blocks)
			const indexCssMatch = fileName.match(
				/^(?:editor-assets\/)?(.+?)\/index\.css$/
			);
			if (indexCssMatch) {
				const blockPath = indexCssMatch[1];
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

	// Clean up any unwanted CSS files in editor-assets
	await cleanupUnwantedCSSFiles(editorAssetsDir, outputDir);
}

/**
 * Clean up unwanted CSS files from the editor-assets directory
 * @param {string} editorAssetsDir - Editor assets directory path
 * @param {string} outputDir - Output directory path
 */
async function cleanupUnwantedCSSFiles(editorAssetsDir, outputDir) {
	console.log('🧹 Cleaning up unwanted CSS files...');

	if (!existsSync(editorAssetsDir)) {
		return;
	}

	let cleanedCount = 0;

	try {
		// Recursively find and remove editor-styles.css files
		const findEditorStylesFiles = (dir) => {
			const files = [];
			const items = readdirSync(dir, { withFileTypes: true });

			for (const item of items) {
				const fullPath = join(dir, item.name);
				if (item.isDirectory()) {
					files.push(...findEditorStylesFiles(fullPath));
				} else if (item.name === 'editor-styles.css') {
					files.push(fullPath);
				}
			}
			return files;
		};

		const editorStylesFiles = findEditorStylesFiles(editorAssetsDir);

		editorStylesFiles.forEach((filePath) => {
			try {
				unlinkSync(filePath);
				const relativePath = filePath.replace(
					editorAssetsDir + '/',
					''
				);
				console.log(`🗑️  Removed: ${relativePath}`);
				cleanedCount++;
			} catch (error) {
				console.warn(`⚠️  Failed to remove ${filePath}:`, error.message);
			}
		});

		// Also clean up any unwanted root-level CSS files in editor-assets
		const rootFiles = readdirSync(editorAssetsDir);
		const unwantedRootCssFiles = rootFiles.filter(
			(file) => file.endsWith('.css') && file.match(/^index\d*\.css$/)
		);

		unwantedRootCssFiles.forEach((file) => {
			try {
				const filePath = join(editorAssetsDir, file);
				unlinkSync(filePath);
				console.log(`🗑️  Removed unwanted root CSS file: ${file}`);
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
