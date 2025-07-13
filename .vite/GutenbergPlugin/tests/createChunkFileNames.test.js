import { describe, it, expect } from 'vitest';
import { createChunkFileNames } from '../config/chunks.js';

describe('createChunkFileNames', () => {
	it('should return default naming when no chunking is configured', () => {
		const naming = createChunkFileNames({ frontend: [], editor: [] });
		expect(naming).toBe('[name]-[hash].js');
	});

	it('should return default naming when undefined configuration is provided', () => {
		const naming = createChunkFileNames();
		expect(naming).toBe('[name]-[hash].js');
	});

	it('should return a function when frontend chunking is configured', () => {
		const naming = createChunkFileNames({
			frontend: ['resources/shared/utils/frontend'],
			editor: [],
		});
		expect(typeof naming).toBe('function');
	});

	it('should return a function when editor chunking is configured', () => {
		const naming = createChunkFileNames({
			frontend: [],
			editor: ['resources/shared/components/inspector'],
		});
		expect(typeof naming).toBe('function');
	});

	it('should generate correct chunk names for frontend assets', () => {
		const naming = createChunkFileNames({
			frontend: ['resources/shared/utils/frontend'],
			editor: [],
		});

		const result = naming({ name: 'frontend-assets/utils' });
		expect(result).toBe('frontend-assets/utils-[hash].js');
	});

	it('should generate correct chunk names for editor assets', () => {
		const naming = createChunkFileNames({
			frontend: [],
			editor: ['resources/shared/components/inspector'],
		});

		const result = naming({ name: 'editor-assets/inspector' });
		expect(result).toBe('editor-assets/inspector-[hash].js');
	});

	it('should generate correct chunk names for complex asset paths', () => {
		const naming = createChunkFileNames({
			frontend: ['resources/shared/utils/frontend'],
			editor: ['resources/shared/components/inspector'],
		});

		const frontendResult = naming({ name: 'frontend-assets/utils-helper' });
		const editorResult = naming({ name: 'editor-assets/inspector-controls' });

		expect(frontendResult).toBe('frontend-assets/utils-helper-[hash].js');
		expect(editorResult).toBe('editor-assets/inspector-controls-[hash].js');
	});

	it('should handle chunk names with special characters', () => {
		const naming = createChunkFileNames({
			frontend: ['resources/shared/utils/frontend'],
			editor: [],
		});

		const result = naming({ name: 'frontend-assets/utils-special_component' });
		expect(result).toBe('frontend-assets/utils-special_component-[hash].js');
	});
});
