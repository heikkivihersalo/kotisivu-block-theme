/**
 * Types for BlockHandler
 */

/**
 * Configuration for processing operations
 */
export type ProcessingOptions = {
	sourcemap?: boolean | 'linked' | 'external' | 'inline' | 'both';
	minifyPhp?: boolean;
};
