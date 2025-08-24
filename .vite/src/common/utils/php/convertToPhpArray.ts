/**
 * Convert JavaScript object to PHP array format
 * @param value - The value to convert to PHP array format
 * @param indent - Current indentation level (for recursive calls)
 * @return A string representing the PHP array content
 */
export function convertToPhpArray(value: any, indent = 0): string {
	const tab = '\t'.repeat(indent);
	const nextTab = '\t'.repeat(indent + 1);

	// Handle primitives
	if (value === null) return 'null';
	if (typeof value === 'boolean') return value ? 'true' : 'false';
	if (typeof value === 'number') return value.toString();
	if (typeof value === 'string') {
		const escaped = value.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
		return `'${escaped}'`;
	}

	// Handle arrays
	if (Array.isArray(value)) {
		if (value.length === 0) return '[]';

		const items = value.map(
			(item) => `${nextTab}${convertToPhpArray(item, indent + 1)}`
		);
		return `[\n${items.join(',\n')}\n${tab}]`;
	}

	// Handle objects
	if (typeof value === 'object') {
		const keys = Object.keys(value);
		if (keys.length === 0) return '[]';

		const pairs = keys.map((key) => {
			const phpKey = convertToPhpArray(key, 0);
			const phpValue = convertToPhpArray(value[key], indent + 1);
			return `${nextTab}${phpKey} => ${phpValue}`;
		});
		return `[\n${pairs.join(',\n')}\n${tab}]`;
	}

	return 'null';
}
