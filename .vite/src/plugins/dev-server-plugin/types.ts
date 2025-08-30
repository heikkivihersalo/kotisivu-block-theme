/**
 * Configuration types for DevServer plugin
 */
export type DevServerConfig = {
	/**
	 * Development server host (e.g., 'localhost', 'block-theme.local')
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

	/**
	 * Full development server URL (e.g., 'http://localhost:5173', 'https://block-theme.local:5173')
	 * If provided, this takes precedence over host and port
	 */
	devServerUrl?: string;
};
