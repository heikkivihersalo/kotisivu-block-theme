/**
 * Internal dependencies
 */
import { generatePhpArrayContent } from '../../common/utils/php/generatePhpArrayContent.js';
import { FileEmitter } from '../../common/utils/vite/FileEmitter.js';
import type { BlockInfo } from '../../common/types/wordpress.js';

/**
 * Generate block manifest file
 */
export async function generateBlockManifest(
	this: any,
	blocks: BlockInfo[],
	fileEmitter?: FileEmitter
): Promise<void> {
	if (blocks.length === 0) {
		console.log('No blocks found. Skipping block manifest generation...');
		return;
	}

	const fileName = 'block-manifest.php';

	// Convert blocks array to a record object that generatePhpArrayContent expects
	const blocksRecord: Record<string, any> = {};
	blocks.forEach((block) => {
		blocksRecord[block.name] = block.blockJson;
	});

	// Generate PHP content
	const phpContent = generatePhpArrayContent(blocksRecord);

	// Use the provided FileEmitter instance if available
	if (fileEmitter) {
		await fileEmitter.emitFile(this, {
			type: 'asset',
			fileName,
			source: phpContent,
		});
	} else {
		// Only use standard emitFile in build mode
		const isBuildCommand = process.argv.includes('build');
		if (isBuildCommand) {
			this.emitFile({
				type: 'asset',
				fileName,
				source: phpContent,
			});
		} else {
			// In development mode, create a temporary FileEmitter
			// This shouldn't happen if the function is called correctly
			console.warn(
				'generateBlockManifest called without fileEmitter in dev mode, skipping file emission'
			);
		}
	}

	console.log(`✓ Generated ${fileName} with ${blocks.length} blocks`);
}
