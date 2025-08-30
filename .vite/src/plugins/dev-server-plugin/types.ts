/**
 * Configuration types for DevServer plugin
 */
export type DevServerConfig = {
	/**
	 * Development server host
	 */
	host?: string;

	/**
	 * Development server port
	 */
	port?: number;

	/**
	 * Base path for the application
	 */
	base?: string;

	/**
	 * Source directory path
	 */
	srcDir?: string;

	/**
	 * Output directory path
	 */
	outDir?: string;

	/**
	 * CSS file extension
	 */
	css?: string;

	/**
	 * Whether to generate manifest
	 */
	manifest?: boolean;
};
