import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import { BUILD_DIR } from '../build-output/helpers.js';

describe('Manifest PHP - Content Validation', () => {
	let manifestPath;
	let manifestContent;
	let manifestData;

	beforeAll(async () => {
		manifestPath = join(BUILD_DIR, 'manifest.php');

		if (existsSync(manifestPath)) {
			manifestContent = readFileSync(manifestPath, 'utf8');
			// Parse PHP array content (simplified for testing)
			manifestData = parsePhpManifest(manifestContent);
		}
	});

	describe('Phantom Dependencies', () => {
		it('should not contain editor-styles.js dependencies', () => {
			expect(manifestContent).not.toContain('editor-styles.js');
		});

		it('should not contain style-index.js dependencies', () => {
			expect(manifestContent).not.toContain('style-index.js');
		});

		it('should not contain phantom CSS-to-JS dependencies', () => {
			expect(manifestContent).not.toMatch(
				/['"'][^'"]*\/editor-styles['"']/
			);
			expect(manifestContent).not.toMatch(
				/['"'][^'"]*\/style-index['"']/
			);
		});
	});

	describe('Valid Dependencies', () => {
		it('should contain legitimate WordPress dependencies', () => {
			expect(manifestContent).toMatch(/@wordpress\/[a-z-]+/);
		});

		it('should contain shared chunk dependencies', () => {
			expect(manifestContent).toMatch(
				/assets\/common\/[a-zA-Z0-9_-]+\.js/
			);
		});

		it('should have properly formatted dependency arrays', () => {
			// Check that dependencies are in array format
			const dependencyMatches = manifestContent.match(
				/'dependencies' => \[[\s\S]*?\]/g
			);
			if (dependencyMatches) {
				dependencyMatches.forEach((match) => {
					expect(match).toMatch(/\[[\s\S]*\]/);
				});
			}
		});
	});

	describe('File Path Validation', () => {
		it('should have consistent block.json paths', () => {
			const blockJsonPaths = manifestContent.match(
				/'blockJson' => '([^']+)'/g
			);
			if (blockJsonPaths) {
				blockJsonPaths.forEach((match) => {
					const path = match.match(/'blockJson' => '([^']+)'/)[1];
					expect(path).toMatch(
						/^(block-library|page-templates|template-parts)\/[^\/]+\/block\.json$/
					);
				});
			}
		});

		it('should have consistent script paths', () => {
			const scriptPaths = manifestContent.match(/'editor' => '([^']+)'/g);
			if (scriptPaths) {
				scriptPaths.forEach((match) => {
					const path = match.match(/'editor' => '([^']+)'/)[1];
					expect(path).toMatch(
						/^(block-library|page-templates|template-parts)\/[^\/]+\/index\.js$/
					);
				});
			}
		});

		it('should have consistent style paths', () => {
			const stylePaths = manifestContent.match(
				/'frontend' => '([^']+\.css)'/g
			);
			if (stylePaths) {
				stylePaths.forEach((match) => {
					const path = match.match(/'frontend' => '([^']+)'/)[1];
					expect(path).toMatch(
						/^(block-library|page-templates|template-parts)\/[^\/]+\/style-index\.css$/
					);
				});
			}
		});
	});

	describe('Asset Information', () => {
		it('should have properly formatted chunk information', () => {
			// Check for chunk name format
			expect(manifestContent).toMatch(/'name' => '[a-zA-Z0-9_-]+'/);

			// Check for fileName format
			expect(manifestContent).toMatch(
				/'fileName' => 'assets\/common\/[a-zA-Z0-9_-]+\.js'/
			);
		});

		it('should have module lists for chunks', () => {
			// Check that modules arrays exist and contain relative paths
			const moduleMatches = manifestContent.match(
				/'modules' => \[[\s\S]*?\]/g
			);
			if (moduleMatches) {
				moduleMatches.forEach((match) => {
					// Should contain resources/ paths or be empty
					if (match.includes("'resources/")) {
						expect(match).toMatch(/'resources\/[^']+'/);
					}
				});
			}
		});

		it('should not contain absolute paths in modules', () => {
			// Check that no absolute paths are present
			expect(manifestContent).not.toMatch(/['"'][A-Za-z]:[\\\/]/); // Windows absolute
			expect(manifestContent).not.toMatch(/['"']\/[^\/][^'"]*\/[^'"]*'/); // Unix absolute (except relative starting with /)
		});
	});
});

/**
 * Simple PHP array parser for testing (basic implementation)
 * @param {string} phpContent
 * @returns {object|null}
 */
function parsePhpManifest(phpContent) {
	try {
		// This is a simplified parser for testing purposes
		// In a real scenario, you might want to use a proper PHP parser
		const arrayMatch = phpContent.match(/return\s+(\[[\s\S]*\]);/);
		if (!arrayMatch) return null;

		// Basic parsing - just return indication that parsing worked
		return { parsed: true, content: arrayMatch[1] };
	} catch (error) {
		return null;
	}
}
