/**
 * Plugin configuration types
 */

export type ChunkConfig = {
	frontend: string[];
	editor: string[];
	common: string[];
};

export type PluginOptions = {
	input: Record<string, string>;
	output?: string;
	chunks?: ChunkConfig;
};
