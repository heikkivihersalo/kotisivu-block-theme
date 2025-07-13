import { describe, it, expect } from 'vitest';
import { createManualChunks } from '../../../../config/chunks.js';

describe('createManualChunks', () => {
	it('should always return a function regardless of configuration', () => {
		const chunks = createManualChunks();
		expect(chunks).toBeInstanceOf(Function);
	});

	it('should return a function when chunk arrays are empty', () => {
		const chunks = createManualChunks({
			frontend: [],
			editor: [],
			common: [],
		});
		expect(chunks).toBeInstanceOf(Function);
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

	it('should return a function when common paths are configured', () => {
		const chunks = createManualChunks({
			frontend: [],
			editor: [],
			common: ['resources/shared/constants'],
		});
		expect(chunks).toBeInstanceOf(Function);
	});

	it('should correctly chunk modules matching frontend paths', () => {
		const chunks = createManualChunks({
			frontend: ['resources/shared/utils/frontend'],
			editor: [],
		});

		const result = chunks(
			'some/path/resources/shared/utils/frontend/helper.js'
		);
		expect(result).toBe('assets/frontend/frontend');
	});

	it('should correctly chunk modules matching editor paths', () => {
		const chunks = createManualChunks({
			frontend: [],
			editor: ['resources/shared/components/inspector'],
		});

		const result = chunks(
			'some/path/resources/shared/components/inspector/control.js'
		);
		expect(result).toBe('assets/editor/inspector');
	});

	it('should correctly chunk modules matching common paths', () => {
		const chunks = createManualChunks({
			frontend: [],
			editor: [],
			common: ['resources/shared/constants'],
		});

		const result = chunks('some/path/resources/shared/constants/config.js');
		expect(result).toBe('assets/common/constants');
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

		expect(result1).toBe('assets/frontend/frontend');
		expect(result2).toBe('assets/frontend/utils');
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

		expect(result1).toBe('assets/editor/inspector');
		expect(result2).toBe('assets/editor/editor');
	});

	it('should handle multiple common paths correctly', () => {
		const chunks = createManualChunks({
			frontend: [],
			editor: [],
			common: ['resources/shared/constants', 'resources/shared/types'],
		});

		const result1 = chunks(
			'some/path/resources/shared/constants/config.js'
		);
		const result2 = chunks(
			'some/path/resources/shared/types/interfaces.ts'
		);

		expect(result1).toBe('assets/common/constants');
		expect(result2).toBe('assets/common/types');
	});

	it('should handle mixed chunk configurations correctly', () => {
		const chunks = createManualChunks({
			frontend: ['resources/shared/utils'],
			editor: ['resources/shared/components'],
			common: ['resources/shared/constants'],
		});

		const frontendResult = chunks(
			'some/path/resources/shared/utils/helper.js'
		);
		const editorResult = chunks(
			'some/path/resources/shared/components/button.tsx'
		);
		const commonResult = chunks(
			'some/path/resources/shared/constants/config.js'
		);

		expect(frontendResult).toBe('assets/frontend/utils');
		expect(editorResult).toBe('assets/editor/components');
		expect(commonResult).toBe('assets/common/constants');
	});
});
