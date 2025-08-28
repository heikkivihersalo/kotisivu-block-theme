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
 * Execution mode detection
 */
type ExecutionMode = 'build' | 'serve' | 'production';

/**
 * Logger utility for consistent debug output
 */
class FileEmitterLogger {
	private static readonly PREFIX = '🔧 FileEmitter:';

	static log(message: string): void {
		console.log(`${this.PREFIX} ${message}`);
	}

	static success(message: string): void {
		console.log(`📁 ${this.PREFIX} ✅ ${message}`);
	}

	static warn(message: string): void {
		console.log(`⚠️ ${this.PREFIX} ${message}`);
	}

	static error(message: string, error?: Error): void {
		console.error(`❌ ${this.PREFIX} ${message}`, error);
	}
}

/**
 * Alternative to emitFile() for development mode
 * Uses file system operations to write files directly
 */
export class FileEmitter {
	private readonly outputDir: string;
	private readonly executionMode: ExecutionMode;

	constructor(outputDir: string, mode?: ExecutionMode) {
		this.outputDir = outputDir;
		this.executionMode = mode ?? this.detectExecutionMode();
	}

	/**
	 * Detect the current execution mode based on environment and command line arguments
	 */
	private detectExecutionMode(): ExecutionMode {
		if (process.env.NODE_ENV === 'production') {
			return 'production';
		}

		// Check for build command in various forms
		const isBuildCommand = process.argv.some(
			(arg) =>
				arg === 'build' ||
				arg.includes('vite build') ||
				arg.includes('npm run build')
		);

		return process.env.NODE_ENV === 'development' && !isBuildCommand
			? 'serve'
			: 'build';
	}

	/**
	 * Static utility method for quick access without instantiation
	 * Automatically detects execution mode and handles file emission appropriately
	 */
	static async safeEmitFile(
		pluginContext: PluginContext,
		asset: EmittedAsset,
		outputDir?: string
	): Promise<void> {
		const executionMode = FileEmitter.detectExecutionModeStatic();

		if (executionMode === 'serve') {
			if (outputDir) {
				// Use FileEmitter in development serve mode with output directory
				const emitter = new FileEmitter(outputDir, executionMode);
				await emitter.emitFile(pluginContext, asset);
			} else {
				// In serve mode without output directory, skip file emission
				FileEmitterLogger.warn(
					`Skipping file emission in serve mode: ${asset.fileName} (no output directory provided)`
				);
			}
		} else {
			// Use standard emitFile in build/production mode
			pluginContext.emitFile(asset);
		}
	}

	/**
	 * Static version of execution mode detection
	 */
	private static detectExecutionModeStatic(): ExecutionMode {
		if (process.env.NODE_ENV === 'production') {
			return 'production';
		}

		const isBuildCommand = process.argv.some(
			(arg) =>
				arg === 'build' ||
				arg.includes('vite build') ||
				arg.includes('npm run build') ||
				arg.includes('yarn build') ||
				arg.includes('pnpm build') ||
				arg.includes('pnpm run build')
		);

		return process.env.NODE_ENV === 'development' && !isBuildCommand
			? 'serve'
			: 'build';
	}

	/**
	 * Emit a file either through Rollup (production) or file system (development)
	 */
	async emitFile(
		pluginContext: PluginContext,
		asset: EmittedAsset
	): Promise<void> {
		const shouldUseFileSystem = this.executionMode === 'serve';

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
	 * Write asset file to file system with proper error handling and logging
	 */
	private async writeAssetFile(
		fileName: string,
		source: string | Uint8Array
	): Promise<void> {
		const fullPath = resolve(this.outputDir, fileName);
		const dir = dirname(fullPath);

		try {
			// Ensure directory exists
			await this.ensureDirectoryExists(dir);

			// Write the file
			if (typeof source === 'string') {
				await writeFile(fullPath, source, 'utf-8');
			} else {
				await writeFile(fullPath, source);
			}

			FileEmitterLogger.success(`Wrote ${fileName}`);
		} catch (error) {
			FileEmitterLogger.error(
				`Error writing file ${fileName}:`,
				error as Error
			);
			throw error;
		}
	}

	/**
	 * Ensure directory exists, create if necessary
	 */
	private async ensureDirectoryExists(dir: string): Promise<void> {
		if (!existsSync(dir)) {
			FileEmitterLogger.log(`Creating directory: ${dir}`);
			await mkdir(dir, { recursive: true });
		}
	}

	/**
	 * Copy a file from source to destination
	 */
	async copyFile(sourcePath: string, destFileName: string): Promise<void> {
		if (this.executionMode !== 'serve') {
			return; // Let Rollup handle this in production/build mode
		}

		const fullDestPath = resolve(this.outputDir, destFileName);
		const dir = dirname(fullDestPath);

		try {
			// Ensure directory exists
			await this.ensureDirectoryExists(dir);

			// Copy the file
			await copyFile(sourcePath, fullDestPath);
			FileEmitterLogger.success(`Copied ${destFileName}`);
		} catch (error) {
			FileEmitterLogger.error(
				`Error copying file ${destFileName}:`,
				error as Error
			);
			throw error;
		}
	}

	/**
	 * Force write a file to the filesystem (for static files like block.json)
	 * This bypasses the execution mode check and always writes to filesystem
	 */
	async writeStaticFile(
		fileName: string,
		source: string | Uint8Array
	): Promise<void> {
		await this.writeAssetFile(fileName, source);
	}

	/**
	 * Check if we're in development serve mode
	 */
	get isDevMode(): boolean {
		return this.executionMode === 'serve';
	}

	/**
	 * Get the current execution mode
	 */
	get mode(): ExecutionMode {
		return this.executionMode;
	}

	/**
	 * Get the output directory
	 */
	get outputDirectory(): string {
		return this.outputDir;
	}
}
