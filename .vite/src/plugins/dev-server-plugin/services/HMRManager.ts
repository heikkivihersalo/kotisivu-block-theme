/**
 * External dependencies
 */
import fs from 'fs';
import path from 'path';
import type { ViteDevServer } from 'vite';

/**
 * Internal dependencies
 */
import type { ResolvedPluginConfig } from '../../config-plugin/index.js';
import { BuildMapResolver } from '../../../common/services/BuildMapResolver';
import { AssetManager } from './AssetManager';

/**
 * HMRManager handles hot module replacement and file watching
 */
export class HMRManager {
	private watchedFiles = new Set<string>();
	private buildMapResolver: BuildMapResolver;
	private pluginConfig: ResolvedPluginConfig;
	private assetManager: AssetManager;

	constructor(
		buildMapResolver: BuildMapResolver,
		pluginConfig: ResolvedPluginConfig,
		assetManager: AssetManager
	) {
		this.buildMapResolver = buildMapResolver;
		this.pluginConfig = pluginConfig;
		this.assetManager = assetManager;
	}

	/**
	 * Set up file watching for assets and source files
	 */
	setupFileWatching(addWatchFile: (file: string) => void): void {
		if (!this.pluginConfig?.hmr?.enabled) return;

		// Debug: Log all inline assets being watched
		if (this.pluginConfig.hmr.watch?.inline?.length) {
			console.log(
				'[DevServer] Inline assets to watch:',
				this.pluginConfig.hmr.watch.inline
			);
		}

		// Add watch patterns for CSS files
		if (this.pluginConfig.hmr.watch?.css) {
			this.pluginConfig.hmr.watch.css.forEach((pattern: string) => {
				addWatchFile(pattern);
				console.log('[DevServer] Watching CSS pattern:', pattern);
			});
		}

		// Add specific inline asset files to watch
		if (this.pluginConfig.hmr.watch?.inline) {
			this.pluginConfig.hmr.watch.inline.forEach((asset: string) => {
				const fullPath = path.resolve(asset);
				if (fs.existsSync(fullPath)) {
					addWatchFile(fullPath);
					this.watchedFiles.add(fullPath);
					console.log('[DevServer] Watching inline asset:', fullPath);
				} else {
					console.warn(
						'[DevServer] Inline asset not found:',
						fullPath
					);
				}
			});
		}

		// Add block source files to watch
		const blockAssets = this.assetManager.getBlockAssets();
		for (const [, assetInfo] of blockAssets) {
			// Add all source files from the block asset
			Object.values(assetInfo.src).forEach((sourcePath) => {
				addWatchFile(sourcePath);
				this.watchedFiles.add(sourcePath);
			});
		}

		// Add general asset source files to watch
		const generalAssets = this.assetManager.getGeneralAssets();
		for (const [, assetInfo] of generalAssets) {
			addWatchFile(assetInfo.sourcePath);
			this.watchedFiles.add(assetInfo.sourcePath);
		}
	}

	/**
	 * Check if a file change affects any monitored assets
	 */
	getAffectedAsset(
		file: string,
		inlineAssets: string[],
		watchPatterns: string[]
	): string {
		const blockAssets = this.assetManager.getBlockAssets();
		const generalAssets = this.assetManager.getGeneralAssets();

		// Check direct inline asset matches
		const matchedInlineAsset = inlineAssets.find((asset) => {
			const fullPath = path.resolve(asset);
			return (
				file === fullPath ||
				file.endsWith(asset) ||
				fullPath.endsWith(file)
			);
		});

		if (matchedInlineAsset) {
			console.log(
				`[HMR] Inline asset matched: ${file} -> ${matchedInlineAsset}`
			);
			return matchedInlineAsset;
		}

		// Check if file matches watch patterns (source files)
		const isSourceFile = watchPatterns.some((pattern) => {
			const regex = pattern
				.replace(/\*\*/g, '.*')
				.replace(/\*/g, '[^/]*');
			return new RegExp(regex).test(file);
		});

		if (isSourceFile) {
			// Determine affected asset based on file path patterns
			if (file.includes('sanitize') || file.includes('normalize')) {
				console.log(`[HMR] Source file affects sanitize: ${file}`);
				return 'assets/sanitize.css';
			} else if (
				file.includes('tailwind') ||
				file.includes('utilities')
			) {
				console.log(`[HMR] Source file affects tailwind: ${file}`);
				return 'assets/tailwind-utilities.css';
			} else if (file.includes('inline') || file.includes('critical')) {
				console.log(`[HMR] Source file affects inline: ${file}`);
				return 'assets/inline.css';
			}
		}

		// Check block assets (source and build files)
		for (const [, assetInfo] of blockAssets) {
			// Check source files
			for (const [sourceKey, sourcePath] of Object.entries(
				assetInfo.src
			)) {
				if (file === sourcePath || file === path.resolve(sourcePath)) {
					const buildKey = sourceKey
						.replace(/\.(js|jsx|ts|tsx)$/, '.js')
						.replace('.css', '.css');
					const buildPath =
						assetInfo.build[buildKey] ||
						Object.values(assetInfo.build)[0];
					if (buildPath) {
						console.log(
							`[HMR] Block source file changed: ${file} -> ${buildPath}`
						);
						return buildPath;
					}
				}
			}

			// Check build files
			for (const buildPath of Object.values(assetInfo.build)) {
				if (file === buildPath || file === path.resolve(buildPath)) {
					console.log(`[HMR] Block build file changed: ${file}`);
					return buildPath;
				}
			}
		}

		// Check general assets
		for (const [, assetInfo] of generalAssets) {
			if (
				file === assetInfo.sourcePath ||
				file === assetInfo.buildPath ||
				file === path.resolve(assetInfo.sourcePath) ||
				file === path.resolve(assetInfo.buildPath)
			) {
				console.log(
					`[HMR] General asset changed: ${file} -> ${assetInfo.buildPath}`
				);
				return assetInfo.buildPath;
			}
		}

		return '';
	}

	/**
	 * Handle hot update for files
	 */
	handleHotUpdate(file: string, server: ViteDevServer): any[] | undefined {
		console.log(`[HMR] File changed: ${file}`);

		// Update buildMap with simplified entry for hot updates
		if (this.buildMapResolver) {
			this.buildMapResolver.createHotUpdateEntry(file);
		}

		// Handle PHP file changes
		if (file.endsWith('.php')) {
			console.log(
				`[HMR] PHP file changed, triggering full reload: ${file}`
			);
			server.ws.send({ type: 'full-reload', path: '*' });
			return [];
		}

		// Handle inline assets if HMR is configured
		if (this.pluginConfig?.hmr?.enabled) {
			const affectedAsset = this.getAffectedAsset(
				file,
				this.pluginConfig.hmr?.watch?.inline || [],
				this.pluginConfig.hmr?.watch?.css || []
			);

			if (affectedAsset) {
				console.log(`[HMR] Inline asset updated: ${affectedAsset}`);

				// Send HMR update for inline asset
				server.ws.send({
					type: 'custom',
					event: 'inline-asset-update',
					data: { asset: affectedAsset },
				});

				// Return empty array to prevent default HMR behavior
				return [];
			} else {
				console.log(`[HMR] No affected asset found for: ${file}`);
			}
		}

		// Let Vite handle other files normally
		return undefined;
	}

	/**
	 * Get watched files
	 */
	getWatchedFiles(): Set<string> {
		return this.watchedFiles;
	}
}
