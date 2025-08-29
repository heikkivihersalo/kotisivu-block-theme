/**
 * External dependencies
 */
import { statSync } from 'node:fs';

/**
 * Internal dependencies
 */
import { generateSourcePath, findBlocksRecursively } from '../../../utils';
import type { BlockInfo } from '../../../types';
import type { BlockDiscoveryService, ServiceDependencies } from '../types';

/**
 * Service for discovering WordPress blocks in the file system
 *
 * This service is responsible for:
 * - Validating block discovery configuration
 * - Finding block.json files recursively
 * - Mapping custom output paths
 * - Caching discovered blocks
 */
export class BlockDiscovery implements BlockDiscoveryService {
	private discoveredBlocks: BlockInfo[] = [];
	private context: ServiceDependencies['context'];
	private config: ServiceDependencies['config'];
	private pwd: string;

	constructor({
		context,
		config,
		pwd,
	}: Pick<ServiceDependencies, 'context' | 'config' | 'pwd'>) {
		this.context = context;
		this.config = config;
		this.pwd = pwd;
	}

	/**
	 * Validate the configuration for block discovery
	 * @throws Error if configuration is invalid
	 */
	validateConfig(): void {
		const { blocksDir } = this.config;

		if (!blocksDir || Object.keys(blocksDir).length === 0) {
			throw new Error('blocksDir is required for BlockHandler');
		}
	}

	/**
	 * Discover block.json files with custom path mappings
	 */
	private discoverBlocksWithMappings(): BlockInfo[] {
		const { blocksDir } = this.config;
		const blocks: BlockInfo[] = [];

		for (const [outputPath, sourcePath] of Object.entries(blocksDir)) {
			const fullSourcePath = generateSourcePath(sourcePath, this.pwd);
			if (!fullSourcePath) continue;

			try {
				const stat = statSync(fullSourcePath);
				if (!stat.isDirectory()) continue;

				const foundBlocks = findBlocksRecursively(
					fullSourcePath,
					this.pwd,
					0
				);

				// Add custom output path to each discovered block
				foundBlocks.forEach((block) => {
					blocks.push({
						...block,
						outputPath: `${outputPath.replace(/\/$/, '')}/${block.name}`,
					});
				});
			} catch {
				// Silently skip inaccessible paths - this is expected during development
				continue;
			}
		}

		return blocks;
	}

	/**
	 * Discover blocks and validate discovery results
	 */
	async discoverBlocks(): Promise<BlockInfo[]> {
		this.discoveredBlocks = this.discoverBlocksWithMappings();

		if (this.discoveredBlocks.length === 0) {
			throw new Error(
				'No blocks discovered. Check your blocksDir configuration'
			);
		}

		// Add watch files if specified
		const { watch = [] } = this.config;
		watch.forEach((file: string) => this.context.addWatchFile(file));

		return this.discoveredBlocks;
	}

	/**
	 * Get discovered blocks
	 */
	getDiscoveredBlocks(): BlockInfo[] {
		return this.discoveredBlocks;
	}
}
