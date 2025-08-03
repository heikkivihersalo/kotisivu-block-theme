/**
 * Internal dependencies
 */
import { createWordPressViteConfig } from './createWordPressViteConfig.ts';
import type { WordPressViteConfig } from '../../types.ts';

/**
 * Create environment-specific build configurations
 * Leverages Vite 6's multi-environment support
 */
export function createEnvironmentConfigs(baseConfig: WordPressViteConfig = {}) {
	const baseViteConfig = createWordPressViteConfig(baseConfig);

	return {
		// Client environment (default)
		client: {
			...baseViteConfig,
			build: {
				...baseViteConfig.build,
				outDir: `${baseConfig.outDir || 'build'}/client`,
			},
		},

		// Admin environment (if needed)
		admin: {
			...baseViteConfig,
			build: {
				...baseViteConfig.build,
				outDir: `${baseConfig.outDir || 'build'}/admin`,
				rollupOptions: {
					...baseViteConfig.build?.rollupOptions,
					input: {
						admin: 'src/admin/main.js',
					},
				},
			},
		},

		// Block editor environment
		editor: {
			...baseViteConfig,
			build: {
				...baseViteConfig.build,
				outDir: `${baseConfig.outDir || 'build'}/editor`,
				rollupOptions: {
					...baseViteConfig.build?.rollupOptions,
					input: {
						editor: 'src/editor/main.js',
					},
				},
			},
		},
	};
}
