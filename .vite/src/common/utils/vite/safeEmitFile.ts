/**
 * External dependencies
 */
import type { PluginContext } from 'rollup';

/**
 * Internal dependencies
 */
import type { EmittedAsset } from '../../types';
import { DevFileEmitter } from './DevFileEmitter';

/**
 * Safely emit a file, using DevFileEmitter in development mode
 * @param pluginContext - The Rollup plugin context
 * @param asset - The asset to emit
 * @param outputDir - Optional output directory for DevFileEmitter
 */
export const safeEmitFile = async (
	pluginContext: PluginContext,
	asset: EmittedAsset,
	outputDir?: string
): Promise<void> => {
	await DevFileEmitter.safeEmitFile(pluginContext, asset, outputDir);
};
