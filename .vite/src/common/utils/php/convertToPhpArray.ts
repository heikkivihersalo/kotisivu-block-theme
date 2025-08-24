/**
 * Convert JavaScript object to PHP array format
 * @param blocks - The blocks object containing block.json configurations.
 * @return A string representing the PHP array content
 */
export function convertToPhpArray(value: any, indent: number = 0): string {
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
