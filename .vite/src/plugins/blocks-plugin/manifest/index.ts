/**
 * External dependencies
 */
import type { PluginContext } from 'rollup';

/**
 * Internal dependencies
 */
import { generatePhpArrayContent } from '../../../common/utils';
import type { BlockInfo } from '../../../common/types/blocks.ts';
import type { EmittedAsset } from '../../../common/types/rollup.ts';

/**
 * Generate block manifest PHP file from discovered blocks
 * This integrates with the existing Vite plugin workflow
 */
export function generateBlockManifest(
	this: PluginContext,
	discoveredBlocks: BlockInfo[],
	_outputDirectory: string
): void {
	if (!discoveredBlocks || discoveredBlocks.length === 0) {
		console.warn('⚠️  No blocks discovered for manifest generation');
		return;
	}

	const blocks: Record<string, any> = {};

	// Process each discovered block
	for (const blockInfo of discoveredBlocks) {
		try {
			const blockData = blockInfo.blockJson;
			const blockKey = blockData.name || blockInfo.name;

			blocks[blockKey] = blockData;
		} catch (error) {
			console.error(
				`❌ Error processing block ${blockInfo.name}:`,
				error
			);
		}
	}

	// Generate PHP array content
	const phpContent = generatePhpArrayContent(blocks);

	// Emit the manifest file
	this.emitFile({
		type: 'asset',
		fileName: 'block-manifest.php',
		source: phpContent,
	} satisfies EmittedAsset);
}
