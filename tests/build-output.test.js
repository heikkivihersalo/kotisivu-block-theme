import { describe, it, expect, beforeAll } from 'vitest';
import { existsSync, readFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

const BUILD_DIR = './build/blocks';

/**
 * Get all block directories from the build output
 * @returns {string[]} Array of block directory paths
 */
function getBlockDirectories() {
	const blockLibraryPath = join(BUILD_DIR, 'block-library');
	const pageTemplatesPath = join(BUILD_DIR, 'page-templates');
	const templatePartsPath = join(BUILD_DIR, 'template-parts');

	const blockDirs = [];

	// Get block-library blocks
	if (existsSync(blockLibraryPath)) {
		const blockLibraryDirs = readdirSync(blockLibraryPath)
			.map((dir) => join(blockLibraryPath, dir))
			.filter((path) => statSync(path).isDirectory());
		blockDirs.push(...blockLibraryDirs);
	}

	// Get page-templates blocks
	if (existsSync(pageTemplatesPath)) {
		const pageTemplateDirs = readdirSync(pageTemplatesPath)
			.map((dir) => join(pageTemplatesPath, dir))
			.filter((path) => statSync(path).isDirectory());
		blockDirs.push(...pageTemplateDirs);
	}

	// Get template-parts blocks
	if (existsSync(templatePartsPath)) {
		const templatePartDirs = readdirSync(templatePartsPath)
			.map((dir) => join(templatePartsPath, dir))
			.filter((path) => statSync(path).isDirectory());
		blockDirs.push(...templatePartDirs);
	}

	return blockDirs;
}

/**
 * Check if a file exists in a block directory
 * @param {string} blockDir - Block directory path
 * @param {string} filename - File to check
 * @returns {boolean} True if file exists
 */
function hasFile(blockDir, filename) {
	return existsSync(join(blockDir, filename));
}

/**
 * Get the block name from directory path
 * @param {string} blockDir - Block directory path
 * @returns {string} Block name
 */
function getBlockName(blockDir) {
	return blockDir.split('/').pop();
}

describe('Block Build Output Tests', () => {
	beforeAll(() => {
		// Ensure the build directory exists
		expect(existsSync(BUILD_DIR)).toBe(true);
	});

	describe('Required Files Structure', () => {
		it('should have required files for each block', () => {
			const blockDirs = getBlockDirectories();
			expect(blockDirs.length).toBeGreaterThan(0);

			blockDirs.forEach((blockDir) => {
				const blockName = getBlockName(blockDir);

				// Every block MUST have these files
				expect(
					hasFile(blockDir, 'block.json'),
					`${blockName} is missing block.json`
				).toBe(true);
				expect(
					hasFile(blockDir, 'index.js'),
					`${blockName} is missing index.js`
				).toBe(true);
			});
		});

		it('should have valid block.json files', () => {
			const blockDirs = getBlockDirectories();

			blockDirs.forEach((blockDir) => {
				const blockName = getBlockName(blockDir);
				const blockJsonPath = join(blockDir, 'block.json');

				if (hasFile(blockDir, 'block.json')) {
					const blockJsonContent = readFileSync(
						blockJsonPath,
						'utf-8'
					);

					// Should be valid JSON
					expect(
						() => JSON.parse(blockJsonContent),
						`${blockName} has invalid block.json`
					).not.toThrow();

					const blockJson = JSON.parse(blockJsonContent);

					// Should have required properties
					expect(
						blockJson.name,
						`${blockName} block.json missing name property`
					).toBeDefined();
					// Note: version is optional for blocks, so we'll skip that check
				}
			});
		});

		it('should have non-empty index.js files', () => {
			const blockDirs = getBlockDirectories();

			blockDirs.forEach((blockDir) => {
				const blockName = getBlockName(blockDir);
				const indexJsPath = join(blockDir, 'index.js');

				if (hasFile(blockDir, 'index.js')) {
					const indexJsContent = readFileSync(indexJsPath, 'utf-8');

					// Should not be empty
					expect(
						indexJsContent.trim().length,
						`${blockName} index.js is empty`
					).toBeGreaterThan(0);
				}
			});
		});

		it('should have properly organized optional files', () => {
			const blockDirs = getBlockDirectories();

			blockDirs.forEach((blockDir) => {
				const blockName = getBlockName(blockDir);

				// Check optional files exist if present
				if (hasFile(blockDir, 'index.css')) {
					const indexCssContent = readFileSync(
						join(blockDir, 'index.css'),
						'utf-8'
					);
					expect(
						indexCssContent.trim().length,
						`${blockName} index.css exists but is empty`
					).toBeGreaterThan(0);
				}

				if (hasFile(blockDir, 'style-index.css')) {
					const styleIndexCssContent = readFileSync(
						join(blockDir, 'style-index.css'),
						'utf-8'
					);
					expect(
						styleIndexCssContent.trim().length,
						`${blockName} style-index.css exists but is empty`
					).toBeGreaterThan(0);
				}

				if (hasFile(blockDir, 'view.js')) {
					const viewJsContent = readFileSync(
						join(blockDir, 'view.js'),
						'utf-8'
					);
					expect(
						viewJsContent.trim().length,
						`${blockName} view.js exists but is empty`
					).toBeGreaterThan(0);
				}

				if (hasFile(blockDir, 'render.php')) {
					const renderPhpContent = readFileSync(
						join(blockDir, 'render.php'),
						'utf-8'
					);
					expect(
						renderPhpContent.trim().length,
						`${blockName} render.php exists but is empty`
					).toBeGreaterThan(0);
				}
			});
		});
	});

	describe('Asset Organization', () => {
		it('should have editor-assets folder with shared editor dependencies', () => {
			const editorAssetsPath = join(BUILD_DIR, 'editor-assets');
			expect(
				existsSync(editorAssetsPath),
				'editor-assets folder should exist'
			).toBe(true);

			const editorAssets = readdirSync(editorAssetsPath);
			expect(
				editorAssets.length,
				'editor-assets folder should not be empty'
			).toBeGreaterThan(0);
		});

		it('should have frontend-assets folder with shared frontend dependencies', () => {
			const frontendAssetsPath = join(BUILD_DIR, 'frontend-assets');
			expect(
				existsSync(frontendAssetsPath),
				'frontend-assets folder should exist'
			).toBe(true);

			const frontendAssets = readdirSync(frontendAssetsPath);
			expect(
				frontendAssets.length,
				'frontend-assets folder should not be empty'
			).toBeGreaterThan(0);
		});

		it('should have manifest.json file', () => {
			const manifestPath = join(BUILD_DIR, 'manifest.json');
			expect(existsSync(manifestPath), 'manifest.json should exist').toBe(
				true
			);

			const manifestContent = readFileSync(manifestPath, 'utf-8');
			expect(
				() => JSON.parse(manifestContent),
				'manifest.json should be valid JSON'
			).not.toThrow();
		});

		it('should not have style-index.css files in editor-assets', () => {
			const editorAssetsPath = join(BUILD_DIR, 'editor-assets');
			if (existsSync(editorAssetsPath)) {
				const editorAssets = readdirSync(editorAssetsPath);
				const styleIndexFiles = editorAssets.filter((file) =>
					file.includes('style-index')
				);

				expect(
					styleIndexFiles.length,
					'style-index.css files should not be in editor-assets'
				).toBe(0);
			}
		});

		it('should verify React Query is in frontend-assets with dynamic naming', () => {
			const frontendAssetsPath = join(BUILD_DIR, 'frontend-assets');
			if (existsSync(frontendAssetsPath)) {
				const frontendAssets = readdirSync(frontendAssetsPath);

				// Should have tanstack-react-query.js (dynamic naming)
				const reactQueryFile = frontendAssets.find(
					(file) =>
						file.includes('tanstack-react-query') &&
						file.endsWith('.js')
				);

				expect(
					reactQueryFile,
					'React Query should be in frontend-assets with dynamic naming'
				).toBeDefined();
			}
		});
	});

	describe('File Content Validation', () => {
		it('should have properly bundled index.js files with all dependencies', () => {
			const blockDirs = getBlockDirectories();

			blockDirs.forEach((blockDir) => {
				const blockName = getBlockName(blockDir);

				if (hasFile(blockDir, 'index.js')) {
					const indexJsContent = readFileSync(
						join(blockDir, 'index.js'),
						'utf-8'
					);

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
					const styleIndexCssContent = readFileSync(
						join(blockDir, 'style-index.css'),
						'utf-8'
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
});
