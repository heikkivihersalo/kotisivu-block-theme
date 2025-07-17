import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock the fs module
vi.mock('fs', () => ({
	existsSync: vi.fn(),
	readFileSync: vi.fn(),
}));

// Mock the constants
vi.mock('../../../../config/constants.js', () => ({
	WORDPRESS_FILE_OUTPUT: {
		RENDER: 'render.php',
	},
}));

// Import after mocking
import { copyRenderFile } from '../../../../processors/bundle/utils.js';
import { existsSync, readFileSync } from 'fs';

describe('copyRenderFile', () => {
	let mockContext;

	beforeEach(() => {
		// Mock the context
		mockContext = {
			emitFile: vi.fn(),
		};

		// Reset all mocks
		vi.clearAllMocks();
	});

	it('should copy render.php file when it exists', () => {
		// Setup mocks
		vi.mocked(existsSync).mockReturnValue(true);
		vi.mocked(readFileSync).mockReturnValue('<?php echo "test"; ?>');

		// Call function
		copyRenderFile({
			context: mockContext,
			dir: '/source/block-name',
			key: 'block-library/block-name',
		});

		// Verify fs calls
		expect(existsSync).toHaveBeenCalledWith(
			'/source/block-name/render.php'
		);
		expect(readFileSync).toHaveBeenCalledWith(
			'/source/block-name/render.php',
			'utf8'
		);

		// Verify emitFile was called
		expect(mockContext.emitFile).toHaveBeenCalledWith({
			type: 'asset',
			fileName: 'block-library/block-name/render.php',
			source: '<?php echo "test"; ?>',
		});
	});

	it('should not copy render.php file when it does not exist', () => {
		// Setup mocks
		vi.mocked(existsSync).mockReturnValue(false);

		// Call function
		copyRenderFile({
			context: mockContext,
			dir: '/source/block-name',
			key: 'block-library/block-name',
		});

		// Verify fs calls
		expect(existsSync).toHaveBeenCalledWith(
			'/source/block-name/render.php'
		);
		expect(readFileSync).not.toHaveBeenCalled();

		// Verify emitFile was not called
		expect(mockContext.emitFile).not.toHaveBeenCalled();
	});

	it('should handle different directory structures', () => {
		// Setup mocks
		vi.mocked(existsSync).mockReturnValue(true);
		vi.mocked(readFileSync).mockReturnValue('<?php echo $content; ?>');

		// Test different directory structures
		const testCases = [
			{
				dir: '/source/block-library/accessible-tabs',
				key: 'block-library/accessible-tabs',
				expectedPath:
					'/source/block-library/accessible-tabs/render.php',
				expectedFileName: 'block-library/accessible-tabs/render.php',
			},
			{
				dir: '/source/page-templates/template-home',
				key: 'page-templates/template-home',
				expectedPath: '/source/page-templates/template-home/render.php',
				expectedFileName: 'page-templates/template-home/render.php',
			},
		];

		testCases.forEach(({ dir, key, expectedPath, expectedFileName }) => {
			// Reset mocks
			mockContext.emitFile.mockClear();
			vi.mocked(existsSync).mockClear();
			vi.mocked(readFileSync).mockClear();

			// Call function
			copyRenderFile({
				context: mockContext,
				dir,
				key,
			});

			// Verify calls
			expect(existsSync).toHaveBeenCalledWith(expectedPath);
			expect(readFileSync).toHaveBeenCalledWith(expectedPath, 'utf8');
			expect(mockContext.emitFile).toHaveBeenCalledWith({
				type: 'asset',
				fileName: expectedFileName,
				source: '<?php echo $content; ?>',
			});
		});
	});

	it('should handle empty render.php files', () => {
		// Setup mocks
		vi.mocked(existsSync).mockReturnValue(true);
		vi.mocked(readFileSync).mockReturnValue('');

		// Call function
		copyRenderFile({
			context: mockContext,
			dir: '/source/block-name',
			key: 'block-library/block-name',
		});

		// Verify empty content is still copied
		expect(mockContext.emitFile).toHaveBeenCalledWith({
			type: 'asset',
			fileName: 'block-library/block-name/render.php',
			source: '',
		});
	});

	it('should use UTF-8 encoding when reading files', () => {
		// Setup mocks
		vi.mocked(existsSync).mockReturnValue(true);
		vi.mocked(readFileSync).mockReturnValue(
			'<?php echo "UTF-8 content: éñ"; ?>'
		);

		// Call function
		copyRenderFile({
			context: mockContext,
			dir: '/source/block-name',
			key: 'block-library/block-name',
		});

		// Verify UTF-8 encoding is used
		expect(readFileSync).toHaveBeenCalledWith(
			'/source/block-name/render.php',
			'utf8'
		);
		expect(mockContext.emitFile).toHaveBeenCalledWith({
			type: 'asset',
			fileName: 'block-library/block-name/render.php',
			source: '<?php echo "UTF-8 content: éñ"; ?>',
		});
	});
});
