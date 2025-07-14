/**
 * Manifest and block-related types
 */

export type ManifestBlock = {
	editorScript?: string;
	editorStyle?: string;
	script?: string;
	style?: string;
	render?: string;
	blockJson?: string;
	dependencies?: string[];
};

export type ManifestAsset = {
	fileName: string;
	type: 'chunk' | 'asset';
	isEntry?: boolean;
	dependencies?: string[];
	imports?: string[];
	css?: string[];
};

// Bundle-specific manifest types
export type BlockManifest = {
	blockJson: string;
	scripts?: {
		editor?: string;
		frontend?: string;
	};
	styles?: {
		frontend?: string;
	};
	dependencies?: string[];
};

export type AssetChunk = {
	name: string;
	fileName: string;
	imports: string[];
	modules: string[];
};

export type ManifestAssets = {
	chunks: Record<string, AssetChunk[]>;
};
