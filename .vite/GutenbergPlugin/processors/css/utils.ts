import { unlinkSync, existsSync, readdirSync } from 'fs';
import { join } from 'path';

/**
 * Clean up unwanted CSS files from the editor-assets directory
 * @param editorAssetsDir - Editor assets directory path
 * @param outputDir - Output directory path
 */
export async function cleanupUnwantedCSSFiles(
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
