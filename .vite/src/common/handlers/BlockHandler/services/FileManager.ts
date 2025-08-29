/**
 * External dependencies
 */
import { readFile, readdir } from 'node:fs/promises';
import { resolve } from 'node:path';

/**
 * Internal dependencies
 */
import { FileEmitter, generatePhpArrayContent } from '../../../utils';
import type { BlockInfo } from '../../../types';
import type {
	FileManagerService,
	ServiceDependencies,
	SharedProcessors,
} from '../types';

/**
 * Service for managing static files and manifests
 *
 * This service is responsible for:
 * - Processing block.json files
 * - Processing PHP files with minification
 * - Copying static files to output directory
 * - Generating block manifest files
 */
export class FileManager implements FileManagerService {
	private php: SharedProcessors['php'];
	private fileEmitter: FileEmitter;
	private context: ServiceDependencies['context'];
	static manifestName = 'block-manifest.php';

	constructor(
		{
			context,
			outputDirectory,
		}: Pick<ServiceDependencies, 'context' | 'outputDirectory'>,
		processors: Pick<SharedProcessors, 'php'>
	) {
		this.context = context;
		this.php = processors.php;
		this.fileEmitter = new FileEmitter(outputDirectory);
	}

	/**
	 * Process block.json file and emit it to the output directory
	 */
	async processBlockJson(block: BlockInfo): Promise<void> {
		const destPath = block.outputPath || block.name;

		try {
			const blockJsonSrc = resolve(block.path, 'block.json');
			const blockJsonContent = await readFile(blockJsonSrc, 'utf-8');

			// Use FileEmitter for static files like block.json
			await this.fileEmitter.writeStaticFile(
				`${destPath}/block.json`,
				blockJsonContent
			);
		} catch (error) {
			console.error(
				`Failed to process block.json for ${block.name}:`,
				error
			);
			throw error;
		}
	}

	/**
	 * Process PHP files for a block
	 */
	async processBlockPhpFiles(
		block: BlockInfo,
		shouldMinify: boolean = true
	): Promise<void> {
		const destPath = block.outputPath || block.name;

		try {
			const files = await readdir(block.path);
			const phpFiles = files.filter((file) => file.endsWith('.php'));

			if (phpFiles.length === 0) {
				return;
			}

			const phpFileInfos = phpFiles.map((phpFile) => ({
				sourcePath: resolve(block.path, phpFile),
				outputPath: `${destPath}/${phpFile}`,
			}));

			await this.php.processPhpFiles(phpFileInfos, shouldMinify);
		} catch (error) {
			console.error(
				`Failed to process PHP files for ${block.name}:`,
				error
			);
			throw error;
		}
	}

	/**
	 * Copy all static files for a block (block.json and PHP files)
	 */
	async copyStaticFiles(
		block: BlockInfo,
		shouldMinify: boolean = true
	): Promise<void> {
		// Process block.json and PHP files in parallel
		await Promise.all([
			this.processBlockJson(block),
			this.processBlockPhpFiles(block, shouldMinify),
		]);
	}

	/**
	 * Generate block manifest file
	 */
	async generateManifest(blocks: BlockInfo[]): Promise<void> {
		if (blocks.length === 0) {
			console.log(
				'No blocks found. Skipping block manifest generation...'
			);
			return;
		}

		// Convert blocks array to a record object that generatePhpArrayContent expects
		const blocksRecord: Record<string, any> = {};

		blocks.forEach((block) => {
			blocksRecord[block.name] = block.blockJson;
		});

		// Generate PHP content
		const phpContent = generatePhpArrayContent(blocksRecord);

		// Always use FileEmitter.safeEmitFile which handles both build and dev modes properly
		await FileEmitter.safeEmitFile(this.context, {
			type: 'asset',
			fileName: FileManager.manifestName,
			source: phpContent,
		});
	}
}
