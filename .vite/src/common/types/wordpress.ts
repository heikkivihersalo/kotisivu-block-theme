/**
 * WordPress-specific types for blocks, themes, and asset management
 */

/**
 * WordPress Block JSON configuration schema
 */
export type WordPressBlockJSON = {
	name?: string;
	title?: string;
	description?: string;
	category?: string;
	icon?: string;
	keywords?: string[];
	textdomain?: string;
	apiVersion?: number;
	$schema?: string;
	supports?: Record<string, any>;
	attributes?: Record<string, any>;
	style?: string | string[];
	editorStyle?: string | string[];
	viewStyle?: string | string[];
	viewScript?: string | string[];
	script?: string | string[];
	editorScript?: string | string[];
	[key: string]: any; // Allow additional properties
};

/**
 * WordPress block information for build processing
 */
export type BlockInfo = {
	path: string;
	blockJson: WordPressBlockJSON;
	name: string;
	outputPath?: string; // Custom output path for path mappings
};

/**
 * Vite manifest chunk structure
 */
export type ViteManifestChunk = {
	file: string;
	css?: string[];
	imports?: string[];
	assets?: string[];
	isEntry?: boolean;
	src?: string;
};

/**
 * Complete Vite manifest structure
 */
export type ViteManifest = {
	[key: string]: ViteManifestChunk;
};

/**
 * WordPress-compatible asset manifest for enqueueing
 */
export type WordPressAssetManifest = {
	[key: string]: {
		file: string;
		css: string[];
		dependencies: string[];
		version: string;
		in_footer: boolean;
	};
};
