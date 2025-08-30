/**
 * Script Processing Strategy Interface
 *
 * This interface defines the contract for script processing strategies,
 * allowing for easier testing and different script processing implementations.
 */
export interface ScriptProcessor {
	/**
	 * Build/process script content with the given options
	 * @param options - Build configuration options
	 * @returns Processed script result with JS, CSS, and dependencies
	 */
	build(options: ScriptBuildOptions): Promise<ScriptProcessingResult>;
}

/**
 * Script build options
 */
export interface ScriptBuildOptions {
	entryPoint: string;
	outfile?: string;
	outdir?: string;
	sourcemap?: boolean | 'linked' | 'external' | 'inline' | 'both';
	minify?: boolean;
	platform?: string;
	target?: string | string[];
	wpDependencies?: string[];
}

/**
 * Script processing result
 */
export interface ScriptProcessingResult {
	jsContent: string;
	cssContent?: string;
	jsSourceMap?: string;
	cssSourceMap?: string;
	wpDependencies: string[];
	metafile?: any;
}
