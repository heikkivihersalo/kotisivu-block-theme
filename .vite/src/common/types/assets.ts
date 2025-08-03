export type DiscoveredAssetInfo = {
	name: string;
	sourcePath: string;
	outputPath: string;
	relativePath: string;
};

export type OutputConfig = {
	basePath: string;
	blockOutputDir: string;
	outputPath?: string;
};
