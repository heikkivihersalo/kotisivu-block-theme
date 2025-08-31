/**
 * Legacy Plugin Types - Deprecated
 *
 * This file previously contained extract functions and derived types.
 * These have been removed in favor of using PluginConfig directly.
 *
 * If you need to access specific configuration sections, use the
 * config helpers from config-helpers.ts instead.
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
