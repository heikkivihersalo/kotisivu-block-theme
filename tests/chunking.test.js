import { describe, it, expect } from 'vitest';
import {
	createManualChunks,
	createChunkFileNames,
} from '../.vite/GutenbergPlugin/config/chunks.js';

describe('Chunking Logic', () => {
	describe('createManualChunks', () => {
		it('should return undefined when no chunk configuration is provided', () => {
			const chunks = createManualChunks();
			expect(chunks).toBeUndefined();
		});

		it('should return undefined when chunk arrays are empty', () => {
			const chunks = createManualChunks({ frontend: [], editor: [] });
			expect(chunks).toBeUndefined();
		});

		it('should return a function when frontend paths are configured', () => {
			const chunks = createManualChunks({
				frontend: ['resources/shared/utils/frontend'],
				editor: [],
			});
			expect(typeof chunks).toBe('function');
		});

		it('should return a function when editor paths are configured', () => {
			const chunks = createManualChunks({
				frontend: [],
				editor: ['resources/shared/components/inspector'],
			});
			expect(typeof chunks).toBe('function');
		});

		it('should correctly chunk modules matching frontend paths', () => {
			const chunks = createManualChunks({
				frontend: ['resources/shared/utils/frontend'],
				editor: [],
			});

			const result = chunks(
				'some/path/resources/shared/utils/frontend/helper.js'
			);
			expect(result).toBe('frontend-assets/frontend');
		});

		it('should correctly chunk modules matching editor paths', () => {
			const chunks = createManualChunks({
				frontend: [],
				editor: ['resources/shared/components/inspector'],
			});

			const result = chunks(
				'some/path/resources/shared/components/inspector/control.js'
			);
			expect(result).toBe('editor-assets/inspector');
		});

		it('should return undefined for modules not matching any configured paths', () => {
			const chunks = createManualChunks({
				frontend: ['resources/shared/utils/frontend'],
				editor: ['resources/shared/components/inspector'],
			});

			const result = chunks('some/other/path/module.js');
			expect(result).toBeUndefined();
		});
	});

	describe('createChunkFileNames', () => {
		it('should return default naming when no chunking is configured', () => {
			const naming = createChunkFileNames({ frontend: [], editor: [] });
			expect(naming).toBe('[name]-[hash].js');
		});

		it('should return a function when chunking is configured', () => {
			const naming = createChunkFileNames({
				frontend: ['resources/shared/utils/frontend'],
				editor: [],
			});
			expect(typeof naming).toBe('function');
		});

		it('should generate correct chunk names', () => {
			const naming = createChunkFileNames({
				frontend: ['resources/shared/utils/frontend'],
				editor: [],
			});

			const result = naming({ name: 'frontend-assets/utils' });
			expect(result).toBe('frontend-assets/utils-[hash].js');
		});
	});
});
