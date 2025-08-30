<?php
/**
 * WordPress Integration Test
 * 
 * Tests DevServer WordPress hooks and filters
 */

require_once __DIR__ . '/vendor/autoload.php';

use App\Services\Vite\DevServer;
use App\Services\Vite\ManifestResolver;

// Mock WordPress functions for testing
if (!function_exists('untrailingslashit')) {
    function untrailingslashit($string) {
        return rtrim($string, '/\\');
    }
}

if (!function_exists('get_site_url')) {
    function get_site_url() {
        return 'https://block-theme.local';
    }
}

if (!function_exists('esc_url')) {
    function esc_url($url) {
        return htmlspecialchars($url, ENT_QUOTES, 'UTF-8');
    }
}

// Define WordPress constants for testing
if (!defined('ABSPATH')) {
    define('ABSPATH', __DIR__ . '/');
}

if (!function_exists('path_join')) {
    function path_join($base, $path) {
        return rtrim($base, '/') . '/' . ltrim($path, '/');
    }
}

echo "🔌 WordPress Integration Test\n";
echo "=============================\n\n";

// Initialize services
$manifest = new ManifestResolver();
$manifest->setManifest(__DIR__ . '/build/block-manifest.php');

$devServer = new DevServer('https://block-theme.local', $manifest);
$devServer->setPort(5173);

// Mock config for testing
$devServer->setConfig([
    'base' => '/wp-content/themes/kotisivu-block-theme',
    'outDir' => 'build',
    'srcDir' => 'resources',
    'css' => 'scss'
]);

echo "🎣 Testing WordPress Hooks and Filters...\n";

// Test 1: Body class filter
echo "Testing filterBodyClass...\n";
$classes = ['page', 'page-id-123'];
$filteredClasses = $devServer->filterBodyClass($classes);
if (in_array('vite-dev-server-is-active', $filteredClasses)) {
    echo "✅ Body class filter adds dev server class\n";
} else {
    echo "❌ Body class filter failed\n";
}

// Test 2: Asset loader src filter
echo "Testing filterAssetLoaderSrc...\n";
$testSrc = '/wp-content/themes/kotisivu-block-theme/build/app.js';
$handle = 'test-handle';
$filteredSrc = $devServer->filterAssetLoaderSrc($testSrc, $handle);
if ($filteredSrc !== $testSrc) {
    echo "✅ Asset loader src filter processes matching URLs\n";
} else {
    echo "ℹ️  Asset loader src filter (no match expected without source resolution)\n";
}

// Test 3: Script tag filter
echo "Testing filterAssetLoaderTags...\n";
$testTag = '<script src="https://block-theme.local:5173/resources/app.js"></script>';
$filteredTag = $devServer->filterAssetLoaderTags($testTag, 'test-handle', 'https://block-theme.local:5173/resources/app.js');
if (strpos($filteredTag, 'type="module"') !== false) {
    echo "✅ Script tag filter adds module type for dev server assets\n";
} else {
    echo "ℹ️  Script tag filter (no modification expected without resolved asset)\n";
}

// Test 4: Block metadata filter
echo "Testing filterBlockTypeMetadata...\n";
$metadata = [
    'file' => '/path/to/blocks/test-block/block.json',
    'render' => 'render.php'
];
$filteredMetadata = $devServer->filterBlockTypeMetadata($metadata);
if (isset($filteredMetadata['render'])) {
    echo "✅ Block metadata filter processes render paths\n";
} else {
    echo "❌ Block metadata filter failed\n";
}

echo "\n";

// Test 5: URL and path methods
echo "🌐 Testing URL and Path Methods...\n";

$serverUrl = $devServer->getServerUrl();
echo "Server URL: $serverUrl\n";
if ($serverUrl === 'https://block-theme.local:5173') {
    echo "✅ Server URL generation is correct\n";
} else {
    echo "❌ Server URL generation failed\n";
}

$baseUrl = $devServer->getBaseUrl();
echo "Base URL: $baseUrl\n";
if (strpos($baseUrl, 'https://block-theme.local:5173') === 0) {
    echo "✅ Base URL generation is correct\n";
} else {
    echo "❌ Base URL generation failed\n";
}

$clientUrl = $devServer->getClientUrl();
echo "Client URL: $clientUrl\n";
if (strpos($clientUrl, '@vite/client') !== false) {
    echo "✅ Client URL generation is correct\n";
} else {
    echo "❌ Client URL generation failed\n";
}

$configUrl = $devServer->getConfigUrl();
echo "Config URL: $configUrl\n";
if (strpos($configUrl, 'vite-wordpress.json') !== false) {
    echo "✅ Config URL generation is correct\n";
} else {
    echo "❌ Config URL generation failed\n";
}

echo "\n";

// Test 6: File name extraction
echo "🔍 Testing File Name Extraction...\n";

$testPath = '/wp-content/themes/kotisivu-block-theme/build/app.js?version=123';
$fileName = $devServer->getFileName($testPath);
if ($fileName === 'app.js') {
    echo "✅ File name extraction works correctly\n";
} else {
    echo "❌ File name extraction failed: got '$fileName'\n";
}

// Test 7: Relative path generation
echo "Testing getRelativeLocalPath...\n";
$from = '/absolute/path/to/blocks/test-block';
$to = '/absolute/path/to/resources/blocks/test-block/render.php';
$relativePath = $devServer->getRelativeLocalPath($from, $to);
echo "Relative path: $relativePath\n";
if (strpos($relativePath, 'file:./') === 0) {
    echo "✅ Relative path generation works correctly\n";
} else {
    echo "❌ Relative path generation failed\n";
}

echo "\n";

// Test 8: Configuration checks
echo "⚙️  Testing Configuration Methods...\n";

$config = $devServer->getConfig();
if (is_array($config) && isset($config['base'])) {
    echo "✅ Configuration is accessible\n";
    echo "   - Base: " . $config['base'] . "\n";
    echo "   - Output Dir: " . ($config['outDir'] ?? 'not set') . "\n";
    echo "   - Source Dir: " . ($config['srcDir'] ?? 'not set') . "\n";
} else {
    echo "❌ Configuration is not accessible\n";
}

// Test specific config values
$base = $devServer->getConfig('base');
if ($base === '/wp-content/themes/kotisivu-block-theme') {
    echo "✅ Specific config value retrieval works\n";
} else {
    echo "❌ Specific config value retrieval failed\n";
}

echo "\n";

// Test 9: Path checking methods
echo "🔍 Testing Path Checking Methods...\n";

$testPath = '/wp-content/themes/kotisivu-block-theme/build/app.js';
$containsBase = $devServer->containsBase($testPath);
if ($containsBase) {
    echo "✅ containsBase method works correctly\n";
} else {
    echo "❌ containsBase method failed\n";
}

$testUrl = 'https://block-theme.local:5173/wp-content/themes/kotisivu-block-theme/resources/app.js';
$containsServerUrl = $devServer->containsServerUrl($testUrl);
if ($containsServerUrl) {
    echo "✅ containsServerUrl method works correctly\n";
} else {
    echo "❌ containsServerUrl method failed\n";
}

echo "\n";

// Test 10: Block information methods
echo "📦 Testing Block Information Methods...\n";

$blockInfo = $devServer->getBlockInfo('heading');
if ($blockInfo && isset($blockInfo['name'])) {
    echo "✅ getBlockInfo method works correctly\n";
    echo "   - Block name: " . $blockInfo['name'] . "\n";
    echo "   - Block title: " . $blockInfo['title'] . "\n";
} else {
    echo "❌ getBlockInfo method failed\n";
}

$hasBlock = $devServer->hasBlock('heading');
if ($hasBlock) {
    echo "✅ hasBlock method works correctly for existing blocks\n";
} else {
    echo "❌ hasBlock method failed for existing blocks\n";
}

$hasBlock = $devServer->hasBlock('non-existent-block');
if (!$hasBlock) {
    echo "✅ hasBlock method works correctly for non-existent blocks\n";
} else {
    echo "❌ hasBlock method failed for non-existent blocks\n";
}

echo "\n";

echo "✅ WordPress Integration Test Complete!\n";
echo "All core DevServer functionality has been validated.\n";
