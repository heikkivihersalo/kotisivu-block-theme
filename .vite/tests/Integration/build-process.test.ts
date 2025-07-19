import { describe, test, expect, beforeAll } from 'vitest';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { glob } from 'glob';

/**
 * Integration tests for the Vite block build process
 *
 * These tests ensure that the build process correctly generates all required files
 * for WordPress blocks in the expected directory structure.
 */
describe('Build Process Integration', () => {
	const BUILD_DIR = join(process.cwd(), 'build');

	const EXPECTED_BLOCK_GROUPS = {
		'blocks/custom': 'resources/widgets/block-library/custom',
		'blocks/parts': 'resources/widgets/block-library/parts',
		'page-templates': 'resources/widgets/page-templates',
		'template-parts': 'resources/widgets/template-parts',
	};

	const REQUIRED_BLOCK_FILES = [
		'block.json', // WordPress block configuration
		'index.js', // Editor JavaScript bundle
		'index.css', // Editor styles
		'style-index.css', // Frontend styles
		'index.asset.php', // WordPress asset dependencies
	];

	beforeAll(() => {
		if (!existsSync(BUILD_DIR)) {
			throw new Error(
				'Build directory does not exist. Run `npm run build` first.'
			);
		}
	});

	/**
	 * Test that the build directory structure matches our path mappings
	 */
	test('build directory structure matches path mappings', () => {
		expect(existsSync(BUILD_DIR)).toBe(true);

		for (const groupPath of Object.keys(EXPECTED_BLOCK_GROUPS)) {
			const fullPath = join(BUILD_DIR, groupPath);
			expect(existsSync(fullPath)).toBe(true);
			expect(statSync(fullPath).isDirectory()).toBe(true);
		}
	});

	/**
	 * Test that all blocks have required files
	 */
	test('blocks have required files', () => {
		const blockDirs = getAllBlockDirectories();

		expect(blockDirs.length).toBeGreaterThan(0);

		for (const blockDir of blockDirs) {
			assertBlockHasRequiredFiles(blockDir);
		}
	});

	/**
	 * Test that block.json files are valid JSON and contain required fields
	 */
	test('block.json files are valid and complete', () => {
		const blockDirs = getAllBlockDirectories();

		for (const blockDir of blockDirs) {
			const blockJsonPath = join(blockDir, 'block.json');
			expect(existsSync(blockJsonPath)).toBe(true);

			const blockJsonContent = readFileSync(blockJsonPath, 'utf-8');
			const blockJson = JSON.parse(blockJsonContent);

			expect(typeof blockJson).toBe('object');
			expect(blockJson).not.toBeNull();

			// Required WordPress block fields
			expect(blockJson).toHaveProperty('name');
			expect(blockJson).toHaveProperty('title');
			expect(blockJson.name).toMatch(/^ksd\//);
		}
	});

	/**
	 * Test that asset PHP files are valid and contain dependencies
	 */
	test('asset files are valid and contain dependencies', () => {
		const blockDirs = getAllBlockDirectories();

		for (const blockDir of blockDirs) {
			const assetFiles = glob.sync(join(blockDir, '*.asset.php'));

			for (const assetFile of assetFiles) {
				assertAssetFileIsValid(assetFile);
			}
		}
	});

	/**
	 * Test that JavaScript files are not empty and contain expected content
	 */
	test('JavaScript files are not empty', () => {
		const blockDirs = getAllBlockDirectories();

		for (const blockDir of blockDirs) {
			const indexJs = join(blockDir, 'index.js');
			if (existsSync(indexJs)) {
				const stats = statSync(indexJs);
				expect(stats.size).toBeGreaterThan(100);
			}

			const viewJs = join(blockDir, 'view.js');
			if (existsSync(viewJs)) {
				const stats = statSync(viewJs);
				expect(stats.size).toBeGreaterThan(10);
			}
		}
	});

	/**
	 * Test that no wp-icons dependency exists in asset files
	 */
	test('no wp-icons dependency in asset files', () => {
		const assetFiles = getAllAssetFiles();

		for (const assetFile of assetFiles) {
			const content = readFileSync(assetFile, 'utf-8');
			expect(content).not.toContain('wp-icons');
		}
	});

	/**
	 * Test that blocks are organized according to path mappings
	 */
	test('blocks are organized correctly', () => {
		// Custom blocks should be in blocks/custom/
		const customBlocks = glob
			.sync(join(BUILD_DIR, 'blocks/custom/*/'))
			.filter((path) => statSync(path).isDirectory());
		expect(customBlocks.length).toBeGreaterThan(0);

		// Parts should be in blocks/parts/
		const partBlocks = glob
			.sync(join(BUILD_DIR, 'blocks/parts/*/'))
			.filter((path) => statSync(path).isDirectory());
		expect(partBlocks.length).toBeGreaterThan(0);

		// Page templates should be in page-templates/
		const pageTemplates = glob
			.sync(join(BUILD_DIR, 'page-templates/*/'))
			.filter((path) => statSync(path).isDirectory());
		expect(pageTemplates.length).toBeGreaterThan(0);

		// Template parts should be in template-parts/
		const templateParts = glob
			.sync(join(BUILD_DIR, 'template-parts/*/'))
			.filter((path) => statSync(path).isDirectory());
		expect(templateParts.length).toBeGreaterThan(0);
	});

	/**
	 * Test that root-level Laravel Vite files are excluded from block structure
	 */
	test('root-level Laravel Vite files are excluded', () => {
		const blockDirs = getAllBlockDirectories();
		const rootFiles = ['index.js', 'index.asset.php', 'manifest.json'];

		for (const blockDir of blockDirs) {
			for (const file of rootFiles) {
				const filePath = join(blockDir, file);
				if (existsSync(filePath)) {
					// If these files exist in block directories, they should be block-specific,
					// not copies of the root Laravel Vite files
					const content = readFileSync(filePath, 'utf-8');
					expect(content).not.toContain(
						'resources/app/scripts/theme.ts'
					);
				}
			}
		}
	});

	/**
	 * Get all block directories
	 */
	function getAllBlockDirectories(): string[] {
		const blockDirs: string[] = [];

		for (const groupPath of Object.keys(EXPECTED_BLOCK_GROUPS)) {
			const groupDir = join(BUILD_DIR, groupPath);
			if (existsSync(groupDir)) {
				const dirs = glob
					.sync(join(groupDir, '*/'))
					.filter((path) => statSync(path).isDirectory());
				blockDirs.push(...dirs);
			}
		}

		return blockDirs;
	}

	/**
	 * Get all asset PHP files
	 */
	function getAllAssetFiles(): string[] {
		const assetFiles: string[] = [];
		const blockDirs = getAllBlockDirectories();

		for (const blockDir of blockDirs) {
			const assets = glob.sync(join(blockDir, '*.asset.php'));
			assetFiles.push(...assets);
		}

		return assetFiles;
	}

	/**
	 * Assert that a block directory has all required files
	 */
	function assertBlockHasRequiredFiles(blockDir: string): void {
		for (const file of REQUIRED_BLOCK_FILES) {
			const filePath = join(blockDir, file);
			expect(existsSync(filePath)).toBe(true);
		}
	}

	/**
	 * Assert that an asset PHP file is valid
	 */
	function assertAssetFileIsValid(assetFile: string): void {
		expect(existsSync(assetFile)).toBe(true);

		// Read the PHP file content
		const content = readFileSync(assetFile, 'utf-8');

		// Asset file should be a PHP file that returns an array
		expect(content).toMatch(/^\s*<\?php/);
		expect(content).toContain('return');

		// Should contain dependencies and version structure
		expect(content).toContain('dependencies');
		expect(content).toContain('version');

		// Version should be a hash pattern (can be 32 hex chars or other formats)
		const versionMatch = content.match(/"version"\s*=>\s*"([a-f0-9]+)"/);
		expect(versionMatch).toBeTruthy();
		expect(versionMatch?.[1]).toMatch(/^[a-f0-9]+$/);
	}
});
