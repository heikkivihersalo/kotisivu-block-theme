/**
 * Script Template System
 *
 * System for generating HMR client scripts using external template files.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import type { BlockAssetInfo } from '../utils/block-discovery.js';

const __filename = fileURLToPath(import.meta.url);

/**
 * Script generation configuration
 */
export interface ScriptConfig {
	blockAssets: Map<string, BlockAssetInfo>;
	blockNamespace: string;
	pollingInterval: number;
	viteServerUrl?: string;
}

/**
 * Load script template from file
 */
function loadTemplate(templateName: string): string {
	const templatePath = path.join(
		path.dirname(__filename),
		'..',
		'templates',
		`${templateName}.js`
	);

	if (!fs.existsSync(templatePath)) {
		throw new Error(`Template file not found: ${templatePath}`);
	}

	return fs.readFileSync(templatePath, 'utf-8');
}

/**
 * Generate script with configuration
 */
export function generateScript(
	templateName: string,
	config: ScriptConfig
): string {
	const template = loadTemplate(templateName);

	// Prepare configuration object
	const configObject = {
		blockAssets: Array.from(config.blockAssets.entries()),
		blockNamespace: config.blockNamespace,
		pollingInterval: config.pollingInterval,
		viteServerUrl: config.viteServerUrl,
	};

	// Replace configuration placeholder
	return template.replace('{{CONFIG}}', JSON.stringify(configObject));
}

/**
 * Generate ES module script
 */
export function generateModuleScript(config: ScriptConfig): string {
	return `
import { initializeHMR } from '/__vite_inline_assets_module';

const blockAssetsMap = new Map(${JSON.stringify(Array.from(config.blockAssets.entries()))});
const hmrConfig = {
	blockAssets: blockAssetsMap,
	blockNamespace: '${config.blockNamespace}',
	pollingInterval: ${config.pollingInterval}
};

initializeHMR(hmrConfig);
`;
}

/**
 * Generate external script reference
 */
export function generateExternalScript(config: ScriptConfig): string {
	// Store config in global variable for external script to pick up
	return `
window.__VITE_INLINE_ASSETS_CONFIG__ = {
	blockAssets: new Map(${JSON.stringify(Array.from(config.blockAssets.entries()))}),
	blockNamespace: '${config.blockNamespace}',
	pollingInterval: ${config.pollingInterval}
};

// Load external script
const script = document.createElement('script');
script.src = '/__vite_inline_assets.js';
script.async = true;
document.head.appendChild(script);
`;
}
