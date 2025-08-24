/**
 * Internal dependencies
 */
import { convertToPhpArray } from './convertToPhpArray';

/**
 * Convert JavaScript object to PHP array format
 * @param blocks - The blocks object containing block.json configurations.
 * @return A string representing the PHP array content
 */
export function generatePhpArrayContent(blocks: Record<string, any>): string {
	const timestamp = new Date().toISOString();

	let phpContent = `<?php
/**
 * Block Manifest
 * 
 * Auto-generated block manifest containing all block.json configurations.
 * Generated on: ${timestamp}
 * 
 */

return `;

	phpContent += convertToPhpArray(blocks, 0);
	phpContent += ';\n';

	return phpContent;
}
