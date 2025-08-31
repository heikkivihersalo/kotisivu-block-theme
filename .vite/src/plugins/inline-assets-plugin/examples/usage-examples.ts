/**
 * Example Usage of Refactored Inline Assets Plugin
 *
 * This file demonstrates different configuration options for the
 * refactored inline assets plugin.
 */

import { defineConfig } from 'vite';
import { wp } from './.vite/index.ts';

export default defineConfig(({ mode }) => {
	// Example 1: Basic configuration (backward compatible)
	const basicConfig = {
		plugins: [
			wp({
				devServer: {
					devServerUrl: 'https://block-theme.local:5173',
					css: 'css',
				},
				build: {
					outDir: 'build',
					sourcemap: 'linked',
					minify: 'terser',
					assetsDir: {
						'assets/admin': 'resources/app/scripts/admin.ts',
						'assets/dark-mode':
							'resources/app/scripts/dark-mode.ts',
						'assets/inline': 'resources/app/scripts/inline.ts',
						'assets/sanitize': 'resources/app/scripts/sanitize.ts',
						'assets/theme': 'resources/app/scripts/theme.ts',
					},
					blocksDir: {
						'blocks/custom':
							'resources/widgets/block-library/custom',
						'blocks/parts': 'resources/widgets/block-library/parts',
						'template-parts': 'resources/widgets/template-parts',
						'page-templates': 'resources/widgets/page-templates',
					},
					watch: ['./resources/widgets/**/*.php'],
				},
			}),
		],
	};

	// Example 2: Configuration with external script injection
	const externalScriptConfig = {
		plugins: [
			wp({
				// ... other wp config
				inlineAssets: {
					inlineAssets: [
						'build/assets/sanitize.css',
						'build/assets/inline.css',
					],
					watchPatterns: ['resources/app/styles/inline/**/*.css'],
					blocksConfig: {
						blocksDir: {
							'blocks/custom':
								'resources/widgets/block-library/custom',
							'blocks/parts':
								'resources/widgets/block-library/parts',
						},
						outDir: 'build',
						blockNamespace: 'ksd',
					},
					scriptInjection: {
						method: 'external', // Serve HMR script as separate file
						pollingInterval: 1000, // Poll every second
					},
				},
			}),
		],
	};

	// Example 3: Configuration with ES module injection
	const moduleScriptConfig = {
		plugins: [
			wp({
				// ... other wp config
				inlineAssets: {
					// ... asset config
					scriptInjection: {
						method: 'module', // Serve HMR script as ES module
						pollingInterval: 250, // Fast polling for responsive updates
					},
				},
			}),
		],
	};

	// Example 4: Configuration optimized for performance
	const performanceConfig = {
		plugins: [
			wp({
				// ... other wp config
				inlineAssets: {
					inlineAssets: [
						'build/assets/sanitize.css',
						'build/assets/inline.css',
						'build/assets/tailwind-utilities.css',
					],
					watchPatterns: [
						'resources/app/styles/inline/**/*.css',
						'resources/app/styles/tailwind/**/*.css',
					],
					blocksConfig: {
						blocksDir: {
							'blocks/custom':
								'resources/widgets/block-library/custom',
							'blocks/parts':
								'resources/widgets/block-library/parts',
							'template-parts':
								'resources/widgets/template-parts',
							'page-templates':
								'resources/widgets/page-templates',
						},
						outDir: 'build',
						blockNamespace: 'ksd',
					},
					scriptInjection: {
						method: 'external', // Reduce initial payload
						pollingInterval: 500, // Balanced responsiveness
					},
				},
			}),
		],
	};

	// Example 5: Development vs Production configuration
	const environmentAwareConfig = {
		plugins: [
			wp({
				// ... other wp config
				inlineAssets: {
					// ... asset config
					scriptInjection: {
						method: mode === 'development' ? 'inline' : 'external',
						pollingInterval: mode === 'development' ? 250 : 1000,
					},
				},
			}),
		],
	};

	// Return the basic configuration for this example
	return basicConfig;
});

/**
 * Advanced Usage: Custom Plugin Integration
 *
 * For more advanced use cases, you can use the InlineAssetsPlugin directly:
 */

import { InlineAssetsPlugin } from './.vite/src/plugins/inline-assets-plugin/index.js';

const customConfig = {
	plugins: [
		// ... other plugins
		InlineAssetsPlugin({
			inlineAssets: [
				'build/assets/critical.css',
				'build/assets/above-fold.css',
			],
			watchPatterns: [
				'resources/critical/**/*.css',
				'resources/above-fold/**/*.css',
			],
			blocksConfig: {
				blocksDir: {
					'blocks/critical': 'resources/critical-blocks',
				},
				outDir: 'dist',
				blockNamespace: 'custom',
			},
			scriptInjection: {
				method: 'module',
				pollingInterval: 100, // Very responsive for critical CSS
			},
		}),
	],
};

/**
 * Script Injection Methods Comparison:
 *
 * 1. Inline (default):
 *    - Pros: Most compatible, single request
 *    - Cons: Larger initial payload, harder to debug
 *    - Best for: Production, simple setups
 *
 * 2. External:
 *    - Pros: Cacheable, easier to debug, smaller initial payload
 *    - Cons: Additional HTTP request
 *    - Best for: Development, complex setups
 *
 * 3. Module:
 *    - Pros: Modern, efficient, tree-shakeable
 *    - Cons: Requires modern browser support
 *    - Best for: Modern development environments
 */

/**
 * Performance Tuning Guidelines:
 *
 * Polling Interval:
 * - 100-250ms: Very responsive, higher CPU usage
 * - 500ms: Balanced (default)
 * - 1000ms+: Less responsive, lower CPU usage
 *
 * Script Method:
 * - Use 'inline' for simple setups or production
 * - Use 'external' for development and debugging
 * - Use 'module' for modern environments
 *
 * Asset Discovery:
 * - Limit blocksDir to only directories that contain CSS
 * - Use specific watchPatterns instead of broad wildcards
 * - Consider excluding test or documentation directories
 */
