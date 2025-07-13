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

describe('Block Structure Tests', () => {
	beforeAll(() => {
		// Ensure the build directory exists
		expect(existsSync(BUILD_DIR)).toBe(true);
	});

	it('should have clean root blocks folder with only allowed files and folders', () => {
		const items = readdirSync(BUILD_DIR, { withFileTypes: true });
		const allowedItems = [
			'manifest.json',
			'manifest.php',
			'editor.deps.json',
			'block-library',
			'page-templates',
			'template-parts',
			'assets',
		];

		items.forEach((item) => {
			expect(
				allowedItems.includes(item.name),
				`Unexpected item "${item.name}" found in blocks root folder. Only manifest.json, manifest.php, editor.deps.json, and block/asset folders should be present.`
			).toBe(true);
		});

		// Ensure manifest.json exists
		expect(
			items.some(
				(item) => item.name === 'manifest.json' && item.isFile()
			),
			'manifest.json file should exist in blocks root'
		).toBe(true);

		// Ensure no loose JS/CSS files exist in root
		const looseFiles = items.filter(
			(item) =>
				item.isFile() &&
				!['manifest.json', 'manifest.php', 'editor.deps.json'].includes(
					item.name
				)
		);

		expect(
			looseFiles.length,
			`Found loose files in blocks root: ${looseFiles
				.map((f) => f.name)
				.join(', ')}. All chunk files should be in assets/ folders.`
		).toBe(0);
	});

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

			if (hasFile(blockDir, 'block.json')) {
				const blockJsonContent = readBlockFile(blockDir, 'block.json');

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

			if (hasFile(blockDir, 'index.js')) {
				const indexJsContent = readBlockFile(blockDir, 'index.js');

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
				const indexCssContent = readBlockFile(blockDir, 'index.css');
				expect(
					indexCssContent.trim().length,
					`${blockName} index.css exists but is empty`
				).toBeGreaterThan(0);
			}

			if (hasFile(blockDir, 'style-index.css')) {
				const styleIndexCssContent = readBlockFile(
					blockDir,
					'style-index.css'
				);
				expect(
					styleIndexCssContent.trim().length,
					`${blockName} style-index.css exists but is empty`
				).toBeGreaterThan(0);
			}

			if (hasFile(blockDir, 'view.js')) {
				const viewJsContent = readBlockFile(blockDir, 'view.js');
				expect(
					viewJsContent.trim().length,
					`${blockName} view.js exists but is empty`
				).toBeGreaterThan(0);
			}

			if (hasFile(blockDir, 'render.php')) {
				const renderPhpContent = readBlockFile(blockDir, 'render.php');
				expect(
					renderPhpContent.trim().length,
					`${blockName} render.php exists but is empty`
				).toBeGreaterThan(0);
			}
		});
	});

	it('should only contain allowed files in block directories', () => {
		const blockDirs = getBlockDirectories();

		// Define allowed files in block directories
		const allowedFiles = [
			'block.json', // Block configuration (required)
			'index.js', // Editor script (required for most blocks)
			'index.css', // Editor styles (optional)
			'style-index.css', // Frontend styles (optional)
			'view.js', // Frontend script (optional)
			'render.php', // Server-side render callback (optional)
		];

		blockDirs.forEach((blockDir) => {
			const blockName = getBlockName(blockDir);
			const files = readdirSync(blockDir);

			files.forEach((file) => {
				// Only check files, not directories
				const filePath = join(blockDir, file);
				if (statSync(filePath).isFile()) {
					expect(
						allowedFiles.includes(file),
						`${blockName} contains unwanted file: ${file}. Only these files are allowed: ${allowedFiles.join(
							', '
						)}`
					).toBe(true);
				}
			});

			// Specifically check that editor-styles.css doesn't exist (common unwanted file)
			expect(
				hasFile(blockDir, 'editor-styles.css'),
				`${blockName} should not contain editor-styles.css (editor styles should be in index.css)`
			).toBe(false);
		});
	});
});
