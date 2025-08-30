/**
 * Asset and block discovery types
 */

/**
 * Internal dependencies
 */
import type { FileIdentifier, DiscoveredFilePathInfo } from './paths.ts';
import type { FileEmitter } from '../services/FileEmitter.ts';

/**
 * Information about a discovered asset during build process
 */
export type DiscoveredAsset = FileIdentifier & DiscoveredFilePathInfo;

/**
 * Asset processor configuration for build processing
 */
export type AssetProcessorConfig = {
	outputDirectory: string;
	dependencies?: string[];
	sourcemap?: boolean | 'linked' | 'external' | 'inline' | 'both';
	fileEmitter?: FileEmitter;
};
