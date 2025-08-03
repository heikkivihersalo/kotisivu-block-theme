export type ViteManifestChunk = {
	file: string;
	css?: string[];
	imports?: string[];
	assets?: string[];
	isEntry?: boolean;
	src?: string;
};

export type ViteManifest = {
	[key: string]: ViteManifestChunk;
};

export type WordPressAssetManifest = {
	[key: string]: {
		file: string;
		css: string[];
		dependencies: string[];
		version: string;
		in_footer: boolean;
	};
};
