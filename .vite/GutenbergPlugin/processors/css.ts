import { writeFileSync, unlinkSync, existsSync, readdirSync } from 'fs';
import { resolve, join } from 'path';
import { ASSET_FOLDERS } from '../config/constants.js';
import type { AssetInfo, ChunkInfo } from '../types.js';

// Bundle type definition
type Bundle = Record<string, AssetInfo | ChunkInfo>;

/**
 * Split editor CSS into individual block-specific files
 * @param options - Build options
 * @param bundle - Rollup bundle
 * @param outputDir - Output directory
 */
export async function splitEditorCSS(
	options: any,
	bundle: Bundle,
	outputDir: string
): Promise<void> {
	console.log('📝 Creating individual editor CSS files for blocks...');

	let createdCount = 0;
	const editorAssetsDir = resolve(outputDir, ASSET_FOLDERS.EDITOR);

	// Process each CSS file in the bundle
	const filesToDelete: string[] = [];

	Object.keys(bundle).forEach((fileName) => {
		const chunk = bundle[fileName];

		// Look for CSS files that should be split into block-specific files
		if (fileName.endsWith('.css') && chunk.type === 'asset') {
			const assetChunk = chunk as AssetInfo;
			const cssContent = assetChunk.source;

			// Handle editor-styles entries that should become index.css
			const editorStylesMatch = fileName.match(
				/^(.+?)\/editor-styles\.css$/
			);
			if (editorStylesMatch) {
				const blockPath = editorStylesMatch[1];
				const blockSpecificCssPath = resolve(
					outputDir,
					`${blockPath}/index.css`
				);

				try {
					writeFileSync(blockSpecificCssPath, cssContent as string);
					console.log(`📄 Created: ${blockPath}/index.css`);
					createdCount++;
					// Mark this file for deletion from the bundle
					filesToDelete.push(fileName);
				} catch (error) {
					console.warn(
						`⚠️  Failed to create ${blockPath}/index.css:`,
						(error as Error).message
					);
				}
				return;
			}

			// Handle direct index.css entries (CSS-only blocks)
			const indexCssMatch = fileName.match(/^(.+?)\/index\.css$/);
			if (indexCssMatch) {
				const blockPath = indexCssMatch[1];
				const blockSpecificCssPath = resolve(
					outputDir,
					`${blockPath}/index.css`
				);

				try {
					writeFileSync(blockSpecificCssPath, cssContent as string);
					console.log(`📄 Created: ${blockPath}/index.css`);
					createdCount++;
					// Mark this file for deletion from the bundle
					filesToDelete.push(fileName);
				} catch (error) {
					console.warn(
						`⚠️  Failed to create ${blockPath}/index.css:`,
						(error as Error).message
					);
				}
			}
		}
	});

	// Remove processed CSS files from the bundle and filesystem
	filesToDelete.forEach((fileName) => {
		delete bundle[fileName];

		// Also delete the physical file from disk
		const filePath = resolve(outputDir, fileName);
		try {
			if (existsSync(filePath)) {
				unlinkSync(filePath);
				console.log(`🗑️  Removed: ${fileName}`);
			}
		} catch (error) {
			console.warn(
				`⚠️  Failed to remove ${fileName}:`,
				(error as Error).message
			);
		}
	});

	if (createdCount > 0) {
		console.log(`✅ Created editor CSS files for ${createdCount} blocks`);
	}

	// Clean up any unwanted CSS files
	await cleanupUnwantedCSSFiles(editorAssetsDir, outputDir);
}

/**
 * Clean up unwanted CSS files from the editor-assets directory
 * @param editorAssetsDir - Editor assets directory path
 * @param outputDir - Output directory path
 */
async function cleanupUnwantedCSSFiles(
	editorAssetsDir: string,
	outputDir: string
): Promise<void> {
	console.log('🧹 Cleaning up unwanted CSS files...');

	if (!existsSync(editorAssetsDir)) {
		return;
	}

	let cleanedCount = 0;

	try {
		// Clean up any unwanted root-level CSS files in editor-assets
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
				console.warn(
					`⚠️  Failed to remove ${file}:`,
					(error as Error).message
				);
			}
		});

		if (cleanedCount > 0) {
			console.log(`✅ Cleaned up ${cleanedCount} unwanted CSS files`);
		}
	} catch (error) {
		console.warn('⚠️  Error during CSS cleanup:', (error as Error).message);
	}
}
