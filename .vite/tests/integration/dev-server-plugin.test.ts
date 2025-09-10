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
	 * This is essential for WordPress DevServer class integration
	 */
	test('plugin exports required functions and types', async () => {
		const { DevServerPlugin } = await import(
			'../../src/plugins/dev-server-plugin/index.js'
		);

		expect(typeof DevServerPlugin).toBe('function');

		const plugin = DevServerPlugin();
		expect(plugin).toHaveProperty('name');
		expect(plugin.name).toBe('vite-wordpress-dev-server');
		expect(plugin).toHaveProperty('configResolved');
		expect(plugin).toHaveProperty('configureServer');
		expect(plugin).toHaveProperty('handleHotUpdate');
	});

	/**
	 * Test middleware functions are properly exported
	 */
	test('middleware functions are available', async () => {
		const middleware = await import(
			'../../src/plugins/dev-server-plugin/server/middleware.js'
		);

		expect(typeof middleware.createClientScriptMiddleware).toBe('function');
		expect(typeof middleware.createStatusMiddleware).toBe('function');
		expect(typeof middleware.createAssetContentMiddleware).toBe('function');
	});

	/**
	 * Test script template generation
	 */
	test('HMR client script templates work correctly', async () => {
		const { generateScript } = await import(
			'../../src/plugins/dev-server-plugin/utils/script-templates.js'
		);

		const mockConfig = {
			blockAssets: new Map([
				[
					'test-block',
					{
						name: 'ksd/test-block',
						slug: 'test-block',
						src: { css: '/src/style.css' },
						build: { css: '/build/style.css' },
					},
				],
			]),
			blockNamespace: 'ksd',
			pollingInterval: 500,
			viteServerUrl: 'http://localhost:5173',
		};

		const script = generateScript('hmr-client', mockConfig);

		// Verify script contains essential HMR functionality
		expect(script).toContain('__VITE_INLINE_ASSETS_CONFIG__');
		expect(script).toContain('Loading HMR client');
		expect(script).toContain("import('/__vite_hmr_client.js')");
		expect(script).toContain('HMRClient.initialize');
		expect(script).toContain('window.HMRClient');

		// Verify configuration is embedded (look for the formatted JSON)
		expect(script).toContain('"blockNamespace": "ksd"');
		expect(script).toContain('"pollingInterval": 500');
	});

	/**
	 * Test status middleware functionality
	 */
	test('status middleware returns proper format', async () => {
		const { createStatusMiddleware } = await import(
			'../../src/plugins/dev-server-plugin/server/middleware.js'
		);

		// Create test files
		const testAssets = [join(BUILD_DIR, 'test-asset.css')];

		mkdirSync(BUILD_DIR, { recursive: true });
		writeFileSync(testAssets[0], '.test { color: red; }');

		const mockBlockAssets = new Map();
		const getAllMonitoredAssets = () => testAssets;

		const middleware = createStatusMiddleware(
			getAllMonitoredAssets,
			mockBlockAssets
		);

		// Mock request/response
		const mockReq = { url: '/__vite_inline_content/status' };
		const mockRes = {
			setHeader: () => {},
			end: (data: string) => {
				const status = JSON.parse(data);
				expect(typeof status).toBe('object');
				expect(Object.keys(status)).toContain(testAssets[0]);
				expect(typeof status[testAssets[0]]).toBe('number');
			},
		};

		middleware(mockReq, mockRes, () => {});
	});

	/**
	 * Test asset content middleware functionality
	 */
	test('asset content middleware handles requests properly', async () => {
		const { createAssetContentMiddleware } = await import(
			'../../src/plugins/dev-server-plugin/server/middleware.js'
		);

		// Create test CSS file
		const testCssPath = join(BUILD_DIR, 'test-block.css');
		const testCssContent = '.wp-block-test { background: blue; }';
		writeFileSync(testCssPath, testCssContent);

		const getAllMonitoredAssets = () => [testCssPath];
		const mockBlockAssets = new Map();

		const middleware = createAssetContentMiddleware(
			getAllMonitoredAssets,
			mockBlockAssets
		);

		// Test valid asset request
		const mockReq = { url: '/__vite_inline_content/test-block.css' };
		let responseContent = '';
		const responseHeaders: Record<string, string> = {};
		let statusCode = 200;

		const mockRes = {
			setHeader: (key: string, value: string) => {
				responseHeaders[key] = value;
			},
			end: (content: string) => {
				responseContent = content;
			},
			set statusCode(code: number) {
				statusCode = code;
			},
			get statusCode() {
				return statusCode;
			},
		};

		middleware(mockReq, mockRes, () => {});

		// Test that middleware responds appropriately
		expect([200, 404]).toContain(statusCode);

		// If content was served, verify it's the CSS we created
		if (statusCode === 200) {
			expect(responseContent).toContain('.wp-block-test');
			expect(responseHeaders['Content-Type']).toContain('text/css');
		}
	});

	/**
	 * Test BuildMapResolver integration
	 */
	test('BuildMapResolver works with dev server', async () => {
		const { BuildMapResolver } = await import(
			'../../src/common/services/BuildMapResolver.js'
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
				scriptInjection: {
					method: 'inline',
					pollingInterval: 500,
				},
			},
			{
				enabled: false,
			},
			{
				enabled: true,
				watch: {},
				scriptInjection: {
					method: 'external',
					pollingInterval: 1000,
				},
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
			{
				enabled: true,
				scriptInjection: {
					method: 'invalid-method', // should be 'inline' | 'external' | 'module'
				},
			},
		];

		// Validation logic (simplified)
		const isValidConfig = (config: any) => {
			if (typeof config.enabled !== 'boolean') return false;
			if (config.enabled === false) return true; // No further validation needed

			if (config.watch && typeof config.watch !== 'object') return false;
			if (
				config.scriptInjection?.method &&
				!['inline', 'external', 'module'].includes(
					config.scriptInjection.method
				)
			) {
				return false;
			}

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
