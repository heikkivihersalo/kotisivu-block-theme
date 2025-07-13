import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import { BUILD_DIR } from '../build-output/helpers.js';

describe('Manifest PHP - Structure', () => {
	let manifestPath;
	let manifestContent;

	beforeAll(async () => {
		manifestPath = join(BUILD_DIR, 'manifest.php');

		if (existsSync(manifestPath)) {
			manifestContent = readFileSync(manifestPath, 'utf8');
		}
	});

	describe('File Generation', () => {
		it('should generate manifest.php file', () => {
			expect(existsSync(manifestPath)).toBe(true);
		});

		it('should have valid PHP syntax', () => {
			if (!manifestContent) {
				console.warn(
					'manifest.php file not found, skipping syntax tests'
				);
				return;
			}
			expect(manifestContent).toMatch(/^<\?php/);
			expect(manifestContent).toMatch(/return \[/);
			expect(manifestContent).toMatch(/\];$/m);
		});

		it('should include proper PHP header comment', () => {
			if (!manifestContent) {
				console.warn(
					'manifest.php file not found, skipping header tests'
				);
				return;
			}
			expect(manifestContent).toContain(
				'Block manifest - Generated automatically by Vite Gutenberg Plugin'
			);
			expect(manifestContent).toContain(
				'Contains block registration data and asset information'
			);
		});
	});

	describe('Top-level Structure', () => {
		it('should have blocks and assets sections', () => {
			expect(manifestContent).toContain("'blocks' =>");
			expect(manifestContent).toContain("'assets' =>");
		});

		it('should have hierarchical blocks structure', () => {
			expect(manifestContent).toContain("'block-library' =>");
			expect(manifestContent).toContain("'page-templates' =>");
			expect(manifestContent).toContain("'template-parts' =>");
		});

		it('should have assets chunks section', () => {
			expect(manifestContent).toContain("'chunks' =>");
		});
	});

	describe('Block Structure', () => {
		it('should contain block entries with required fields', () => {
			// Check for blockJson field
			expect(manifestContent).toMatch(
				/'blockJson' => '[^']+\/block\.json'/
			);
		});

		it('should contain script entries when present', () => {
			// Check for scripts section
			expect(manifestContent).toMatch(/'scripts' => \[/);
			expect(manifestContent).toMatch(/'editor' => '[^']+\/index\.js'/);
		});

		it('should contain style entries when present', () => {
			// Check for styles section
			expect(manifestContent).toMatch(/'styles' => \[/);
			expect(manifestContent).toMatch(
				/'frontend' => '[^']+\/style-index\.css'/
			);
		});

		it('should contain dependencies when present', () => {
			// Check for dependencies array
			expect(manifestContent).toMatch(/'dependencies' => \[/);
		});
	});

	describe('Asset Structure', () => {
		it('should contain common assets folder', () => {
			expect(manifestContent).toContain("'common' =>");
		});

		it('should have proper chunk structure', () => {
			expect(manifestContent).toMatch(/'name' => '[^']+'/);
			expect(manifestContent).toMatch(
				/'fileName' => 'assets\/common\/[^']+\.js'/
			);
			expect(manifestContent).toMatch(/'imports' => \[/);
			expect(manifestContent).toMatch(/'modules' => \[/);
		});
	});
});
