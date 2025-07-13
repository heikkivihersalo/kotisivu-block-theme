import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { BUILD_DIR } from '../helpers.js';

describe('Asset Organization Tests', () => {
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

	it('should not have frontend-assets folder when chunking is disabled', () => {
		// With current configuration (no chunk paths specified),
		// frontend-assets folder should not exist as dependencies stay bundled
		const frontendAssetsPath = join(BUILD_DIR, 'frontend-assets');
		expect(
			existsSync(frontendAssetsPath),
			'frontend-assets folder should not exist when chunking is disabled'
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

	it('should verify dependencies stay bundled when chunking is disabled', () => {
		// With no chunking configuration, React Query and other dependencies
		// should be bundled directly with block files, not in separate chunks
		const frontendAssetsPath = join(BUILD_DIR, 'frontend-assets');

		// Frontend assets folder should not exist
		expect(
			existsSync(frontendAssetsPath),
			'frontend-assets should not exist when chunking is disabled'
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
