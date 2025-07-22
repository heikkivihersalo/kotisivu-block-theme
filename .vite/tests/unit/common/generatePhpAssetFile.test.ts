import { describe, it, expect } from 'vitest';
import { generatePhpAssetFile } from '../../../src/common/utils/generatePhpAssetFile';

describe('generatePhpAssetFile', () => {
	it('should generate PHP file with array dependencies and empty hash', () => {
		const dependencies = ['jquery', 'react', 'vue'];
		const result = generatePhpAssetFile(dependencies);

		expect(result).toBe(
			'<?php return ["dependencies" => ["jquery","react","vue"], "version" => ""];'
		);
	});

	it('should generate PHP file with Set dependencies and empty hash', () => {
		const dependencies = new Set(['jquery', 'react', 'vue']);
		const result = generatePhpAssetFile(dependencies);

		expect(result).toBe(
			'<?php return ["dependencies" => ["jquery","react","vue"], "version" => ""];'
		);
	});

	it('should generate PHP file with dependencies and custom hash', () => {
		const dependencies = ['jquery', 'lodash'];
		const hash = 'abc123def456';
		const result = generatePhpAssetFile(dependencies, hash);

		expect(result).toBe(
			'<?php return ["dependencies" => ["jquery","lodash"], "version" => "abc123def456"];'
		);
	});

	it('should generate PHP file with empty dependencies and empty hash', () => {
		const result = generatePhpAssetFile();

		expect(result).toBe(
			'<?php return ["dependencies" => [], "version" => ""];'
		);
	});

	it('should generate PHP file with empty array and empty hash', () => {
		const dependencies: string[] = [];
		const result = generatePhpAssetFile(dependencies);

		expect(result).toBe(
			'<?php return ["dependencies" => [], "version" => ""];'
		);
	});

	it('should generate PHP file with empty Set and empty hash', () => {
		const dependencies = new Set<string>();
		const result = generatePhpAssetFile(dependencies);

		expect(result).toBe(
			'<?php return ["dependencies" => [], "version" => ""];'
		);
	});

	it('should handle single dependency', () => {
		const dependencies = ['jquery'];
		const hash = 'single123';
		const result = generatePhpAssetFile(dependencies, hash);

		expect(result).toBe(
			'<?php return ["dependencies" => ["jquery"], "version" => "single123"];'
		);
	});

	it('should preserve dependency order from array', () => {
		const dependencies = ['z-library', 'a-library', 'm-library'];
		const result = generatePhpAssetFile(dependencies);

		expect(result).toBe(
			'<?php return ["dependencies" => ["z-library","a-library","m-library"], "version" => ""];'
		);
	});

	it('should handle dependencies with special characters', () => {
		const dependencies = ['wp-api-fetch', 'wp-i18n', '@wordpress/blocks'];
		const result = generatePhpAssetFile(dependencies);

		expect(result).toBe(
			'<?php return ["dependencies" => ["wp-api-fetch","wp-i18n","@wordpress/blocks"], "version" => ""];'
		);
	});

	it('should handle hash with special characters', () => {
		const dependencies = ['jquery'];
		const hash = 'hash-with-dashes_and_underscores.123';
		const result = generatePhpAssetFile(dependencies, hash);

		expect(result).toBe(
			'<?php return ["dependencies" => ["jquery"], "version" => "hash-with-dashes_and_underscores.123"];'
		);
	});

	it('should handle long dependency names', () => {
		const dependencies = [
			'very-long-dependency-name-that-might-be-used-in-real-projects',
		];
		const result = generatePhpAssetFile(dependencies);

		expect(result).toBe(
			'<?php return ["dependencies" => ["very-long-dependency-name-that-might-be-used-in-real-projects"], "version" => ""];'
		);
	});

	it('should handle Unicode characters in dependencies', () => {
		const dependencies = ['测试依赖', 'Тест'];
		const result = generatePhpAssetFile(dependencies);

		expect(result).toBe(
			'<?php return ["dependencies" => ["测试依赖","Тест"], "version" => ""];'
		);
	});

	it('should handle Unicode characters in hash', () => {
		const dependencies = ['jquery'];
		const hash = '测试哈希';
		const result = generatePhpAssetFile(dependencies, hash);

		expect(result).toBe(
			'<?php return ["dependencies" => ["jquery"], "version" => "测试哈希"];'
		);
	});

	it('should handle backslashes in dependencies', () => {
		const dependencies = ['library\\with\\backslashes'];
		const result = generatePhpAssetFile(dependencies);

		expect(result).toBe(
			'<?php return ["dependencies" => ["library\\\\with\\\\backslashes"], "version" => ""];'
		);
	});

	it('should handle newlines and special whitespace', () => {
		const dependencies = ['library\nwith\nnewlines', 'library\twith\ttabs'];
		const result = generatePhpAssetFile(dependencies);

		expect(result).toBe(
			'<?php return ["dependencies" => ["library\\nwith\\nnewlines","library\\twith\\ttabs"], "version" => ""];'
		);
	});

	it('should handle many dependencies', () => {
		const dependencies = Array.from(
			{ length: 50 },
			(_, i) => `dependency-${i}`
		);
		const result = generatePhpAssetFile(dependencies);

		expect(result).toContain('<?php return ["dependencies" => [');
		expect(result).toContain('"dependency-0"');
		expect(result).toContain('"dependency-49"');
		expect(result).toContain('], "version" => ""];');
	});

	it('should convert Set to Array and maintain uniqueness', () => {
		const dependencies = new Set([
			'jquery',
			'react',
			'jquery',
			'vue',
			'react',
		]);
		const result = generatePhpAssetFile(dependencies);

		// Set should automatically handle duplicates
		expect(result).toBe(
			'<?php return ["dependencies" => ["jquery","react","vue"], "version" => ""];'
		);
	});

	it('should handle zero-length hash', () => {
		const dependencies = ['jquery'];
		const hash = '';
		const result = generatePhpAssetFile(dependencies, hash);

		expect(result).toBe(
			'<?php return ["dependencies" => ["jquery"], "version" => ""];'
		);
	});

	it('should handle very long hash', () => {
		const dependencies = ['jquery'];
		const hash = 'a'.repeat(1000);
		const result = generatePhpAssetFile(dependencies, hash);

		expect(result).toBe(
			`<?php return ["dependencies" => ["jquery"], "version" => "${hash}"];`
		);
	});

	it('should produce valid PHP syntax', () => {
		const dependencies = ['wp-blocks', 'wp-element', 'wp-i18n'];
		const hash = 'abc123def456';
		const result = generatePhpAssetFile(dependencies, hash);

		// Check that it starts with PHP opening tag
		expect(result).toMatch(/^<\?php/);

		// Check that it has proper array syntax
		expect(result).toContain('return ["dependencies" =>');
		expect(result).toContain('"version" =>');

		// Check that it ends with semicolon
		expect(result).toMatch(/;$/);
	});
});
