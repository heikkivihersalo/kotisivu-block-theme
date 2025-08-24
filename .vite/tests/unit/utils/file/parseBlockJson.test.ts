import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { parseBlockJson } from '../../../../src/common/utils/file/parseBlockJson.ts';
import type { WordPressBlockJSON } from '../../../../src/common/types/wordpress.ts';

describe('parseBlockJson', () => {
	let tempDir: string;

	beforeEach(() => {
		tempDir = mkdtempSync(join(tmpdir(), 'parseBlockJson-test-'));
	});

	afterEach(() => {
		rmSync(tempDir, { recursive: true, force: true });
	});

	it('should parse valid block.json file', () => {
		const blockData: WordPressBlockJSON = {
			name: 'my-theme/custom-block',
			title: 'Custom Block',
			category: 'widgets',
			apiVersion: 2,
		};

		const filePath = join(tempDir, 'block.json');
		writeFileSync(filePath, JSON.stringify(blockData));

		const result = parseBlockJson(filePath);
		expect(result).toEqual(blockData);
	});

	it('should return null for non-existent file', () => {
		const filePath = join(tempDir, 'non-existent.json');
		const result = parseBlockJson(filePath);
		expect(result).toBeNull();
	});

	it('should return null for invalid JSON', () => {
		const filePath = join(tempDir, 'invalid.json');
		writeFileSync(filePath, '{ invalid json content');

		const result = parseBlockJson(filePath);
		expect(result).toBeNull();
	});
});
