import { describe, it, expect } from 'vitest';
import { generateFileHash } from '../../../../src/common/utils/version/generateFileHash.ts';

describe('generateFileHash', () => {
	it('should generate consistent hash for same content', () => {
		const content = 'Hello, World!';
		const hash1 = generateFileHash(content);
		const hash2 = generateFileHash(content);

		expect(hash1).toBe(hash2);
		expect(hash1).toHaveLength(32); // MD5 hash is 32 characters
		expect(hash1).toMatch(/^[a-f0-9]{32}$/); // Valid hex string
	});

	it('should generate different hashes for different content', () => {
		const content1 = 'Hello, World!';
		const content2 = 'Hello, Universe!';

		const hash1 = generateFileHash(content1);
		const hash2 = generateFileHash(content2);

		expect(hash1).not.toBe(hash2);
	});

	it('should handle empty string', () => {
		const hash = generateFileHash('');
		expect(hash).toHaveLength(32);
		expect(hash).toBe('d41d8cd98f00b204e9800998ecf8427e'); // Known MD5 of empty string
	});

	it('should handle various content types', () => {
		const jsonContent = '{"name": "test"}';
		const cssContent = 'body { margin: 0; }';

		const jsonHash = generateFileHash(jsonContent);
		const cssHash = generateFileHash(cssContent);

		expect(jsonHash).toHaveLength(32);
		expect(cssHash).toHaveLength(32);
		expect(jsonHash).not.toBe(cssHash);
	});
});
