import { describe, it, expect } from 'vitest';
import { createHash } from 'node:crypto';
import { generateFileHash } from '../../../src/common/utils/generateFileHash';

describe('generateFileHash', () => {
	it('should generate consistent MD5 hash for the same content', () => {
		const content = 'Hello, World!';
		const hash1 = generateFileHash(content);
		const hash2 = generateFileHash(content);

		expect(hash1).toBe(hash2);
		expect(hash1).toHaveLength(32); // MD5 hash length
		expect(hash1).toMatch(/^[a-f0-9]{32}$/); // MD5 hash format
	});

	it('should generate different hashes for different content', () => {
		const content1 = 'Hello, World!';
		const content2 = 'Hello, Universe!';

		const hash1 = generateFileHash(content1);
		const hash2 = generateFileHash(content2);

		expect(hash1).not.toBe(hash2);
	});

	it('should generate hash for empty string', () => {
		const hash = generateFileHash('');

		expect(hash).toHaveLength(32);
		expect(hash).toMatch(/^[a-f0-9]{32}$/);
		// Empty string MD5 hash is always the same
		expect(hash).toBe('d41d8cd98f00b204e9800998ecf8427e');
	});

	it('should generate hash for multiline content', () => {
		const content = `Line 1
Line 2
Line 3`;
		const hash = generateFileHash(content);

		expect(hash).toHaveLength(32);
		expect(hash).toMatch(/^[a-f0-9]{32}$/);
	});

	it('should generate hash for content with special characters', () => {
		const content = '!@#$%^&*()_+-=[]{}|;:,.<>?';
		const hash = generateFileHash(content);

		expect(hash).toHaveLength(32);
		expect(hash).toMatch(/^[a-f0-9]{32}$/);
	});

	it('should generate hash for Unicode content', () => {
		const content = '🚀 Hello 世界 🌍';
		const hash = generateFileHash(content);

		expect(hash).toHaveLength(32);
		expect(hash).toMatch(/^[a-f0-9]{32}$/);
	});

	it('should match Node.js crypto module MD5 hash', () => {
		const content = 'Test content for validation';
		const expectedHash = createHash('md5').update(content).digest('hex');
		const actualHash = generateFileHash(content);

		expect(actualHash).toBe(expectedHash);
	});

	it('should be case sensitive', () => {
		const content1 = 'Hello World';
		const content2 = 'hello world';

		const hash1 = generateFileHash(content1);
		const hash2 = generateFileHash(content2);

		expect(hash1).not.toBe(hash2);
	});

	it('should be whitespace sensitive', () => {
		const content1 = 'Hello World';
		const content2 = 'Hello  World'; // Extra space
		const content3 = ' Hello World'; // Leading space
		const content4 = 'Hello World '; // Trailing space

		const hash1 = generateFileHash(content1);
		const hash2 = generateFileHash(content2);
		const hash3 = generateFileHash(content3);
		const hash4 = generateFileHash(content4);

		expect(hash1).not.toBe(hash2);
		expect(hash1).not.toBe(hash3);
		expect(hash1).not.toBe(hash4);
	});

	it('should handle very long content', () => {
		const longContent = 'a'.repeat(10000);
		const hash = generateFileHash(longContent);

		expect(hash).toHaveLength(32);
		expect(hash).toMatch(/^[a-f0-9]{32}$/);
	});

	it('should handle JSON content', () => {
		const jsonContent = JSON.stringify({
			name: 'test',
			version: '1.0.0',
			dependencies: ['react', 'vue'],
		});
		const hash = generateFileHash(jsonContent);

		expect(hash).toHaveLength(32);
		expect(hash).toMatch(/^[a-f0-9]{32}$/);
	});
});
