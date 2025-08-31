/**
 * Asset and block discovery types
 */

/**
 * Internal dependencies
 */
import type { FileIdentifier, DiscoveredFilePathInfo } from './paths.ts';

/**
 * Information about a discovered asset during build process
 */
export type DiscoveredAsset = FileIdentifier & DiscoveredFilePathInfo;
