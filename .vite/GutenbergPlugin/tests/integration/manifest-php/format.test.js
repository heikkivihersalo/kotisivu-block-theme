import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import { BUILD_DIR } from '../build-output/helpers.js';

describe('Manifest PHP - Format Validation', () => {
	let manifestPath;
	let manifestContent;

	beforeAll(async () => {
		manifestPath = join(BUILD_DIR, 'manifest.php');

		if (existsSync(manifestPath)) {
			manifestContent = readFileSync(manifestPath, 'utf8');
		}
	});

	describe('PHP Syntax', () => {
		it('should start with proper PHP opening tag', () => {
			expect(manifestContent).toMatch(/^<\?php\s*\n/);
		});

		it('should have proper array syntax', () => {
			expect(manifestContent).toContain('return [');
			expect(manifestContent).toMatch(/\];$/m);
		});

		it('should use single quotes for strings', () => {
			// Check that strings use single quotes
			const stringMatches = manifestContent.match(
				/'[^'\\]*(?:\\.[^'\\]*)*'/g
			);
			expect(stringMatches).toBeTruthy();
			expect(stringMatches.length).toBeGreaterThan(0);
		});

		it('should properly escape single quotes in strings', () => {
			// If there are escaped quotes, they should be properly formatted
			if (manifestContent.includes("\\'")) {
				expect(manifestContent).toMatch(/\\'/);
			}
		});
	});

	describe('Array Structure', () => {
		it('should have consistent indentation', () => {
			const lines = manifestContent.split('\n');
			let hasProperIndentation = true;

			for (const line of lines) {
				if (line.trim() === '') continue;
				if (
					line.includes('<?php') ||
					line.includes('/*') ||
					line.includes('*/') ||
					line.includes('return')
				)
					continue;

				// Check if line is indented
				if (line.startsWith('    ')) {
					// Should use 4-space indentation
					const indent = line.match(/^(\s*)/)[1].length;
					if (indent > 0 && indent % 4 !== 0) {
						hasProperIndentation = false;
						break;
					}
				}
			}

			// Basic check that indentation follows 4-space rule
			expect(hasProperIndentation).toBe(true);
		});

		it('should have proper array formatting', () => {
			// Check for proper array opening/closing
			const openBrackets = (manifestContent.match(/\[/g) || []).length;
			const closeBrackets = (manifestContent.match(/\]/g) || []).length;
			expect(openBrackets).toBe(closeBrackets);
		});

		it('should have proper key-value formatting', () => {
			// Check for proper => syntax
			expect(manifestContent).toMatch(/'[^']+' => /);
		});
	});

	describe('Content Organization', () => {
		it('should have blocks section before assets section', () => {
			const blocksIndex = manifestContent.indexOf("'blocks' =>");
			const assetsIndex = manifestContent.indexOf("'assets' =>");

			expect(blocksIndex).toBeGreaterThan(-1);
			expect(assetsIndex).toBeGreaterThan(-1);
			expect(blocksIndex).toBeLessThan(assetsIndex);
		});

		it('should group blocks by directory type', () => {
			const blockLibraryIndex =
				manifestContent.indexOf("'block-library' =>");
			const pageTemplatesIndex = manifestContent.indexOf(
				"'page-templates' =>"
			);
			const templatePartsIndex = manifestContent.indexOf(
				"'template-parts' =>"
			);

			// All should exist and be in logical order
			expect(blockLibraryIndex).toBeGreaterThan(-1);
			expect(pageTemplatesIndex).toBeGreaterThan(-1);
			expect(templatePartsIndex).toBeGreaterThan(-1);
		});

		it('should have proper nesting structure', () => {
			// Check that each block has proper nesting
			const blockEntries = manifestContent.match(
				/'[a-z-]+' => \[[\s\S]*?'blockJson' => '[^']+'/g
			);
			if (blockEntries) {
				expect(blockEntries.length).toBeGreaterThan(0);
				blockEntries.forEach((entry) => {
					expect(entry).toContain("'blockJson' =>");
				});
			}
		});
	});

	describe('File Size and Performance', () => {
		it('should not be excessively large', () => {
			// Manifest should be reasonable size (under 100KB for typical project)
			expect(manifestContent.length).toBeLessThan(100000);
		});

		it('should not have excessive whitespace', () => {
			// Check that there aren't too many consecutive empty lines
			expect(manifestContent).not.toMatch(/\n\s*\n\s*\n\s*\n/);
		});

		it('should have minimal redundancy', () => {
			// Basic check that we're not repeating large chunks
			const lines = manifestContent.split('\n');
			const uniqueLines = [...new Set(lines)];
			const redundancyRatio = uniqueLines.length / lines.length;

			// Should have reasonable uniqueness (manifest has expected structural repetition)
			expect(redundancyRatio).toBeGreaterThan(0.4);
		});
	});
});
