import { describe, it, expect } from 'vitest';
import { createManualChunks } from '../config/chunks.js';

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

	it('should handle multiple frontend paths correctly', () => {
		const chunks = createManualChunks({
			frontend: [
				'resources/shared/utils/frontend',
				'resources/widgets/common/utils',
			],
			editor: [],
		});

		const result1 = chunks(
			'some/path/resources/shared/utils/frontend/helper.js'
		);
		const result2 = chunks(
			'some/path/resources/widgets/common/utils/utility.js'
		);

		expect(result1).toBe('frontend-assets/frontend');
		expect(result2).toBe('frontend-assets/utils');
	});

	it('should handle multiple editor paths correctly', () => {
		const chunks = createManualChunks({
			frontend: [],
			editor: [
				'resources/shared/components/inspector',
				'resources/shared/hooks/editor',
			],
		});

		const result1 = chunks(
			'some/path/resources/shared/components/inspector/control.js'
		);
		const result2 = chunks(
			'some/path/resources/shared/hooks/editor/useBlockProps.js'
		);

		expect(result1).toBe('editor-assets/inspector');
		expect(result2).toBe('editor-assets/editor');
	});
});
