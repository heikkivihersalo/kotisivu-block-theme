import { describe, it, expect } from 'vitest';
import {
	getBlockDirectories,
	hasFile,
	getBlockName,
	readBlockFile,
} from '../helpers.js';

describe('File Content Validation Tests', () => {
	it('should have properly bundled index.js files with all dependencies', () => {
		const blockDirs = getBlockDirectories();

		blockDirs.forEach((blockDir) => {
			const blockName = getBlockName(blockDir);

			if (hasFile(blockDir, 'index.js')) {
				const indexJsContent = readBlockFile(blockDir, 'index.js');

				// Should contain block registration
				expect(
					indexJsContent,
					`${blockName} index.js should contain block registration`
				).toMatch(/registerBlockType|register|wp\.blocks/);
			}
		});
	});

	it('should have properly bundled index.js files (no separate edit.js)', () => {
		const blockDirs = getBlockDirectories();

		blockDirs.forEach((blockDir) => {
			const blockName = getBlockName(blockDir);

			// Should NOT have separate edit.js files (everything bundled into index.js)
			expect(
				hasFile(blockDir, 'edit.js'),
				`${blockName} should not have separate edit.js (should be bundled into index.js)`
			).toBe(false);
		});
	});

	it('should not generate style-index.js files (only style-index.css)', () => {
		const blockDirs = getBlockDirectories();

		blockDirs.forEach((blockDir) => {
			const blockName = getBlockName(blockDir);

			// Should NOT have style-index.js files (frontend styles should only generate CSS)
			expect(
				hasFile(blockDir, 'style-index.js'),
				`${blockName} should not have style-index.js (frontend styles should only generate CSS)`
			).toBe(false);
		});
	});

	it('should only have style-index.css if there are meaningful frontend styles', () => {
		const blockDirs = getBlockDirectories();

		blockDirs.forEach((blockDir) => {
			const blockName = getBlockName(blockDir);

			if (hasFile(blockDir, 'style-index.css')) {
				const styleIndexCssContent = readBlockFile(
					blockDir,
					'style-index.css'
				);

				// Remove comments and whitespace to check for meaningful content
				const cleanedContent = styleIndexCssContent
					.replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
					.replace(/\s+/g, '') // Remove whitespace
					.trim();

				expect(
					cleanedContent.length,
					`${blockName} style-index.css exists but has no meaningful content`
				).toBeGreaterThan(0);
			}
		});
	});
});
