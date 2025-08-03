import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
/**
 * External dependencies
 */
import type { Plugin, ResolvedConfig } from 'vite';

import { normalizePath } from '../../common/index.js';
/**
 * Internal dependencies
 */
import {
	convertViteManifestToWordPress,
	generateWordPressEnqueueFile,
} from '../../common/utils/manifestHelpers.js';

interface ManifestPluginConfig {
	outDir?: string;
	generatePhpManifest?: boolean;
	publicPath?: string;
	textDomain?: string;
}

/**
 * Vite 6 Enhanced Manifest Plugin for WordPress
 *
 * Leverages Vite 6's improved manifest generation to create
 * WordPress-compatible asset manifests and PHP enqueue files
 */
export function ManifestPlugin(config: ManifestPluginConfig = {}): Plugin {
	const {
		outDir = 'build',
		generatePhpManifest = true,
		publicPath = '/',
		textDomain = 'theme',
	} = config;

	// Store resolved config for potential future use
	let _resolvedConfig: ResolvedConfig;
	let outputDirectory: string;

	return {
		name: 'vite-plugin-gutenberg-manifest',

		configResolved(config: ResolvedConfig) {
			_resolvedConfig = config;
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
			} catch (error) {
				console.warn('Failed to generate WordPress manifest:', error);
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
