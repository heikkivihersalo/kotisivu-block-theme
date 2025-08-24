import { describe, it, expect } from 'vitest';
import { generateFileHash } from '../../../../src/common/utils/version/generateFileHash.ts';

describe('generateFileHash', () => {
	it('should generate consistent hash for same content', () => {
		const content = 'Hello, World!';
		const hash1 = generateFileHash(content);
		const hash2 = generateFileHash(content);

		expect(hash1).toBe(hash2);
		expect(hash1).toHaveLength(32); // MD5 hash is 32 characters
	});

	it('should generate different hashes for different content', () => {
		const content1 = 'Hello, World!';
		const content2 = 'Hello, Universe!';

		const hash1 = generateFileHash(content1);
		const hash2 = generateFileHash(content2);

		expect(hash1).not.toBe(hash2);
		expect(hash1).toHaveLength(32);
		expect(hash2).toHaveLength(32);
	});

	it('should generate hash for empty string', () => {
		const content = '';
		const hash = generateFileHash(content);

		expect(hash).toHaveLength(32);
		expect(hash).toBe('d41d8cd98f00b204e9800998ecf8427e'); // Known MD5 of empty string
	});

	it('should generate hash for single character', () => {
		const content = 'a';
		const hash = generateFileHash(content);

		expect(hash).toHaveLength(32);
		expect(hash).toBe('0cc175b9c0f1b6a831c399e269772661'); // Known MD5 of 'a'
	});

	it('should handle special characters and unicode', () => {
		const content = '特殊字符 🎉 émojis & symbols!@#$%^&*()';
		const hash = generateFileHash(content);

		expect(hash).toHaveLength(32);
		expect(hash).toMatch(/^[a-f0-9]{32}$/); // Valid hex string
	});

	it('should handle newlines and whitespace', () => {
		const content = 'Line 1\nLine 2\r\nLine 3\t\tTabbed';
		const hash = generateFileHash(content);

		expect(hash).toHaveLength(32);
		expect(hash).toMatch(/^[a-f0-9]{32}$/);
	});

	it('should be case sensitive', () => {
		const content1 = 'Hello World';
		const content2 = 'hello world';

		const hash1 = generateFileHash(content1);
		const hash2 = generateFileHash(content2);

		expect(hash1).not.toBe(hash2);
	});

	it('should handle very long content', () => {
		const content = 'a'.repeat(10000); // 10KB of 'a' characters
		const hash = generateFileHash(content);

		expect(hash).toHaveLength(32);
		expect(hash).toMatch(/^[a-f0-9]{32}$/);
	});

	it('should handle JSON content', () => {
		const content = JSON.stringify(
			{
				name: 'test-block',
				version: '1.0.0',
				dependencies: ['@wordpress/element', '@wordpress/blocks'],
				config: {
					nested: {
						property: 'value',
					},
				},
			},
			null,
			2
		);

		const hash = generateFileHash(content);

		expect(hash).toHaveLength(32);
		expect(hash).toMatch(/^[a-f0-9]{32}$/);
	});

	it('should handle CSS content', () => {
		const content = `
			body {
				margin: 0;
				padding: 0;
				font-family: Arial, sans-serif;
			}
			
			.container {
				max-width: 1200px;
				margin: 0 auto;
			}
		`;

		const hash = generateFileHash(content);

		expect(hash).toHaveLength(32);
		expect(hash).toMatch(/^[a-f0-9]{32}$/);
	});

	it('should handle JavaScript content', () => {
		const content = `
			function calculateHash(input) {
				return crypto.createHash('md5').update(input).digest('hex');
			}
			
			const result = calculateHash('test data');
			console.log(result);
		`;

		const hash = generateFileHash(content);

		expect(hash).toHaveLength(32);
		expect(hash).toMatch(/^[a-f0-9]{32}$/);
	});

	it('should generate valid hex string', () => {
		const content = 'Test content for hex validation';
		const hash = generateFileHash(content);

		expect(hash).toMatch(/^[a-f0-9]{32}$/);
		expect(parseInt(hash, 16)).not.toBeNaN();
	});

	it('should handle binary-like content', () => {
		const content = '\x00\x01\x02\x03\xFF\xFE\xFD';
		const hash = generateFileHash(content);

		expect(hash).toHaveLength(32);
		expect(hash).toMatch(/^[a-f0-9]{32}$/);
	});

	it('should produce known hash for known input', () => {
		const content = 'The quick brown fox jumps over the lazy dog';
		const hash = generateFileHash(content);

		expect(hash).toBe('9e107d9d372bb6826bd81d3542a419d6'); // Known MD5 hash
	});
});
