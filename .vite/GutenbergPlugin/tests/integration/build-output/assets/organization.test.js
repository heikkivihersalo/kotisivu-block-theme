import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { BUILD_DIR } from '../helpers.js';

describe('Asset Organization Tests', () => {
	it('should have assets/common folder with shared dependencies', () => {
		const commonAssetsPath = join(BUILD_DIR, 'assets', 'common');
		expect(
			existsSync(commonAssetsPath),
			'assets/common folder should exist'
		).toBe(true);

		const commonAssets = readdirSync(commonAssetsPath);
		expect(
			commonAssets.length,
			'assets/common folder should not be empty'
		).toBeGreaterThan(0);
	});

	it('should not have assets/frontend folder when chunking is disabled', () => {
		// With current configuration (no chunk paths specified),
		// assets/frontend folder should not exist as dependencies stay bundled
		const frontendAssetsPath = join(BUILD_DIR, 'assets', 'frontend');
		expect(
			existsSync(frontendAssetsPath),
			'assets/frontend folder should not exist when chunking is disabled'
		).toBe(false);
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

	it('should not have style-index.css files in assets folders', () => {
		const assetsPath = join(BUILD_DIR, 'assets');
		if (existsSync(assetsPath)) {
			const assetFolders = readdirSync(assetsPath, {
				withFileTypes: true,
			})
				.filter((dirent) => dirent.isDirectory())
				.map((dirent) => dirent.name);

			for (const folder of assetFolders) {
				const folderPath = join(assetsPath, folder);
				const files = readdirSync(folderPath);
				const styleIndexFiles = files.filter((file) =>
					file.includes('style-index')
				);

				expect(
					styleIndexFiles.length,
					`style-index.css files should not be in assets/${folder}`
				).toBe(0);
			}
		}
	});

	it('should verify dependencies stay bundled when chunking is disabled', () => {
		// With no chunking configuration, React Query and other dependencies
		// should be bundled directly with block files, not in separate chunks
		const frontendAssetsPath = join(BUILD_DIR, 'assets', 'frontend');

		// Frontend assets folder should not exist
		expect(
			existsSync(frontendAssetsPath),
			'assets/frontend should not exist when chunking is disabled'
		).toBe(false);

		// Verify that block files contain their dependencies
		const blockDir = join(BUILD_DIR, 'block-library', 'hero');
		if (existsSync(blockDir)) {
			const indexJsPath = join(blockDir, 'index.js');
			if (existsSync(indexJsPath)) {
				const indexContent = readFileSync(indexJsPath, 'utf-8');
				expect(
					indexContent.length,
					'Block index.js should be substantial (contains bundled dependencies)'
				).toBeGreaterThan(1000); // Should be larger with bundled dependencies
			}
		}
	});
});
