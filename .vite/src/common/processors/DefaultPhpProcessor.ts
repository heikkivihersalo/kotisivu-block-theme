/**
 * Shared dependencies
 */
import type {
	PhpProcessor,
	PhpProcessingOptions,
} from '../interfaces/PhpProcessor';

/**
 * Default PHP Processor Implementation
 *
 * This class implements the PhpProcessor interface with basic PHP processing capabilities,
 * providing a testable and swappable PHP processing strategy.
 */
export class DefaultPhpProcessor implements PhpProcessor {
	/**
	 * Process PHP content with the given options
	 */
	process(content: string, options: PhpProcessingOptions = {}): string {
		const { minify = true } = options;

		if (!this.isValidPhpContent(content)) {
			console.warn(
				'Invalid PHP content provided, returning original content'
			);
			return content;
		}

		return minify ? this.minifyPhp(content) : content;
	}

	/**
	 * Generate a PHP asset file with dependencies and version hash
	 */
	generatePhpAssetFile(
		dependencies: Set<string> | string[] = [],
		hash = ''
	): string {
		const data = {
			dependencies: Array.from(dependencies),
			version: hash,
		};

		return `<?php return ${this.convertToPhpArray(data, 0, true)};`;
	}

	/**
	 * Generate PHP array content for block manifests
	 */
	generatePhpArrayContent(blocks: Record<string, any>): string {
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

		phpContent += this.convertToPhpArray(blocks, 0);
		phpContent += ';\n';

		return phpContent;
	}

	/**
	 * Check if PHP content is valid for processing
	 */
	private isValidPhpContent(content: string): boolean {
		return (
			typeof content === 'string' &&
			content.trim().length > 0 &&
			(content.includes('<?php') || content.includes('<?='))
		);
	}

	/**
	 * Convert JavaScript object to PHP array format
	 */
	private convertToPhpArray(value: any, indent = 0, minify = false): string {
		const space = minify ? '' : ' ';
		const newline = minify ? '' : '\n';
		const tab = minify ? '' : '\t'.repeat(indent);
		const nextTab = minify ? '' : '\t'.repeat(indent + 1);

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

			const items = value.map((item) => {
				const converted = this.convertToPhpArray(
					item,
					indent + 1,
					minify
				);
				return `${nextTab}${converted}`;
			});
			return `[${newline}${items.join(`,${newline}`)}${newline}${tab}]`;
		}

		// Handle objects
		if (typeof value === 'object') {
			const keys = Object.keys(value);
			if (keys.length === 0) return '[]';

			const pairs = keys.map((key) => {
				const phpKey = this.convertToPhpArray(key, 0, minify);
				const phpValue = this.convertToPhpArray(
					value[key],
					indent + 1,
					minify
				);
				return `${nextTab}${phpKey}${space}=>${space}${phpValue}`;
			});
			return `[${newline}${pairs.join(`,${newline}`)}${newline}${tab}]`;
		}

		return 'null';
	}

	/**
	 * Minify PHP content by removing comments, unnecessary whitespace, and formatting
	 */
	private minifyPhp(content: string): string {
		let result = content;

		// Remove multi-line comments /* ... */
		result = result.replace(/\/\*[\s\S]*?\*\//g, '');

		// Remove single-line comments // ... but preserve URLs like http://
		result = result.replace(/(?<!:)\/\/(?!\/)[^\r\n]*/g, '');

		// Remove single-line comments # ...
		result = result.replace(/(?<!['"])#[^\r\n]*/g, '');

		// Remove excessive whitespace while preserving structure
		// Replace multiple spaces/tabs with single space
		result = result.replace(/[ \t]+/g, ' ');

		// Remove trailing whitespace from lines
		result = result.replace(/[ \t]+$/gm, '');

		// Remove leading whitespace but preserve indentation structure
		result = result.replace(/^[ \t]+/gm, '');

		// Remove multiple consecutive newlines, keep max 1 empty line
		result = result.replace(/\n{3,}/g, '\n\n');

		// Trim start and end
		result = result.trim();

		// Add back single newline at end of file if it doesn't exist
		if (!result.endsWith('\n')) {
			result += '\n';
		}

		return result;
	}
}
