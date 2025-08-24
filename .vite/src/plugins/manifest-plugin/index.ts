/**
 * External dependencies
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import type { Plugin, ResolvedConfig } from 'vite';

/**
 * Shared dependencies
 */
import { normalizePath } from '../../common/utils';
import type { ViteManifestPluginConfig } from '../../common/types';

/**
 * Internal dependencies
 */
import {
	convertViteManifestToWordPress,
	generateWordPressEnqueueFile,
} from './tools';

/**
 * Vite plugin for generating WordPress-compatible asset manifests
 *
 * This plugin reads the Vite 6 manifest and generates a PHP file for WordPress
 * enqueueing assets, along with a JSON version for debugging.
 *
 * @param config - Configuration options for the plugin.
 * @return A Vite plugin that processes the manifest and generates WordPress-compatible files.
 */
export function ManifestPlugin(config: ViteManifestPluginConfig = {}): Plugin {
	const {
		outDir = 'build',
		generatePhpManifest = true,
		publicPath = '/',
		textDomain = 'theme',
	} = config;

	// Store the output directory
	let outputDirectory: string;

	return {
		name: 'vite-plugin-gutenberg-manifest',

		configResolved(config: ResolvedConfig) {
			outputDirectory = normalizePath(outDir) || config.build.outDir;
		},

		// Use writeBundle instead of generateBundle for post-processing
		writeBundle() {
			if (!generatePhpManifest) return;

			try {
				// Read the Vite 6 generated manifest
				const manifestPath = join(
					outputDirectory,
					'.vite',
					'manifest.json'
				);
				const viteManifest = JSON.parse(
					readFileSync(manifestPath, 'utf-8')
				);

				// Convert to WordPress format
				const wpManifest = convertViteManifestToWordPress(
					viteManifest,
					publicPath
				);

				// Generate PHP enqueue file
				const phpContent = generateWordPressEnqueueFile(
					wpManifest,
					textDomain
				);
				const phpManifestPath = join(
					outputDirectory,
					'asset-manifest.php'
				);

				writeFileSync(phpManifestPath, phpContent);

				// Also save JSON version for debugging
				const jsonManifestPath = join(
					outputDirectory,
					'asset-manifest.json'
				);
				writeFileSync(
					jsonManifestPath,
					JSON.stringify(wpManifest, null, 2)
				);
			} catch {
				// Skip manifest generation if files are missing or malformed
			}
		},

		// Expose API for other plugins
		api: {
			getOutputDirectory: () => outputDirectory,
			getManifestPath: () =>
				join(outputDirectory, '.vite', 'manifest.json'),
		},
	};
}
