import { describe, it, expect } from 'vitest';
import { generatePhpAssetFile } from '../../../../src/common/utils/php/generatePhpAssetFile.ts';

describe('generatePhpAssetFile', () => {
	it('should generate PHP asset file with array dependencies', () => {
		const dependencies = ['wp-blocks', 'wp-element', 'wp-components'];
		const hash = 'abc123def456';

		const result = generatePhpAssetFile(dependencies, hash);

		expect(result).toBe(
			'<?php return ["dependencies" => ["wp-blocks","wp-element","wp-components"], "version" => "abc123def456"];'
		);
	});

	it('should generate PHP asset file with Set dependencies', () => {
		const dependencies = new Set([
			'wp-blocks',
			'wp-element',
			'wp-components',
		]);
		const hash = 'abc123def456';

		const result = generatePhpAssetFile(dependencies, hash);

		expect(result).toBe(
			'<?php return ["dependencies" => ["wp-blocks","wp-element","wp-components"], "version" => "abc123def456"];'
		);
	});

	it('should handle empty dependencies and missing parameters', () => {
		// Empty array
		let result = generatePhpAssetFile([], 'test-hash');
		expect(result).toBe(
			'<?php return ["dependencies" => [], "version" => "test-hash"];'
		);

		// Empty Set
		result = generatePhpAssetFile(new Set<string>(), 'test-hash');
		expect(result).toBe(
			'<?php return ["dependencies" => [], "version" => "test-hash"];'
		);

		// No parameters (defaults)
		result = generatePhpAssetFile();
		expect(result).toBe(
			'<?php return ["dependencies" => [], "version" => ""];'
		);

		// Empty hash
		result = generatePhpAssetFile(['wp-blocks'], '');
		expect(result).toBe(
			'<?php return ["dependencies" => ["wp-blocks"], "version" => ""];'
		);
	});

	it('should handle mixed dependency types and preserve order', () => {
		const dependencies = [
			'wp-blocks',
			'lodash',
			'my-custom-script',
			'wp-element',
		];
		const hash = 'mixed-deps-hash';

		const result = generatePhpAssetFile(dependencies, hash);

		// Check all dependencies are included
		expect(result).toContain('"wp-blocks"');
		expect(result).toContain('"lodash"');
		expect(result).toContain('"my-custom-script"');
		expect(result).toContain('"wp-element"');
		expect(result).toContain('"version" => "mixed-deps-hash"');

		// Check order is preserved
		const startIndex = result.indexOf('"wp-blocks"');
		const middleIndex = result.indexOf('"lodash"');
		const endIndex = result.indexOf('"wp-element"');
		expect(startIndex).toBeLessThan(middleIndex);
		expect(middleIndex).toBeLessThan(endIndex);
	});

	it('should remove duplicates when using Set and generate valid PHP syntax', () => {
		const dependencies = new Set(['wp-blocks', 'wp-element', 'wp-blocks']); // Duplicate wp-blocks
		const hash = 'duplicate-test';

		const result = generatePhpAssetFile(dependencies, hash);

		// Should only contain wp-blocks once
		const blockCount = (result.match(/"wp-blocks"/g) || []).length;
		expect(blockCount).toBe(1);
		expect(result).toContain('"wp-element"');

		// Check PHP syntax
		expect(result.startsWith('<?php return [')).toBe(true);
		expect(result.endsWith('];')).toBe(true);
		expect(result).toContain('"dependencies" =>');
		expect(result).toContain('"version" =>');
	});
});
