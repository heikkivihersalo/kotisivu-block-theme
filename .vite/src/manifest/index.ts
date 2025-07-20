/**
 * External dependencies
 */
import type { PluginContext } from 'rollup';

/**
 * Internal dependencies
 */
import type { BlockInfo, EmittedAsset } from '../../types/index.js';

/**
 * Generate block manifest PHP file from discovered blocks
 * This integrates with the existing Vite plugin workflow
 */
export function generateBlockManifest(
	this: PluginContext,
	discoveredBlocks: BlockInfo[],
	outputDirectory: string
): void {
	if (!discoveredBlocks || discoveredBlocks.length === 0) {
		console.warn('⚠️  No blocks discovered for manifest generation');
		return;
	}

	console.log(
		`🔍 Generating block manifest from ${discoveredBlocks.length} blocks...`
	);

	const blocks: Record<string, any> = {};

	// Process each discovered block
	for (const blockInfo of discoveredBlocks) {
		try {
			const blockData = blockInfo.blockJson;
			const blockKey = blockData.name || blockInfo.name;

			blocks[blockKey] = blockData;
			console.log(`✅ Added block to manifest: ${blockKey}`);
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

	console.log(`🎉 Block manifest generated successfully`);
	console.log(`📊 Total blocks in manifest: ${Object.keys(blocks).length}`);
}

/**
 * Convert JavaScript object to PHP array format
 */
function generatePhpArrayContent(blocks: Record<string, any>): string {
	const timestamp = new Date().toISOString();

	let phpContent = `<?php
/**
 * Block Manifest
 * 
 * Auto-generated block manifest containing all block.json configurations.
 * Generated on: ${timestamp}
 * 
 * @package KotisivuBlockTheme
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

return `;

	phpContent += convertToPhpArray(blocks, 0);
	phpContent += ';\n';

	return phpContent;
}

/**
 * Recursively convert JavaScript values to PHP array syntax
 */
function convertToPhpArray(value: any, indent: number = 0): string {
	const indentStr = '\t'.repeat(indent);
	const nextIndentStr = '\t'.repeat(indent + 1);

	if (value === null) {
		return 'null';
	}

	if (typeof value === 'boolean') {
		return value ? 'true' : 'false';
	}

	if (typeof value === 'number') {
		return value.toString();
	}

	if (typeof value === 'string') {
		// Escape single quotes and backslashes
		const escaped = value.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
		return `'${escaped}'`;
	}

	if (Array.isArray(value)) {
		if (value.length === 0) {
			return '[]';
		}

		let result = '[\n';
		value.forEach((item, index) => {
			result += `${nextIndentStr}${convertToPhpArray(item, indent + 1)}`;
			if (index < value.length - 1) {
				result += ',';
			}
			result += '\n';
		});
		result += `${indentStr}]`;
		return result;
	}

	if (typeof value === 'object') {
		const keys = Object.keys(value);
		if (keys.length === 0) {
			return '[]';
		}

		let result = '[\n';
		keys.forEach((key, index) => {
			const phpKey = convertToPhpArray(key, 0);
			const phpValue = convertToPhpArray(value[key], indent + 1);
			result += `${nextIndentStr}${phpKey} => ${phpValue}`;
			if (index < keys.length - 1) {
				result += ',';
			}
			result += '\n';
		});
		result += `${indentStr}]`;
		return result;
	}

	return 'null';
}
