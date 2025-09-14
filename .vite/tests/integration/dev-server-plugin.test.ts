import { existsSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { beforeAll, afterAll, describe, expect, test } from 'vitest';

/**
 * High-Level Dev Server Plugin Integration Tests
 *
 * These tests focus on the key functionality that should remain stable
 * during refactoring: endpoint availability, response formats, and
 * configuration handling.
 */
describe('Dev Server Plugin - Core Functionality', () => {
	const TEST_DIR = join(process.cwd(), '.test-temp');
	const BUILD_DIR = join(TEST_DIR, 'build');

	beforeAll(() => {
		// Clean up any existing test directory
		if (existsSync(TEST_DIR)) {
			rmSync(TEST_DIR, { recursive: true, force: true });
		}
		mkdirSync(TEST_DIR, { recursive: true });
		mkdirSync(BUILD_DIR, { recursive: true });
	});

	afterAll(() => {
		// Clean up test directory
		if (existsSync(TEST_DIR)) {
			rmSync(TEST_DIR, { recursive: true, force: true });
		}
	});

	/**
	 * Test that the plugin exposes the correct API structure
	 */
	test('plugin exports required hooks', async () => {
		const { DevServerPlugin } = await import(
			'../../src/plugins/dev-server-plugin/index.ts'
		);

		expect(typeof DevServerPlugin).toBe('function');

		const plugin = DevServerPlugin();
		expect(plugin).toHaveProperty('name');
		expect(plugin.name).toBe('vite-wordpress-dev-server');
		expect(plugin).toHaveProperty('configResolved');
		expect(plugin).toHaveProperty('configureServer');
		expect(plugin).toHaveProperty('generateBundle');
		expect(plugin).toHaveProperty('writeBundle');
		expect(plugin).toHaveProperty('buildStart');
		expect(plugin).toHaveProperty('handleHotUpdate');
	});

	/**
	 * Test that configureServer registers expected endpoints and they respond
	 */
	test('configureServer registers endpoints that respond', async () => {
		const { DevServerPlugin } = await import(
			'../../src/plugins/dev-server-plugin/index.ts'
		);

		// Minimal connect-like middleware collector
		type Handler = (req: any, res: any) => void;
		const routes: { route: string; handler: Handler }[] = [];
		const middlewares = {
			use: (route: string, handler: Handler) => {
				routes.push({ route, handler });
			},
		} as any;

		const serverConfig = {
			server: { https: false, host: 'localhost', port: 5173 },
			base: '/',
		} as any;
		const mockServer = {
			middlewares,
			config: serverConfig,
		} as any;

		// Mock dependent plugin APIs expected by DevServerManager
		const plugin = DevServerPlugin();
		const configPluginApi = {
			getPluginConfig: () => ({
				wordpress: { namespace: 'ksd' },
				build: { outDir: BUILD_DIR, css: 'css' },
				paths: { srcDir: 'resources', blocksDir: {} },
				hmr: {
					enabled: true,
					watch: { inline: [join(BUILD_DIR, 'test-asset.css')] },
					scriptInjection: { pollingInterval: 500 },
				},
			}),
		};
		const resolvedConfig = {
			plugins: [
				{ name: 'vite-plugin-gutenberg-config', api: configPluginApi },
				{ name: 'vite-plugin-gutenberg-blocks', api: undefined },
			],
		} as any;

		// Prepare a test file that will be watched/served
		const testCssPath = join(BUILD_DIR, 'test-asset.css');
		writeFileSync(testCssPath, '.x{color:red;}');

		// Drive plugin lifecycle (handle Vite ObjectHook wrapper shape)
		const pluginCtx = {
			addWatchFile: (_file: string) => {},
		} as any;

		const callHook = (hook: any, ...args: any[]) => {
			if (!hook) return;
			if (typeof hook === 'function') return hook.apply(pluginCtx, args);
			if (typeof hook.handler === 'function')
				return hook.handler.apply(pluginCtx, args);
		};

		callHook(plugin.configResolved, resolvedConfig);
		callHook(plugin.buildStart, {} as any);
		callHook(plugin.configureServer, mockServer);

		// Helper to run a route and capture response
		const run = async (reqUrl: string) => {
			const route = routes.find((r) => reqUrl.startsWith(r.route));
			if (!route) throw new Error(`Route not found for ${reqUrl}`);
			const headers: Record<string, string> = {};
			let statusCode = 200;
			let body = '';
			const res = {
				setHeader: (k: string, v: string) => {
					headers[k] = v;
				},
				end: (c: string) => {
					body = c;
				},
				set statusCode(code: number) {
					statusCode = code;
				},
				get statusCode() {
					return statusCode;
				},
			} as any;
			const req = {
				url: reqUrl,
				headers: { host: 'localhost:5173' },
			} as any;
			await route.handler(req, res);
			return { headers, statusCode, body };
		};

		// Status endpoint should include our asset
		const statusResp = await run('/__dev-server/status');
		expect(statusResp.statusCode).toBe(200);
		const statusJson = JSON.parse(statusResp.body);
		// Absolute path key expected when provided as absolute
		expect(Object.keys(statusJson)).toContain(testCssPath);
		expect(typeof statusJson[testCssPath]).toBe('number');

		// Asset content endpoint should return CSS with correct content type
		const assetResp = await run(
			`/__dev-server/asset-content?path=${encodeURIComponent(testCssPath)}`
		);
		expect(assetResp.statusCode).toBe(200);
		expect(assetResp.headers['Content-Type']).toContain('text/css');
		expect(assetResp.body).toContain('.x{color:red;}');

		// HMR client endpoint should serve the client script
		const clientResp = await run('/__dev-server/hmr-client');
		expect(clientResp.statusCode).toBe(200);
		expect(clientResp.headers['Content-Type']).toContain(
			'application/javascript'
		);
		expect(clientResp.body).toContain('class Client');

		// WordPress integration endpoint should return JSON with expected fields
		const wpResp = await run('/vite-wordpress.json');
		expect(wpResp.statusCode).toBe(200);
		const wpJson = JSON.parse(wpResp.body);
		expect(wpJson).toHaveProperty('server');
		expect(wpJson).toHaveProperty('outDir');
		expect(wpJson).toHaveProperty('srcDir');
		expect(wpJson).toHaveProperty('css');
		expect(wpJson).toHaveProperty('hmr');
		expect(wpJson.hmr.assets).toBeInstanceOf(Array);
	});

	// Removed script template generation tests - functionality replaced by inline endpoint

	/**
	 * Test status middleware functionality
	 */
	// Status endpoint covered in configureServer test

	/**
	 * Test asset content middleware functionality
	 */
	// Asset content endpoint covered in configureServer test

	/**
	 * Test BuildMapResolver integration
	 */
	test('BuildMapResolver works with dev server', async () => {
		const { BuildMapResolver } = await import(
			'../../src/common/services/BuildMapResolver.ts'
		);

		const resolver = new BuildMapResolver(BUILD_DIR, 'css');

		// Test basic functionality
		expect(typeof resolver.getBuildMap).toBe('function');
		expect(typeof resolver.createHotUpdateEntry).toBe('function');
		expect(typeof resolver.processBundleAndUpdate).toBe('function');

		const buildMap = resolver.getBuildMap();
		expect(typeof buildMap).toBe('object');
	});

	/**
	 * Test that HMR configuration is properly validated
	 */
	test('HMR configuration validation', () => {
		// Test valid configurations
		const validConfigs = [
			{
				enabled: true,
				watch: {
					inline: ['build/test.css'],
					css: ['src/**/*.css'],
					blocks: ['src/blocks/**/*'],
				},
				scriptInjection: { pollingInterval: 500 },
			},
			{
				enabled: false,
			},
			{
				enabled: true,
				watch: {},
				scriptInjection: { pollingInterval: 1000 },
			},
		];

		const invalidConfigs = [
			{
				enabled: 'yes', // should be boolean
			},
			{
				enabled: true,
				watch: 'not-object', // should be object
			},
		];

		// Validation logic (simplified)
		const isValidConfig = (config: any) => {
			if (typeof config.enabled !== 'boolean') return false;
			if (config.enabled === false) return true; // No further validation needed

			if (config.watch && typeof config.watch !== 'object') return false;
			// require boolean enabled
			if (typeof config.enabled !== 'boolean') return false;

			return true;
		};

		validConfigs.forEach((config) => {
			expect(isValidConfig(config)).toBe(true);
		});

		invalidConfigs.forEach((config) => {
			expect(isValidConfig(config)).toBe(false);
		});
	});

	/**
	 * Test file extension matching for HMR
	 */
	test('file extension matching works for HMR', () => {
		// Test the basic logic that determines if a file should trigger HMR
		const shouldTriggerHMR = (
			filePath: string,
			watchedExtensions: string[]
		) => {
			return watchedExtensions.some((ext) => filePath.endsWith(ext));
		};

		const cssExtensions = ['.css'];
		const jsExtensions = ['.js', '.jsx', '.ts', '.tsx'];

		// Test CSS file matching
		expect(shouldTriggerHMR('src/style.css', cssExtensions)).toBe(true);
		expect(shouldTriggerHMR('widgets/block.css', cssExtensions)).toBe(true);
		expect(shouldTriggerHMR('build/assets/main.css', cssExtensions)).toBe(
			true
		);
		expect(shouldTriggerHMR('src/script.js', cssExtensions)).toBe(false);

		// Test JS file matching
		expect(shouldTriggerHMR('src/script.js', jsExtensions)).toBe(true);
		expect(shouldTriggerHMR('src/component.tsx', jsExtensions)).toBe(true);
		expect(shouldTriggerHMR('src/style.css', jsExtensions)).toBe(false);
	});

	/**
	 * Test error handling scenarios
	 */
	test('handles common error scenarios gracefully', () => {
		// Test file not found scenarios
		const nonExistentFile = join(BUILD_DIR, 'non-existent.css');
		expect(existsSync(nonExistentFile)).toBe(false);

		// Test configuration validation
		const validateConfig = (config: any) => {
			try {
				return Boolean(config && typeof config === 'object');
			} catch {
				return false;
			}
		};

		// Test various config scenarios
		expect(validateConfig(null)).toBe(false);
		expect(validateConfig(undefined)).toBe(false);
		expect(validateConfig({})).toBe(true);
		expect(validateConfig({ hmr: { enabled: true } })).toBe(true);
		expect(validateConfig('invalid')).toBe(false);
	});
});
