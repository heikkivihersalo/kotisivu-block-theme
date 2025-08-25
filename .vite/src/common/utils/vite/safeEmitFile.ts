/**
 * External dependencies
 */
import type { PluginContext } from 'rollup';

/**
 * Internal dependencies
 */
import type { EmittedAsset } from '../../types';
import { FileEmitter } from './FileEmitter';

/**
 * Safely emit a file, using FileEmitter in development mode
 * @param pluginContext - The Rollup plugin context
 * @param asset - The asset to emit
 * @param outputDir - Optional output directory for FileEmitter
 */
export const safeEmitFile = async (
	pluginContext: PluginContext,
	asset: EmittedAsset,
	outputDir?: string
): Promise<void> => {
	await FileEmitter.safeEmitFile(pluginContext, asset, outputDir);
};
