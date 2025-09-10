/**
 * HMR Client for Various Asset Types
 *
 * Class-based client-side script for handling Hot Module Replacement of different asset types.
 * Supports inline CSS, CSS files, JS files, and other assets with a unified polling mechanism.
 */

/**
 * HMR Client Configuration Interface
 */
interface HMRConfig {
	blockAssets: Map<string, any>;
	blockNamespace: string;
	pollingInterval: number;
	viteServerUrl?: string;
}

/**
 * Asset change information
 */
interface AssetChange {
	path: string;
	content: string;
	type: AssetType;
}

/**
 * Asset type enumeration
 */
enum AssetType {
	INLINE_CSS = 'inline-css',
	CSS_FILE = 'css-file',
	JS_FILE = 'js-file',
	OTHER = 'other',
}

/**
 * Base asset handler interface
 */
interface AssetHandler {
	canHandle(assetPath: string): boolean;
	update(assetPath: string, content: string): Promise<boolean>;
	getAssetType(): AssetType;
}

/**
 * Inline CSS Asset Handler
 */
class InlineCSSHandler implements AssetHandler {
	constructor(private config: HMRConfig) {}

	canHandle(assetPath: string): boolean {
		return assetPath.endsWith('.css');
	}

	getAssetType(): AssetType {
		return AssetType.INLINE_CSS;
	}

	async update(assetPath: string, content: string): Promise<boolean> {
		const styleId = this.getStyleIdFromAsset(assetPath);
		let styleElement = document.getElementById(styleId) as HTMLStyleElement;

		// If exact ID not found, try pattern matching
		if (!styleElement) {
			const foundElement = this.findStyleElementByPattern(assetPath);
			if (foundElement) {
				styleElement = foundElement;
			}
		}

		if (styleElement && styleElement.textContent !== content) {
			styleElement.textContent = content;
			console.log('[HMR] ✅ Updated inline CSS:', assetPath);
			return true;
		}

		if (!styleElement) {
			console.warn(
				'[HMR] No style element found for:',
				assetPath,
				'with ID:',
				styleId
			);
		}

		return false;
	}

	private getStyleIdFromAsset(assetPath: string): string {
		const blockAssets = this.config.blockAssets;

		// Check if it's a block asset
		for (const [, assetInfo] of blockAssets) {
			const typedAssetInfo = assetInfo as {
				blockSlug: string;
				sourcePath: string;
				buildPath?: string;
			};
			if (assetPath.includes(typedAssetInfo.blockSlug)) {
				// Determine CSS type from path
				let cssType = 'style';
				if (assetPath.includes('index.css')) {
					cssType = 'index';
				} else if (assetPath.includes('style-index.css')) {
					cssType = 'style-index';
				}
				return `${this.config.blockNamespace}-${typedAssetInfo.blockSlug}-${cssType}-inline-css`;
			}
		}

		// Handle theme inline assets
		const assetId = assetPath.replace(/[^a-zA-Z0-9]/g, '-');
		return `${assetId}-inline-css`;
	}

	private findStyleElementByPattern(
		assetPath: string
	): HTMLStyleElement | null {
		const styleElements = document.querySelectorAll(
			'style[id*="-inline-css"], style[id*="-css"]'
		);
		const assetName = assetPath.split('/').pop()?.replace('.css', '') || '';

		for (const style of styleElements) {
			if (style.id.includes(assetName)) {
				return style as HTMLStyleElement;
			}
		}

		return null;
	}
}

/**
 * CSS File Handler (for linked stylesheets)
 */
class CSSFileHandler implements AssetHandler {
	canHandle(assetPath: string): boolean {
		return assetPath.endsWith('.css');
	}

	getAssetType(): AssetType {
		return AssetType.CSS_FILE;
	}

	async update(assetPath: string, _content: string): Promise<boolean> {
		// Find linked CSS files that match the asset path
		const linkElements = document.querySelectorAll(
			'link[rel="stylesheet"]'
		) as NodeListOf<HTMLLinkElement>;

		for (const link of linkElements) {
			if (link.href.includes(assetPath.replace(/^\/+/, ''))) {
				// Force reload by updating href with cache-busting parameter
				const url = new URL(link.href);
				url.searchParams.set('t', Date.now().toString());
				link.href = url.toString();
				console.log('[HMR] ✅ Reloaded CSS file:', assetPath);
				return true;
			}
		}

		return false;
	}
}

/**
 * JavaScript File Handler
 */
class JSFileHandler implements AssetHandler {
	canHandle(assetPath: string): boolean {
		return assetPath.endsWith('.js') || assetPath.endsWith('.ts');
	}

	getAssetType(): AssetType {
		return AssetType.JS_FILE;
	}

	async update(assetPath: string, _content: string): Promise<boolean> {
		// For JS files, we typically need to reload the page or use module replacement
		// This is a basic implementation - could be enhanced with module replacement
		console.log(
			'[HMR] 🔄 JS file changed, consider page reload:',
			assetPath
		);

		// For now, just log - in a full implementation, you might:
		// 1. Try to replace ES modules
		// 2. Reload specific scripts
		// 3. Trigger a page reload as fallback

		return true;
	}
}

/**
 * Main HMR Client Class
 */
export class HMRClient {
	private lastModified: Record<string, number> = {};
	private pollingInterval?: number;
	private isRunning = false;
	private handlers: AssetHandler[] = [];

	constructor(private config: HMRConfig) {
		this.setupHandlers();
		this.storeGlobalConfig();
	}

	/**
	 * Initialize and start the HMR client
	 */
	static initialize(config: HMRConfig): HMRClient {
		console.log('[DevServer] Initializing HMR client');
		const client = new HMRClient(config);
		client.start();
		console.log('[DevServer] HMR client initialized');
		return client;
	}

	/**
	 * Start HMR polling
	 */
	start(): void {
		if (this.isRunning) {
			console.warn('[HMR] Client is already running');
			return;
		}

		console.log('[DevServer] Starting HMR with polling');
		this.isRunning = true;
		this.setupPolling();
	}

	/**
	 * Stop HMR polling
	 */
	stop(): void {
		if (!this.isRunning) {
			return;
		}

		console.log('[DevServer] Stopping HMR');
		this.isRunning = false;

		if (this.pollingInterval) {
			clearInterval(this.pollingInterval);
			this.pollingInterval = undefined;
		}
	}

	/**
	 * Pause HMR polling
	 */
	pause(): void {
		if (this.pollingInterval) {
			clearInterval(this.pollingInterval);
			this.pollingInterval = undefined;
		}
		console.log('[DevServer] HMR polling paused');
	}

	/**
	 * Resume HMR polling
	 */
	resume(): void {
		if (this.isRunning && !this.pollingInterval) {
			this.setupPolling();
			console.log('[DevServer] HMR polling resumed');
		}
	}

	/**
	 * Get the current configuration
	 */
	getConfig(): HMRConfig {
		return { ...this.config };
	}

	/**
	 * Update configuration
	 */
	updateConfig(newConfig: Partial<HMRConfig>): void {
		this.config = { ...this.config, ...newConfig };
		this.storeGlobalConfig();

		// Restart polling with new interval if changed
		if (newConfig.pollingInterval && this.isRunning) {
			this.pause();
			this.resume();
		}
	}

	private setupHandlers(): void {
		this.handlers = [
			new InlineCSSHandler(this.config),
			new CSSFileHandler(),
			new JSFileHandler(),
		];
	}

	private storeGlobalConfig(): void {
		(window as any).__VITE_INLINE_ASSETS_CONFIG__ = {
			blockAssets: Array.from(this.config.blockAssets.entries()),
			blockNamespace: this.config.blockNamespace,
			pollingInterval: this.config.pollingInterval,
			viteServerUrl: this.config.viteServerUrl,
		};
	}

	private setupPolling(): void {
		const pollForChanges = async (): Promise<void> => {
			if (!this.isRunning) return;

			try {
				const viteServerUrl = this.getViteServerUrl();
				const statusUrl = `${viteServerUrl}/__vite_inline_content/status`;
				const response = await fetch(statusUrl);

				if (response.ok) {
					const status: Record<string, number> =
						await response.json();
					const changes: AssetChange[] = [];

					// Collect all changes first
					for (const [asset, modified] of Object.entries(status)) {
						if (
							this.lastModified[asset] &&
							this.lastModified[asset] !== modified
						) {
							const content = await this.fetchAssetContent(asset);
							if (content !== null) {
								const assetType =
									this.determineAssetType(asset);
								changes.push({
									path: asset,
									content,
									type: assetType,
								});
							}
						}
						this.lastModified[asset] = modified;
					}

					// Process all changes
					await this.processChanges(changes);
				}
			} catch (error) {
				// Silently fail for polling to avoid console spam
			}
		};

		this.pollingInterval = window.setInterval(
			pollForChanges,
			this.config.pollingInterval || 500
		);
	}

	private async fetchAssetContent(assetPath: string): Promise<string | null> {
		try {
			const viteServerUrl = this.getViteServerUrl();
			const contentUrl = `${viteServerUrl}/__vite_inline_content/${assetPath}`;
			const response = await fetch(contentUrl);

			return response.ok ? await response.text() : null;
		} catch (error) {
			console.warn(
				'[HMR] Failed to fetch content for:',
				assetPath,
				error
			);
			return null;
		}
	}

	private async processChanges(changes: AssetChange[]): Promise<void> {
		for (const change of changes) {
			const handler = this.handlers.find((h) => h.canHandle(change.path));

			if (handler) {
				try {
					await handler.update(change.path, change.content);
				} catch (error) {
					console.warn(
						'[HMR] Failed to update asset:',
						change.path,
						error
					);
				}
			} else {
				console.warn('[HMR] No handler found for asset:', change.path);
			}
		}
	}

	private determineAssetType(assetPath: string): AssetType {
		if (assetPath.endsWith('.css')) {
			// Determine if it's inline CSS or file CSS based on context
			// For now, default to inline CSS
			return AssetType.INLINE_CSS;
		}

		if (assetPath.endsWith('.js') || assetPath.endsWith('.ts')) {
			return AssetType.JS_FILE;
		}

		return AssetType.OTHER;
	}

	private getViteServerUrl(): string {
		if (this.config.viteServerUrl) {
			return this.config.viteServerUrl;
		}

		// Auto-detect based on current location
		if (location.port === '5173') {
			return '';
		}

		// Check if we're on a Local by Flywheel or custom domain setup
		if (
			location.hostname.includes('.local') ||
			location.hostname.includes('.test') ||
			location.hostname.includes('.ddev.site')
		) {
			const protocol = location.protocol;
			return `${protocol}//${location.hostname}:5173`;
		}

		// Default fallback for localhost
		const protocol = location.protocol;
		return `${protocol}//${location.hostname}:5173`;
	}
}
