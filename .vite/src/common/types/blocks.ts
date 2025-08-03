/**
 * WordPress Block JSON configuration
 */
export type WordpressBlockJson = {
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
 * Block discovery information
 */
export type BlockInfo = {
	path: string;
	blockJson: WordpressBlockJson;
	name: string;
	outputPath?: string; // Custom output path for path mappings
};
