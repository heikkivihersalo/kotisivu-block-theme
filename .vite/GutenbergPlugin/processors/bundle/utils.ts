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
