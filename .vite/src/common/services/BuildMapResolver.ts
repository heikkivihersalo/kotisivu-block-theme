/**
 * External dependencies
 */
import type { ManifestChunk } from 'vite';
import type { OutputBundle, OutputChunk } from 'rollup';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Internal dependencies
 */
export interface IBuildMapResolver {
	getBuildMap(): Record<string, ManifestChunk>;
	updateBuildMap(newBuildMap: Record<string, ManifestChunk>): void;
	saveBuildMap(): void;
	clearBuildMap(): void;
	addToBuildMap(fileName: string, manifestChunk: ManifestChunk): void;
	createHotUpdateEntry(file: string): void;
}

/**
 * BuildMapResolver handles reading and writing build map data
 *
 * This class centralizes all build map operations, providing a clean interface
 * for managing the build cache file and creating file mappings from Vite bundles.
 */
export class BuildMapResolver implements IBuildMapResolver {
	private buildMap: Record<string, ManifestChunk> = {};
	private readonly buildCachePath: string;
	private readonly outDir: string;
	private readonly css: string;

	constructor(outDir: string = 'build', css: string = 'css') {
		this.outDir = outDir;
		this.css = css;
		this.buildCachePath = path.join(process.cwd(), outDir, 'buildMap.json');
		this.loadBuildMap();
	}

	/**
	 * Load existing build map from cache file
	 */
	private loadBuildMap(): void {
		try {
			if (fs.existsSync(this.buildCachePath)) {
				const buildMapData = fs.readFileSync(
					this.buildCachePath,
					'utf8'
				);
				this.buildMap = JSON.parse(buildMapData);
			}
		} catch (error) {
			console.warn('Failed to load build cache:', error);
			this.buildMap = {};
		}
	}

	/**
	 * Save current build map to cache file
	 */
	public saveBuildMap(): void {
		try {
			const outDirPath = path.join(process.cwd(), this.outDir);
			if (!fs.existsSync(outDirPath)) {
				fs.mkdirSync(outDirPath, { recursive: true });
			}
			fs.writeFileSync(
				this.buildCachePath,
				JSON.stringify(this.buildMap, null, 2)
			);
		} catch (error) {
			console.warn('Failed to write build cache:', error);
		}
	}

	/**
	 * Get the current build map
	 */
	public getBuildMap(): Record<string, ManifestChunk> {
		return { ...this.buildMap };
	}

	/**
	 * Update the build map with new data
	 */
	public updateBuildMap(newBuildMap: Record<string, ManifestChunk>): void {
		Object.assign(this.buildMap, newBuildMap);
	}

	/**
	 * Clear the build map
	 */
	public clearBuildMap(): void {
		this.buildMap = {};
	}

	/**
	 * Add a single entry to the build map
	 */
	public addToBuildMap(fileName: string, manifestChunk: ManifestChunk): void {
		this.buildMap[fileName] = manifestChunk;
	}

	/**
	 * Create file map from Vite output bundle
	 */
	public createFileMapFromBundle(
		bundle: OutputBundle,
		rootPath: string = process.cwd()
	): Record<string, ManifestChunk> {
		const buildFileMap: Record<string, ManifestChunk> = {};

		for (const module of Object.values(bundle)) {
			if (module.type !== 'chunk' || !('facadeModuleId' in module))
				continue;

			const chunk = module as OutputChunk;
			const { facadeModuleId, fileName, viteMetadata, name } = chunk;
			const {
				importedCss = new Set<string>(),
				importedAssets = new Set<string>(),
			} = viteMetadata || {};

			if (facadeModuleId === null) {
				continue;
			}

			const src = facadeModuleId.replace(`${rootPath}/`, '');

			const addToMap = (file: string) => {
				if (!buildFileMap[file]) {
					buildFileMap[file] = { src, name, file };
				}
			};

			// Handle .php files with imported assets
			if (facadeModuleId.endsWith('.php') && importedAssets.size) {
				addToMap(Array.from(importedAssets)[0]);
				continue;
			}

			// Handle .js and .ts files
			if (
				facadeModuleId.endsWith('.js') ||
				facadeModuleId.endsWith('.ts') ||
				facadeModuleId.endsWith('.jsx') ||
				facadeModuleId.endsWith('.tsx')
			) {
				addToMap(fileName);
				continue;
			}

			// Handle CSS files
			if (!facadeModuleId.endsWith(`.${this.css}`)) {
				addToMap(fileName);
			}

			if (importedCss.size) {
				addToMap(Array.from(importedCss)[0]);
			}
		}

		return buildFileMap;
	}

	/**
	 * Create simplified manifest chunk for hot updates
	 */
	public createHotUpdateEntry(file: string): void {
		const fileName = file.split('/').pop();
		if (fileName) {
			const src = file.replace(process.cwd(), '').substring(1);
			this.buildMap[fileName] = {
				src,
				file: fileName,
			};
			this.saveBuildMap();
		}
	}

	/**
	 * Process bundle and update build map
	 */
	public processBundleAndUpdate(
		bundle: OutputBundle,
		rootPath?: string
	): void {
		const fileMap = this.createFileMapFromBundle(bundle, rootPath);
		this.updateBuildMap(fileMap);
	}
}
