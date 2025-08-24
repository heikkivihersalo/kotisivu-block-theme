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

	it('should handle empty dependencies array', () => {
		const dependencies: string[] = [];
		const hash = 'abc123def456';

		const result = generatePhpAssetFile(dependencies, hash);

		expect(result).toBe(
			'<?php return ["dependencies" => [], "version" => "abc123def456"];'
		);
	});

	it('should handle empty dependencies Set', () => {
		const dependencies = new Set<string>();
		const hash = 'abc123def456';

		const result = generatePhpAssetFile(dependencies, hash);

		expect(result).toBe(
			'<?php return ["dependencies" => [], "version" => "abc123def456"];'
		);
	});

	it('should handle empty hash', () => {
		const dependencies = ['wp-blocks'];
		const hash = '';

		const result = generatePhpAssetFile(dependencies, hash);

		expect(result).toBe(
			'<?php return ["dependencies" => ["wp-blocks"], "version" => ""];'
		);
	});

	it('should handle no parameters (defaults)', () => {
		const result = generatePhpAssetFile();

		expect(result).toBe(
			'<?php return ["dependencies" => [], "version" => ""];'
		);
	});

	it('should handle single dependency', () => {
		const dependencies = ['wp-blocks'];
		const hash = '123abc';

		const result = generatePhpAssetFile(dependencies, hash);

		expect(result).toBe(
			'<?php return ["dependencies" => ["wp-blocks"], "version" => "123abc"];'
		);
	});

	it('should handle WordPress core dependencies', () => {
		const dependencies = [
			'wp-blocks',
			'wp-element',
			'wp-editor',
			'wp-components',
			'wp-data',
			'wp-api-fetch',
		];
		const hash = 'wp-core-hash';

		const result = generatePhpAssetFile(dependencies, hash);

		expect(result).toContain('"wp-blocks"');
		expect(result).toContain('"wp-element"');
		expect(result).toContain('"wp-editor"');
		expect(result).toContain('"wp-components"');
		expect(result).toContain('"wp-data"');
		expect(result).toContain('"wp-api-fetch"');
		expect(result).toContain('"version" => "wp-core-hash"');
	});

	it('should handle third-party dependencies', () => {
		const dependencies = ['lodash', 'moment', 'react', 'react-dom'];
		const hash = 'third-party-hash';

		const result = generatePhpAssetFile(dependencies, hash);

		expect(result).toContain('"lodash"');
		expect(result).toContain('"moment"');
		expect(result).toContain('"react"');
		expect(result).toContain('"react-dom"');
		expect(result).toContain('"version" => "third-party-hash"');
	});

	it('should handle mixed dependency types', () => {
		const dependencies = [
			'wp-blocks',
			'lodash',
			'my-custom-script',
			'wp-element',
		];
		const hash = 'mixed-deps-hash';

		const result = generatePhpAssetFile(dependencies, hash);

		expect(result).toContain('"wp-blocks"');
		expect(result).toContain('"lodash"');
		expect(result).toContain('"my-custom-script"');
		expect(result).toContain('"wp-element"');
		expect(result).toContain('"version" => "mixed-deps-hash"');
	});

	it('should preserve dependency order', () => {
		const dependencies = ['first', 'second', 'third'];
		const hash = 'order-test';

		const result = generatePhpAssetFile(dependencies, hash);

		const startIndex = result.indexOf('["first"');
		const middleIndex = result.indexOf('"second"');
		const endIndex = result.indexOf('"third"]');

		expect(startIndex).toBeLessThan(middleIndex);
		expect(middleIndex).toBeLessThan(endIndex);
	});

	it('should handle long hashes', () => {
		const dependencies = ['wp-blocks'];
		const hash =
			'a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0';

		const result = generatePhpAssetFile(dependencies, hash);

		expect(result).toContain(`"version" => "${hash}"`);
	});

	it('should handle dependencies with special characters', () => {
		const dependencies = ['wp-blocks', 'my-script-v2', 'custom_script_123'];
		const hash = 'special-chars-test';

		const result = generatePhpAssetFile(dependencies, hash);

		expect(result).toContain('"wp-blocks"');
		expect(result).toContain('"my-script-v2"');
		expect(result).toContain('"custom_script_123"');
	});

	it('should remove duplicates when using Set', () => {
		const dependencies = new Set(['wp-blocks', 'wp-element', 'wp-blocks']); // Duplicate wp-blocks
		const hash = 'duplicate-test';

		const result = generatePhpAssetFile(dependencies, hash);

		// Should only contain wp-blocks once
		const blockCount = (result.match(/"wp-blocks"/g) || []).length;
		expect(blockCount).toBe(1);
		expect(result).toContain('"wp-element"');
	});

	it('should generate valid PHP syntax', () => {
		const dependencies = ['wp-blocks', 'wp-element'];
		const hash = 'syntax-test';

		const result = generatePhpAssetFile(dependencies, hash);

		expect(result.startsWith('<?php return [')).toBe(true);
		expect(result.endsWith('];')).toBe(true);
		expect(result).toContain('"dependencies" =>');
		expect(result).toContain('"version" =>');
	});
});
