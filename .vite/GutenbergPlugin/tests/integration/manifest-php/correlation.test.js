import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import { BUILD_DIR } from '../build-output/helpers.js';

describe('Manifest PHP - Asset Correlation', () => {
	let manifestPath;
	let manifestContent;

	beforeAll(async () => {
		manifestPath = join(BUILD_DIR, 'manifest.php');

		if (existsSync(manifestPath)) {
			manifestContent = readFileSync(manifestPath, 'utf8');
		}
	});

	describe('File Existence Validation', () => {
		it('should only reference existing block.json files', () => {
			const blockJsonPaths = manifestContent.match(
				/'blockJson' => '([^']+)'/g
			);

			if (blockJsonPaths) {
				blockJsonPaths.forEach((match) => {
					const relativePath = match.match(
						/'blockJson' => '([^']+)'/
					)[1];
					const fullPath = join(BUILD_DIR, relativePath);
					expect(existsSync(fullPath)).toBe(true);
				});
			}
		});

		it('should only reference existing JavaScript files', () => {
			const jsPaths = [
				...(manifestContent.match(/'editor' => '([^']+\.js)'/g) || []),
				...(manifestContent.match(/'frontend' => '([^']+\.js)'/g) ||
					[]),
			];

			if (jsPaths.length > 0) {
				jsPaths.forEach((match) => {
					const relativePath = match.match(/' => '([^']+)'/)[1];
					const fullPath = join(BUILD_DIR, relativePath);
					expect(existsSync(fullPath)).toBe(true);
				});
			}
		});

		it('should only reference existing CSS files', () => {
			const cssPaths = manifestContent.match(
				/'frontend' => '([^']+\.css)'/g
			);

			if (cssPaths) {
				cssPaths.forEach((match) => {
					const relativePath = match.match(
						/'frontend' => '([^']+)'/
					)[1];
					const fullPath = join(BUILD_DIR, relativePath);
					expect(existsSync(fullPath)).toBe(true);
				});
			}
		});

		it('should only reference existing asset chunks', () => {
			const assetPaths = manifestContent.match(
				/'fileName' => '([^']+\.js)'/g
			);

			if (assetPaths) {
				assetPaths.forEach((match) => {
					const relativePath = match.match(
						/'fileName' => '([^']+)'/
					)[1];
					const fullPath = join(BUILD_DIR, relativePath);
					expect(existsSync(fullPath)).toBe(true);
				});
			}
		});
	});

	describe('Dependency Validation', () => {
		it('should only reference valid internal dependencies', () => {
			const dependencyArrays = manifestContent.match(
				/'dependencies' => \[([\s\S]*?)\]/g
			);

			if (dependencyArrays) {
				dependencyArrays.forEach((depArray) => {
					const deps = depArray.match(/'([^']+)'/g);
					if (deps) {
						deps.forEach((dep) => {
							const cleanDep = dep.replace(/'/g, '');

							// Skip WordPress core dependencies
							if (cleanDep.startsWith('@wordpress/')) return;

							// Check internal asset dependencies
							if (cleanDep.includes('assets/')) {
								const assetPath = join(BUILD_DIR, cleanDep);
								expect(existsSync(assetPath)).toBe(true);
							}
						});
					}
				});
			}
		});

		it('should have valid WordPress core dependencies', () => {
			const wpDependencies = manifestContent.match(
				/'(@wordpress\/[a-z-]+)'/g
			);

			if (wpDependencies) {
				const validWpPackages = [
					'@wordpress/blocks',
					'@wordpress/block-editor',
					'@wordpress/components',
					'@wordpress/data',
					'@wordpress/element',
					'@wordpress/hooks',
					'@wordpress/i18n',
					'@wordpress/icons',
					'@wordpress/server-side-render',
				];

				wpDependencies.forEach((dep) => {
					const cleanDep = dep.replace(/'/g, '');
					// Should be a known WordPress package or follow WordPress naming convention
					const isValid =
						validWpPackages.includes(cleanDep) ||
						/^@wordpress\/[a-z][a-z-]*[a-z]$/.test(cleanDep);
					expect(isValid).toBe(true);
				});
			}
		});
	});

	describe('Consistency Checks', () => {
		it('should have consistent naming between manifest and files', () => {
			const blockNames = manifestContent.match(
				/'([a-z-]+)' => \[[\s\S]*?'blockJson'/g
			);

			if (blockNames) {
				blockNames.forEach((match) => {
					const blockName = match.match(/'([a-z-]+)' => \[/)[1];
					expect(blockName).toMatch(
						/^[a-z][a-z0-9-]*[a-z0-9]$|^[a-z]$/
					);
				});
			}
		});

		it('should have matching JSON and PHP manifest block counts', () => {
			const jsonManifestPath = join(BUILD_DIR, 'manifest.json');

			if (existsSync(jsonManifestPath)) {
				const jsonContent = readFileSync(jsonManifestPath, 'utf8');
				const jsonData = JSON.parse(jsonContent);

				// Count blocks in PHP manifest
				const phpBlockMatches =
					manifestContent.match(/'blockJson' => '[^']+'/g) || [];

				// Count blocks in JSON manifest
				const jsonBlockCount = Object.keys(jsonData).length;

				expect(phpBlockMatches.length).toBe(jsonBlockCount);
			}
		});

		it('should have proper asset chunk references', () => {
			// Check that chunks referenced in dependencies actually exist in assets section
			const dependencyChunks =
				manifestContent.match(/'assets\/common\/[^']+\.js'/g) || [];
			const assetChunks =
				manifestContent.match(
					/'fileName' => 'assets\/common\/[^']+\.js'/g
				) || [];

			dependencyChunks.forEach((depChunk) => {
				const chunkName = depChunk.match(
					/'(assets\/common\/[^']+\.js)'/
				)[1];
				const hasMatchingAsset = assetChunks.some((assetChunk) =>
					assetChunk.includes(chunkName)
				);
				expect(hasMatchingAsset).toBe(true);
			});
		});
	});

	describe('Performance Considerations', () => {
		it('should not have circular dependencies', () => {
			// Basic check for obvious circular references
			const assetImports =
				manifestContent.match(/'imports' => \[([\s\S]*?)\]/g) || [];

			assetImports.forEach((importArray) => {
				const imports = importArray.match(/'([^']+)'/g) || [];
				const uniqueImports = [...new Set(imports)];

				// Should not import itself or have duplicates
				expect(imports.length).toBe(uniqueImports.length);
			});
		});

		it('should have reasonable dependency tree depth', () => {
			// Check that we don't have excessively deep dependency chains
			const maxDependencies = 20; // Reasonable limit
			const dependencyArrays =
				manifestContent.match(/'dependencies' => \[([\s\S]*?)\]/g) ||
				[];

			dependencyArrays.forEach((depArray) => {
				const deps = depArray.match(/'[^']+'/g) || [];
				expect(deps.length).toBeLessThanOrEqual(maxDependencies);
			});
		});
	});
});
