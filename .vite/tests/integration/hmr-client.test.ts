import { beforeEach, describe, expect, test, vi } from 'vitest';
import { HMRClient } from '../../src/plugins/dev-server-plugin/client/hmr-client.js';

/**
 * Integration tests for HMR client-side functionality
 *
 * These tests verify that the client-side HMR script correctly handles
 * different asset types with the new class-based architecture.
 */
describe('HMR Client Integration', () => {
	let hmrClient: HMRClient;

	beforeEach(() => {
		// Mock global objects
		global.document = {
			getElementById: vi.fn(() => null),
			querySelectorAll: vi.fn(() => []),
		} as any;
		global.fetch = vi.fn();
		global.console = {
			...console,
			log: vi.fn(),
			warn: vi.fn(),
			error: vi.fn(),
		};
		global.location = {
			hostname: 'localhost',
			port: '3000',
			protocol: 'http:',
		} as any;
		global.window = {
			setInterval: vi.fn(() => 1),
			clearInterval: vi.fn(),
		} as any;

		// Mock setInterval for polling
		vi.useFakeTimers();

		// Initialize HMR client for tests
		const mockConfig = {
			blockAssets: new Map([
				[
					'test-block',
					{
						name: 'ksd/test-block',
						slug: 'test-block',
						blockSlug: 'test-block',
						sourcePath: '/src/style.css',
						buildPath: '/build/style.css',
					},
				],
			]),
			blockNamespace: 'ksd',
			pollingInterval: 500,
			viteServerUrl: 'http://localhost:5173',
		};

		hmrClient = new HMRClient(mockConfig);
	});

	/**
	 * Test HMR Client initialization
	 */
	test('initializes HMR client correctly', () => {
		expect(hmrClient).toBeDefined();
		expect(hmrClient.getConfig()).toMatchObject({
			blockNamespace: 'ksd',
			pollingInterval: 500,
			viteServerUrl: 'http://localhost:5173',
		});
	});

	/**
	 * Test client start/stop functionality
	 */
	test('client can be started and stopped', () => {
		expect(() => hmrClient.start()).not.toThrow();
		expect(() => hmrClient.stop()).not.toThrow();
		expect(() => hmrClient.pause()).not.toThrow();
		expect(() => hmrClient.resume()).not.toThrow();
	});

	/**
	 * Test configuration updates
	 */
	test('configuration can be updated', () => {
		const newConfig = {
			pollingInterval: 1000,
			blockNamespace: 'new-namespace',
		};

		hmrClient.updateConfig(newConfig);
		const config = hmrClient.getConfig();

		expect(config.pollingInterval).toBe(1000);
		expect(config.blockNamespace).toBe('new-namespace');
	});

	/**
	 * Test Vite server URL detection
	 */
	test('detects Vite server URL correctly', () => {
		// Test with different location setups
		const testCases = [
			{
				location: {
					hostname: 'localhost',
					port: '5173',
					protocol: 'http:',
				},
				expected: '',
			},
			{
				location: {
					hostname: 'mysite.local',
					port: '3000',
					protocol: 'http:',
				},
				expected: 'http://mysite.local:5173',
			},
			{
				location: {
					hostname: 'test.test',
					port: '8080',
					protocol: 'https:',
				},
				expected: 'https://test.test:5173',
			},
		];

		testCases.forEach((testCase) => {
			global.location = testCase.location as any;
			const client = new HMRClient({
				blockAssets: new Map(),
				blockNamespace: 'test',
				pollingInterval: 500,
			});

			// Access private method through any cast for testing
			const url = (client as any).getViteServerUrl();
			expect(url).toBe(testCase.expected);
		});
	});

	/**
	 * Test asset type determination
	 */
	test('determines asset types correctly', () => {
		const testCases = [
			{ path: 'styles/main.css', expectedType: 'inline-css' },
			{ path: 'scripts/main.js', expectedType: 'js-file' },
			{ path: 'components/Button.ts', expectedType: 'js-file' },
			{ path: 'images/logo.png', expectedType: 'other' },
		];

		testCases.forEach((testCase) => {
			const assetType = (hmrClient as any).determineAssetType(
				testCase.path
			);
			expect(assetType).toBe(testCase.expectedType);
		});
	});

	/**
	 * Test asset content fetching
	 */
	test('fetches asset content correctly', async () => {
		const mockFetch = vi.mocked(fetch);

		// Mock successful response
		mockFetch.mockResolvedValueOnce({
			ok: true,
			text: async () => '.test { color: blue; }',
		} as Response);

		const content = await (hmrClient as any).fetchAssetContent('test.css');
		expect(content).toBe('.test { color: blue; }');

		// Mock failed response
		mockFetch.mockResolvedValueOnce({
			ok: false,
		} as Response);

		const failedContent = await (hmrClient as any).fetchAssetContent(
			'test.css'
		);
		expect(failedContent).toBeNull();
	});

	/**
	 * Test error handling in polling
	 */
	test('handles polling errors gracefully', async () => {
		const mockFetch = vi.mocked(fetch);

		// Mock network error
		mockFetch.mockRejectedValue(new Error('Network error'));

		// Start client and let it attempt to poll
		hmrClient.start();

		// Advance timers to trigger polling
		vi.advanceTimersByTime(1000);

		// Should not throw errors
		expect(() => vi.advanceTimersByTime(1000)).not.toThrow();
	});

	/**
	 * Test global configuration storage
	 */
	test('stores global configuration correctly', () => {
		// Check that global config is set
		expect(
			(global.window as any).__VITE_INLINE_ASSETS_CONFIG__
		).toBeDefined();
		expect(
			(global.window as any).__VITE_INLINE_ASSETS_CONFIG__.blockNamespace
		).toBe('ksd');
	});
});
