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

/**
 * Generate WordPress asset.php file for a JavaScript chunk
 * @param chunkInfo - Information about the chunk
 * @param version - Version hash for the file
 * @returns PHP asset file content
 */
export function generateAssetPhp(chunkInfo: {
	dependencies: string[];
	version: string;
}): string {
	const phpCode = `<?php return array('dependencies' => ${convertPhpArray(chunkInfo.dependencies)}, 'version' => '${chunkInfo.version}');
`;
	return phpCode;
}

/**
 * Convert JavaScript array to PHP array format (simplified for asset files)
 * @param array - Array to convert
 * @returns PHP array as string
 */
function convertPhpArray(array: string[]): string {
	if (array.length === 0) return 'array()';
	const items = array.map((item) => `'${item.replace(/'/g, "\\'")}'`);
	return `array(${items.join(', ')})`;
}

/**
 * Extract WordPress dependencies from chunk imports
 * @param imports - Array of import paths
 * @returns Array of WordPress dependency handles
 */
export function extractWordPressDependencies(imports: string[]): string[] {
	const dependencies: string[] = [];

	imports.forEach((importPath) => {
		if (importPath.startsWith('@wordpress/')) {
			const packageName = importPath.replace('@wordpress/', '');
			// Skip icons package as it's not a valid WordPress script dependency
			// Icons are typically bundled inline or loaded via other means
			if (packageName === 'icons') {
				return;
			}
			dependencies.push(`wp-${packageName}`);
		}
	});

	// Add common WordPress dependencies that are often needed
	const commonDeps = ['wp-element'];
	commonDeps.forEach((dep) => {
		if (!dependencies.includes(dep)) {
			dependencies.push(dep);
		}
	});

	return dependencies.sort();
}

/**
 * Generate a version hash from file content or use provided hash
 * @param content - File content or existing hash
 * @returns Version hash string
 */
export function generateVersionHash(content: string): string {
	// Simple hash generation - in production you might want to use crypto
	let hash = 0;
	for (let i = 0; i < content.length; i++) {
		const char = content.charCodeAt(i);
		hash = (hash << 5) - hash + char;
		hash = hash & hash; // Convert to 32-bit integer
	}
	return Math.abs(hash).toString(16);
}
