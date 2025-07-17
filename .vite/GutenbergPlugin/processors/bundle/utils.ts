/**
 * External dependencies
 */
import { readFileSync, existsSync } from 'fs';

/**
 * Internal dependencies
 */
import { WORDPRESS_FILE_OUTPUT } from '../../config/constants.js';
import type { PluginContext } from '../../types/index.js';

/**
 * Convert JavaScript object to PHP array format
 * @param data - Data to convert to PHP array
 * @returns PHP array as string
 */
export function generatePhpArray(data: any): string {
	function convertValue(value: any, indent = 0): string {
		const spaces = '    '.repeat(indent);
		const nextSpaces = '    '.repeat(indent + 1);

		if (value === null) return 'null';
		if (typeof value === 'boolean') return value ? 'true' : 'false';
		if (typeof value === 'number') return value.toString();
		if (typeof value === 'string') return `'${value.replace(/'/g, "\\'")}'`;

		if (Array.isArray(value)) {
			if (value.length === 0) return '[]';
			const items = value.map(
				(item) => `${nextSpaces}${convertValue(item, indent + 1)}`
			);
			return `[\n${items.join(',\n')}\n${spaces}]`;
		}

		if (typeof value === 'object') {
			const entries = Object.entries(value);
			if (entries.length === 0) return '[]';

			const items = entries.map(([key, val]) => {
				const phpKey = `'${key.replace(/'/g, "\\'")}'`;
				return `${nextSpaces}${phpKey} => ${convertValue(val, indent + 1)}`;
			});
			return `[\n${items.join(',\n')}\n${spaces}]`;
		}

		return 'null';
	}

	const phpCode = `<?php
/**
 * Block manifest - Generated automatically by Vite Gutenberg Plugin
 * Contains block registration data and asset information
 */

return ${convertValue(data)};
`;

	return phpCode;
}

/**
 * Handle copying of render.php file to the output directory
 * @param props - Properties for copying the render file
 * @param props.context - Plugin context for emitting files
 * @param props.dir - Output directory for the block
 * @param props.key - Key for the block in the manifest
 * @return void
 */
export function copyRenderFile({
	context,
	dir,
	key,
}: {
	context: PluginContext;
	dir: string;
	key: string;
}): void {
	const renderPhpPath = `${dir}/${WORDPRESS_FILE_OUTPUT.RENDER}`;

	if (existsSync(renderPhpPath)) {
		context.emitFile({
			type: 'asset',
			fileName: `${key}/${WORDPRESS_FILE_OUTPUT.RENDER}`,
			source: readFileSync(renderPhpPath, 'utf8'),
		});
	}
}

/**
 * Handle copying of block.json file to the output directory
 * @param props - Properties for copying the block.json file
 * @param props.context - Plugin context for emitting files
 * @param props.dir - Output directory for the block
 * @param props.key - Key for the block in the manifest
 * @return void
 */
export function copyBlockJsonFile({
	context,
	dir,
	key,
}: {
	context: PluginContext;
	dir: string;
	key: string;
}): void {
	const blockJsonPath = `${dir}/${WORDPRESS_FILE_OUTPUT.BLOCK_JSON}`;

	if (existsSync(blockJsonPath)) {
		context.emitFile({
			type: 'asset',
			fileName: `${key}/${WORDPRESS_FILE_OUTPUT.BLOCK_JSON}`,
			source: JSON.stringify(
				JSON.parse(readFileSync(blockJsonPath, 'utf8')),
				null,
				2
			),
		});
	}
}
