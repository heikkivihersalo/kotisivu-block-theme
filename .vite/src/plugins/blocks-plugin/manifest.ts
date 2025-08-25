/**
 * Internal dependencies
 */
import { generatePhpArrayContent } from '../../common/utils/php/generatePhpArrayContent.js';
import { DevFileEmitter } from '../../common/utils/vite/DevFileEmitter.js';
import type { BlockInfo } from '../../common/types/wordpress.js';

/**
 * Generate block manifest file
 */
export function generateBlockManifest(this: any, blocks: BlockInfo[]): void {
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

	// Use DevFileEmitter to handle file emission
	DevFileEmitter.safeEmitFile(this, {
		type: 'asset',
		fileName,
		source: phpContent,
	});

	console.log(`✓ Generated ${fileName} with ${blocks.length} blocks`);
}
