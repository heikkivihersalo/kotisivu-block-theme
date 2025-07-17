import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock the modules before importing
vi.mock('glob', () => ({
	glob: { sync: vi.fn() },
}));

vi.mock('fs', () => ({
	existsSync: vi.fn(),
	readFileSync: vi.fn(),
}));

vi.mock('../../../config/constants.js', () => ({
	BLOCK_PATTERNS: {
		BLOCK_JSON: '**/block.json',
	},
	WORDPRESS_FILE_OUTPUT: {
		BLOCK_JSON: 'block.json',
		RENDER: 'render.php',
	},
}));

// Import after mocking
import { createBundleGenerator } from '../../../processors/bundle/bundle.js';
import { glob } from 'glob';
import { existsSync, readFileSync } from 'fs';

describe('Bundle Generator - Render.php Integration', () => {
	let mockContext;

	beforeEach(() => {
		// Mock the context
		mockContext = {
			emitFile: vi.fn(),
		};

		// Reset all mocks
		vi.clearAllMocks();
	});

	it('should call copyRenderFile for each block', () => {
		// Setup mocks
		vi.mocked(glob.sync).mockReturnValue([
			'resources/block-library/block-a/block.json',
			'resources/block-library/block-b/block.json',
		]);
		vi.mocked(existsSync).mockReturnValue(true);
		vi.mocked(readFileSync).mockReturnValue('{"name": "test/block"}');

		// Create bundle generator
		const bundleGenerator = createBundleGenerator({
			'block-library': 'resources/block-library',
		});

		// Mock bundle
		const mockBundle = {};

		// Call bundle generator
		bundleGenerator.call(mockContext, {}, mockBundle);

		// Verify render.php files were attempted to be copied
		expect(existsSync).toHaveBeenCalledWith(
			'resources/block-library/block-a/render.php'
		);
		expect(existsSync).toHaveBeenCalledWith(
			'resources/block-library/block-b/render.php'
		);
	});

	it('should emit render.php files when they exist', () => {
		// Setup mocks
		vi.mocked(glob.sync).mockReturnValue([
			'resources/block-library/accessible-tabs/block.json',
		]);

		// Mock file existence - block.json exists, render.php exists
		vi.mocked(existsSync).mockImplementation((path) => {
			if (path.includes('block.json')) return true;
			if (path.includes('render.php')) return true;
			return false;
		});

		// Mock file content
		vi.mocked(readFileSync).mockImplementation((path) => {
			if (path.includes('block.json')) {
				return '{"name": "test/accessible-tabs"}';
			}
			if (path.includes('render.php')) {
				return '<?php echo $content; ?>';
			}
			return '';
		});

		// Create bundle generator
		const bundleGenerator = createBundleGenerator({
			'block-library': 'resources/block-library',
		});

		// Mock bundle
		const mockBundle = {};

		// Call bundle generator
		bundleGenerator.call(mockContext, {}, mockBundle);

		// Verify render.php was emitted
		expect(mockContext.emitFile).toHaveBeenCalledWith({
			type: 'asset',
			fileName: 'block-library/accessible-tabs/render.php',
			source: '<?php echo $content; ?>',
		});
	});

	it('should not emit render.php files when they do not exist', () => {
		// Setup mocks
		vi.mocked(glob.sync).mockReturnValue([
			'resources/block-library/block-without-render/block.json',
		]);

		// Mock file existence - block.json exists, render.php doesn't exist
		vi.mocked(existsSync).mockImplementation((path) => {
			if (path.includes('block.json')) return true;
			if (path.includes('render.php')) return false;
			return false;
		});

		// Mock file content
		vi.mocked(readFileSync).mockImplementation((path) => {
			if (path.includes('block.json')) {
				return '{"name": "test/block-without-render"}';
			}
			return '';
		});

		// Create bundle generator
		const bundleGenerator = createBundleGenerator({
			'block-library': 'resources/block-library',
		});

		// Mock bundle
		const mockBundle = {};

		// Call bundle generator
		bundleGenerator.call(mockContext, {}, mockBundle);

		// Verify render.php was not emitted
		const renderPhpEmitCalls = mockContext.emitFile.mock.calls.filter(
			(call) => call[0].fileName.includes('render.php')
		);
		expect(renderPhpEmitCalls).toHaveLength(0);

		// But block.json should still be emitted
		const blockJsonEmitCalls = mockContext.emitFile.mock.calls.filter(
			(call) => call[0].fileName.includes('block.json')
		);
		expect(blockJsonEmitCalls).toHaveLength(1);
	});

	it('should handle multiple input directories with render.php files', () => {
		// Setup mocks
		vi.mocked(glob.sync).mockImplementation((pattern) => {
			if (pattern.includes('block-library')) {
				return ['resources/block-library/accessible-tabs/block.json'];
			}
			if (pattern.includes('page-templates')) {
				return ['resources/page-templates/template-home/block.json'];
			}
			if (pattern.includes('template-parts')) {
				return ['resources/template-parts/part-header/block.json'];
			}
			return [];
		});

		// Mock file existence - all have render.php
		vi.mocked(existsSync).mockImplementation((path) => {
			if (path.includes('block.json') || path.includes('render.php'))
				return true;
			return false;
		});

		// Mock file content
		vi.mocked(readFileSync).mockImplementation((path) => {
			if (path.includes('block.json')) {
				return '{"name": "test/block"}';
			}
			if (path.includes('render.php')) {
				return '<?php echo $content; ?>';
			}
			return '';
		});

		// Create bundle generator with multiple directories
		const bundleGenerator = createBundleGenerator({
			'block-library': 'resources/block-library',
			'page-templates': 'resources/page-templates',
			'template-parts': 'resources/template-parts',
		});

		// Mock bundle
		const mockBundle = {};

		// Call bundle generator
		bundleGenerator.call(mockContext, {}, mockBundle);

		// Verify render.php files were emitted for all directories
		const renderPhpEmitCalls = mockContext.emitFile.mock.calls.filter(
			(call) => call[0].fileName.includes('render.php')
		);

		expect(renderPhpEmitCalls).toHaveLength(3);
		expect(renderPhpEmitCalls[0][0].fileName).toBe(
			'block-library/accessible-tabs/render.php'
		);
		expect(renderPhpEmitCalls[1][0].fileName).toBe(
			'page-templates/template-home/render.php'
		);
		expect(renderPhpEmitCalls[2][0].fileName).toBe(
			'template-parts/part-header/render.php'
		);
	});
});
