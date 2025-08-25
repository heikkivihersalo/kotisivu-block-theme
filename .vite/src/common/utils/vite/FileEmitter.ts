/**
 * External dependencies
 */
import { writeFile, mkdir, copyFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { existsSync } from 'node:fs';
import type { PluginContext } from 'rollup';

/**
 * Internal dependencies
 */
import type { EmittedAsset } from '../../types';

/**
 * Alternative to emitFile() for development mode
 * Uses file system operations to write files directly
 */
export class FileEmitter {
	private outputDir: string;
	private isDevelopment: boolean;

	constructor(outputDir: string) {
		this.outputDir = outputDir;
		this.isDevelopment = process.env.NODE_ENV === 'development';
	}

	/**
	 * Static utility method for quick access without instantiation
	 */
	static async safeEmitFile(
		pluginContext: PluginContext,
		asset: EmittedAsset,
		outputDir?: string
	): Promise<void> {
		// Check if we're in Vite's build mode by looking at command line arguments
		// If 'build' command is running, use standard emitFile even in development
		const isBuildCommand = process.argv.includes('build');
		const isServeMode =
			process.env.NODE_ENV === 'development' && !isBuildCommand;

		if (isServeMode) {
			if (outputDir) {
				// Use FileEmitter in development serve mode with output directory
				const emitter = new FileEmitter(outputDir);
				await emitter.emitFile(pluginContext, asset);
			} else {
				// In serve mode without output directory, skip file emission
				// This prevents the "emitFile() is not supported in serve mode" error
				console.log(
					`🔧 Skipping file emission in serve mode: ${asset.fileName} (no output directory)`
				);
			}
		} else {
			// Use standard emitFile in build mode
			pluginContext.emitFile(asset);
		}
	}

	/**
	 * Emit a file either through Rollup (production) or file system (development)
	 */
	async emitFile(
		pluginContext: PluginContext,
		asset: EmittedAsset
	): Promise<void> {
		// Check if we're in build mode
		const isBuildCommand = process.argv.includes('build');
		const shouldUseFileSystem = this.isDevelopment && !isBuildCommand;

		if (!shouldUseFileSystem) {
			// Use standard emitFile in production or build mode
			pluginContext.emitFile(asset);
			return;
		}

		// In development serve mode, write files directly to file system
		if (asset.type === 'asset' && asset.fileName && asset.source) {
			await this.writeAssetFile(asset.fileName, asset.source);
		}
	}

	/**
	 * Write asset file to file system
	 */
	private async writeAssetFile(
		fileName: string,
		source: string | Uint8Array
	): Promise<void> {
		const fullPath = resolve(this.outputDir, fileName);
		const dir = dirname(fullPath);

		console.log(`🔧 writeAssetFile: ${fileName}`);
		console.log(`🔧 Full path: ${fullPath}`);
		console.log(`🔧 Directory: ${dir}`);

		// Ensure directory exists
		if (!existsSync(dir)) {
			console.log(`🔧 Creating directory: ${dir}`);
			await mkdir(dir, { recursive: true });
		} else {
			console.log(`🔧 Directory already exists: ${dir}`);
		}

		// Write the file
		try {
			if (typeof source === 'string') {
				await writeFile(fullPath, source, 'utf-8');
			} else {
				await writeFile(fullPath, source);
			}
			console.log(`📁 FileEmitter: Wrote ${fileName}`);
		} catch (error) {
			console.error(`❌ Error writing file ${fileName}:`, error);
			throw error;
		}
	}

	/**
	 * Copy a file from source to destination
	 */
	async copyFile(sourcePath: string, destFileName: string): Promise<void> {
		if (!this.isDevelopment) {
			return; // Let Rollup handle this in production
		}

		const fullDestPath = resolve(this.outputDir, destFileName);
		const dir = dirname(fullDestPath);

		// Ensure directory exists
		if (!existsSync(dir)) {
			await mkdir(dir, { recursive: true });
		}

		// Copy the file
		await copyFile(sourcePath, fullDestPath);
		console.log(`📄 FileEmitter: Copied ${destFileName}`);
	}

	/**
	 * Force write a file to the filesystem (for static files like block.json)
	 * This bypasses the build mode check and always writes to filesystem
	 */
	async writeStaticFile(
		fileName: string,
		source: string | Uint8Array
	): Promise<void> {
		console.log(`🔧 FileEmitter.writeStaticFile called: ${fileName}`);
		console.log(`🔧 Output dir: ${this.outputDir}`);
		console.log(`🔧 isDevelopment: ${this.isDevelopment}`);
		console.log(
			`🔧 Source length: ${typeof source === 'string' ? source.length : source.byteLength}`
		);

		await this.writeAssetFile(fileName, source);
	}

	/**
	 * Check if we're in development mode
	 */
	get isDevMode(): boolean {
		return this.isDevelopment;
	}
}
