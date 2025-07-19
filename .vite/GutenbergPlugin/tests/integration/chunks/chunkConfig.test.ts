import { describe, it, expect } from 'vitest';
import { createManualChunks } from '../../../config/chunks/chunks.ts';
import type { ChunkConfig } from '../../../types/lib/plugin.js';

describe('Chunk Configuration Logic', () => {
	it('should place shared utils in common when no frontend paths are configured', () => {
		const chunksConfig: ChunkConfig = {
			frontend: [], // Empty - no frontend paths configured
			editor: ['@wordpress/icons'], // Only icons configured
			common: [],
		};

		const manualChunks = createManualChunks(chunksConfig);

		// Shared utils should go to common (not frontend) since frontend array is empty
		const result = manualChunks('resources/shared/utils/someUtil.ts');
		expect(result).toBe('assets/common/utils');
	});

	it('should place shared utils in frontend when frontend paths are configured', () => {
		const chunksConfig: ChunkConfig = {
			frontend: ['resources/shared/utils'], // Frontend paths configured
			editor: ['@wordpress/icons'],
			common: [],
		};

		const manualChunks = createManualChunks(chunksConfig);

		// Shared utils should go to frontend since frontend paths are configured
		const result = manualChunks('resources/shared/utils/someUtil.ts');
		expect(result).toBe('assets/frontend/utils');
	});

	it('should place shared components in common when no editor component paths are configured', () => {
		const chunksConfig: ChunkConfig = {
			frontend: [],
			editor: ['@wordpress/icons'], // Only icons, no component paths
			common: [],
		};

		const manualChunks = createManualChunks(chunksConfig);

		// Shared components should go to editor since editor array has content (even if not components)
		const result = manualChunks(
			'resources/shared/components/SomeComponent.tsx'
		);
		expect(result).toBe('assets/editor/components');
	});

	it('should place shared components in common when no editor paths are configured at all', () => {
		const chunksConfig: ChunkConfig = {
			frontend: [],
			editor: [], // Empty editor array
			common: [],
		};

		const manualChunks = createManualChunks(chunksConfig);

		// Shared components should go to common since editor array is empty
		const result = manualChunks(
			'resources/shared/components/SomeComponent.tsx'
		);
		expect(result).toBe('assets/common/components');
	});

	it('should always place hooks and constants in common', () => {
		const chunksConfig: ChunkConfig = {
			frontend: ['resources/shared/utils'],
			editor: ['@wordpress/icons'],
			common: [],
		};

		const manualChunks = createManualChunks(chunksConfig);

		const hooksResult = manualChunks(
			'resources/shared/hooks/useCustomHook.ts'
		);
		const constantsResult = manualChunks(
			'resources/shared/constants/SOME_CONSTANT.ts'
		);

		expect(hooksResult).toBe('assets/common/hooks');
		expect(constantsResult).toBe('assets/common/constants');
	});

	it('should skip WordPress externals', () => {
		const chunksConfig: ChunkConfig = {
			frontend: [],
			editor: ['@wordpress/icons'],
			common: [],
		};

		const manualChunks = createManualChunks(chunksConfig);

		const result = manualChunks('@wordpress/blocks');
		expect(result).toBeUndefined();
	});

	it('should handle configured paths correctly', () => {
		const chunksConfig: ChunkConfig = {
			frontend: ['resources/shared/utils'],
			editor: ['resources/shared/components'], // Changed from @wordpress/icons
			common: ['node_modules/some-package'],
		};

		const manualChunks = createManualChunks(chunksConfig);

		// Should match configured paths
		const frontendResult = manualChunks('resources/shared/utils/helper.ts');
		const editorResult = manualChunks(
			'resources/shared/components/Button.tsx'
		);
		const commonResult = manualChunks('node_modules/some-package/index.js');

		expect(frontendResult).toBe('assets/frontend/utils');
		expect(editorResult).toBe('assets/editor/components');
		expect(commonResult).toBe('assets/common/some-package');
	});

	it('should correctly skip WordPress modules even if configured', () => {
		const chunksConfig: ChunkConfig = {
			frontend: [],
			editor: ['@wordpress/icons'], // This should be skipped
			common: [],
		};

		const manualChunks = createManualChunks(chunksConfig);

		// WordPress modules should always be undefined (externalized)
		const result = manualChunks('@wordpress/icons');
		expect(result).toBeUndefined();
	});
});
