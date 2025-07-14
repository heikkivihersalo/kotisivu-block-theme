import { describe, it, expect } from 'vitest';
import { createChunkFileNames } from '../../../../config/chunks.js';
import type { ChunkConfig } from '../../../../types.js';

type MockChunkInfo = {
	name: string;
	[key: string]: any;
};

describe('createChunkFileNames', () => {
	it('should return a function when no chunking is configured', () => {
		const naming = createChunkFileNames({
			frontend: [],
			editor: [],
			common: [],
		});
		expect(naming).toBeInstanceOf(Function);
	});

	it('should return a function when undefined configuration is provided', () => {
		const naming = createChunkFileNames();
		expect(naming).toBeInstanceOf(Function);
	});

	it('should return a function when frontend chunking is configured', () => {
		const naming = createChunkFileNames({
			frontend: ['resources/shared/utils/frontend'],
			editor: [],
			common: [],
		});
		expect(typeof naming).toBe('function');
	});

	it('should return a function when editor chunking is configured', () => {
		const naming = createChunkFileNames({
			frontend: [],
			editor: ['resources/shared/components/inspector'],
			common: [],
		});
		expect(typeof naming).toBe('function');
	});

	it('should return a function when common chunking is configured', () => {
		const naming = createChunkFileNames({
			frontend: [],
			editor: [],
			common: ['resources/shared/constants'],
		});
		expect(typeof naming).toBe('function');
	});

	it('should return a function when all chunking types are configured', () => {
		const naming = createChunkFileNames({
			frontend: ['resources/shared/utils/frontend'],
			editor: ['resources/shared/components/inspector'],
			common: ['resources/shared/constants'],
		});
		expect(typeof naming).toBe('function');
	});

	it('should generate the correct file name pattern for any chunk', () => {
		const naming = createChunkFileNames({
			frontend: ['resources/shared/utils'],
			editor: ['resources/shared/components'],
			common: ['resources/shared/constants'],
		});

		const mockChunkInfo: MockChunkInfo = {
			name: 'assets/frontend/utils',
		};

		const result = naming(mockChunkInfo);
		expect(result).toBe('assets/frontend/utils-[hash].js');
	});

	it('should handle chunk info with different asset folder names', () => {
		const naming = createChunkFileNames({
			frontend: [],
			editor: [],
			common: [],
		});

		const mockChunkInfo: MockChunkInfo = {
			name: 'assets/editor/components',
		};

		const result = naming(mockChunkInfo);
		expect(result).toBe('assets/editor/components-[hash].js');
	});

	it('should handle chunk info with common asset folder', () => {
		const naming = createChunkFileNames({
			frontend: [],
			editor: [],
			common: ['resources/shared/constants'],
		});

		const mockChunkInfo: MockChunkInfo = {
			name: 'assets/common/constants',
		};

		const result = naming(mockChunkInfo);
		expect(result).toBe('assets/common/constants-[hash].js');
	});

	it('should handle empty chunk configurations correctly', () => {
		const naming = createChunkFileNames({
			frontend: [],
			editor: [],
			common: [],
		});

		const mockChunkInfo: MockChunkInfo = {
			name: 'assets/common/vendor',
		};

		const result = naming(mockChunkInfo);
		expect(result).toBe('assets/common/vendor-[hash].js');
	});
});
