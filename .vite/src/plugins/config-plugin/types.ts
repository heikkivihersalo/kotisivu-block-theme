export type WordPressViteConfig = {
	outDir?: string;
	minify?: boolean | 'esbuild' | 'terser';
	sourcemap?: boolean | 'linked' | 'external' | 'inline' | 'both';
	terserOptions?: any;
	target?: string | string[];
	cssCodeSplit?: boolean;
	enableFuture?: boolean;
};
