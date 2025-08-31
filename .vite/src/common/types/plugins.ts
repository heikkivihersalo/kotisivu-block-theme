/**
 * Legacy Plugin Types - Deprecated
 *
 * This file previously contained extract functions and derived types.
 * These have been removed in favor of using PluginConfig directly.
 *
 * Access configuration properties directly from the PluginConfig object
 * using optional chaining (e.g., config.build?.outDir).
 */

/**
 * Asset processor configuration
 *
 * This type is still used by internal asset processing utilities
 * and represents the minimal configuration needed for asset processing.
 */
export type AssetProcessorConfig = {
	outputDirectory: string;
	dependencies?: string[];
	sourcemap?: boolean | 'linked' | 'external' | 'inline' | 'both';
};
