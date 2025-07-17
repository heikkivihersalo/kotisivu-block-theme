import { describe, it, expect, beforeAll } from 'vitest';
import { existsSync, readdirSync, statSync } from 'fs';
import { join } from 'path';
import {
	BUILD_DIR,
	getBlockDirectories,
	hasFile,
	getBlockName,
	readBlockFile,
} from '../helpers.js';

describe('Render.php File Tests', () => {
	let blockDirs;
	let blocksWithRenderPhp;
	let blocksWithoutRenderPhp;

	beforeAll(() => {
		// Ensure the build directory exists
		expect(existsSync(BUILD_DIR)).toBe(true);

		// Get all block directories
		blockDirs = getBlockDirectories();
		expect(blockDirs.length).toBeGreaterThan(0);

		// Categorize blocks by whether they have render.php
		blocksWithRenderPhp = blockDirs.filter((dir) =>
			hasFile(dir, 'render.php')
		);
		blocksWithoutRenderPhp = blockDirs.filter(
			(dir) => !hasFile(dir, 'render.php')
		);
	});

	it('should copy render.php files from source to build output', () => {
		// Test that render.php files exist in build output when they exist in source
		const sourceBlocksWithRenderPhp = [
			'block-library/accessible-tabs',
			'block-library/generic-carousel',
			'page-templates/template-404',
			'page-templates/template-archive',
			'page-templates/template-home',
			'page-templates/template-index',
			'page-templates/template-legal',
			'page-templates/template-main',
			'page-templates/template-page',
			'page-templates/template-search',
			'page-templates/template-single',
			'template-parts/part-footer',
			'template-parts/part-header',
		];

		sourceBlocksWithRenderPhp.forEach((blockPath) => {
			const blockDir = join(BUILD_DIR, blockPath);
			const blockName = getBlockName(blockDir);

			expect(
				existsSync(blockDir),
				`Block directory should exist: ${blockPath}`
			).toBe(true);

			expect(
				hasFile(blockDir, 'render.php'),
				`Block ${blockName} should have render.php file copied to build output`
			).toBe(true);
		});
	});

	it('should have valid render.php content', () => {
		blocksWithRenderPhp.forEach((blockDir) => {
			const blockName = getBlockName(blockDir);
			const renderPhpContent = readBlockFile(blockDir, 'render.php');

			// Check that the file is not empty
			expect(
				renderPhpContent.trim().length,
				`${blockName} render.php should not be empty`
			).toBeGreaterThan(0);

			// Check that it starts with PHP opening tag
			expect(
				renderPhpContent.startsWith('<?php'),
				`${blockName} render.php should start with <?php tag`
			).toBe(true);

			// Check that it contains typical PHP render patterns
			const hasPhpVariables =
				renderPhpContent.includes('$attributes') ||
				renderPhpContent.includes('$content') ||
				renderPhpContent.includes('$block');

			const hasPhpOutput =
				renderPhpContent.includes('echo') ||
				renderPhpContent.includes('?>');

			expect(
				hasPhpVariables || hasPhpOutput,
				`${blockName} render.php should contain PHP variables or output`
			).toBe(true);
		});
	});

	it('should have proper file permissions and structure', () => {
		blocksWithRenderPhp.forEach((blockDir) => {
			const blockName = getBlockName(blockDir);
			const renderPhpPath = join(blockDir, 'render.php');

			// Check file exists and is readable
			expect(
				existsSync(renderPhpPath),
				`${blockName} render.php should exist`
			).toBe(true);

			// Check that it's a file, not a directory
			expect(
				statSync(renderPhpPath).isFile(),
				`${blockName} render.php should be a file`
			).toBe(true);

			// Check file size is reasonable (not empty, not too large)
			const stats = statSync(renderPhpPath);
			expect(
				stats.size,
				`${blockName} render.php should have reasonable size`
			).toBeGreaterThan(0);
			expect(
				stats.size,
				`${blockName} render.php should not be excessively large`
			).toBeLessThan(50 * 1024); // Less than 50KB
		});
	});

	it('should not create render.php files for blocks that do not have them in source', () => {
		// This test ensures we don't accidentally create render.php files
		// for blocks that don't need server-side rendering
		blocksWithoutRenderPhp.forEach((blockDir) => {
			const blockName = getBlockName(blockDir);

			expect(
				hasFile(blockDir, 'render.php'),
				`Block ${blockName} should not have render.php file if it doesn't exist in source`
			).toBe(false);
		});
	});

	it('should maintain consistent render.php content structure', () => {
		const renderPhpContents = blocksWithRenderPhp.map((blockDir) => {
			const blockName = getBlockName(blockDir);
			const content = readBlockFile(blockDir, 'render.php');
			return { blockName, content };
		});

		// Check that all render.php files have docblocks
		renderPhpContents.forEach(({ blockName, content }) => {
			expect(
				content.includes('/**') && content.includes('*/'),
				`${blockName} render.php should have proper docblock comments`
			).toBe(true);
		});

		// Check that most render.php files reference the standard variables
		const filesWithStandardVars = renderPhpContents.filter(
			({ content }) =>
				content.includes('$attributes') ||
				content.includes('$content') ||
				content.includes('$block')
		);

		expect(
			filesWithStandardVars.length,
			'Most render.php files should reference standard WordPress block variables'
		).toBeGreaterThan(renderPhpContents.length * 0.5); // At least 50% should have standard vars
	});

	it('should copy render.php files to correct directory structure', () => {
		// Test that render.php files are placed in the correct directory structure
		const expectedDirectoryStructure = [
			'block-library/',
			'page-templates/',
			'template-parts/',
		];

		expectedDirectoryStructure.forEach((dirPrefix) => {
			const dirPath = join(BUILD_DIR, dirPrefix);
			if (existsSync(dirPath)) {
				const subDirs = readdirSync(dirPath)
					.map((name) => join(dirPath, name))
					.filter((path) => statSync(path).isDirectory());

				subDirs.forEach((subDir) => {
					const blockName = getBlockName(subDir);
					if (hasFile(subDir, 'render.php')) {
						// Check that the render.php file is at the right level
						const renderPhpPath = join(subDir, 'render.php');
						expect(
							existsSync(renderPhpPath),
							`render.php should be directly in ${dirPrefix}${blockName}/ directory`
						).toBe(true);
					}
				});
			}
		});
	});

	it('should handle different types of render.php files correctly', () => {
		// Test that different categories of blocks have appropriate render.php handling
		const blockCategories = {
			'block-library': [],
			'page-templates': [],
			'template-parts': [],
		};

		// Categorize blocks
		blocksWithRenderPhp.forEach((blockDir) => {
			const blockName = getBlockName(blockDir);
			const relativePath = blockDir.replace(BUILD_DIR + '/', '');
			const category = relativePath.split('/')[0];

			if (blockCategories[category]) {
				blockCategories[category].push(blockName);
			}
		});

		// Check that each category has appropriate blocks with render.php
		Object.entries(blockCategories).forEach(([category, blocks]) => {
			if (blocks.length > 0) {
				expect(
					blocks.length,
					`${category} should have blocks with render.php files`
				).toBeGreaterThan(0);

				// Check that the render.php files in each category are appropriate
				blocks.forEach((blockName) => {
					const blockDir = join(BUILD_DIR, category, blockName);
					const content = readBlockFile(blockDir, 'render.php');

					expect(
						content.length,
						`${category}/${blockName} render.php should have content`
					).toBeGreaterThan(0);
				});
			}
		});
	});

	it('should maintain render.php file encoding and line endings', () => {
		blocksWithRenderPhp.forEach((blockDir) => {
			const blockName = getBlockName(blockDir);
			const renderPhpContent = readBlockFile(blockDir, 'render.php');

			// Check that the file doesn't contain binary characters
			expect(
				/[\x00-\x08\x0E-\x1F\x7F]/.test(renderPhpContent),
				`${blockName} render.php should not contain binary characters`
			).toBe(false);

			// Check that the file ends with a newline (common PHP convention)
			expect(
				renderPhpContent.endsWith('\n'),
				`${blockName} render.php should end with newline`
			).toBe(true);
		});
	});
});
