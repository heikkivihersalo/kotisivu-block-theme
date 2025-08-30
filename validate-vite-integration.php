<?php
/**
 * Vite Integration Validation Script
 * 
 * This script validates that DevServer and ManifestResolver are properly
 * configured and working with a running Vite development server.
 */

require_once __DIR__ . '/vendor/autoload.php';

use App\Services\Vite\DevServer;
use App\Services\Vite\ManifestResolver;

// WordPress function fallback for testing
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

echo "🚀 Vite Integration Validation\n";
echo "================================\n\n";

// Test 1: ManifestResolver validation
echo "📋 Testing ManifestResolver...\n";
try {
    $manifest = new ManifestResolver();
    $manifestPath = __DIR__ . '/build/block-manifest.php';
    
    if (!file_exists($manifestPath)) {
        echo "❌ Block manifest file not found at: $manifestPath\n";
        exit(1);
    }
    
    $manifest->setManifest($manifestPath);
    
    echo "✅ ManifestResolver initialized successfully\n";
    echo "✅ Block manifest loaded from: $manifestPath\n";
    
    // Test block manifest detection
    if ($manifest->isBlockManifest()) {
        echo "✅ Correctly detected as block manifest\n";
    } else {
        echo "❌ Failed to detect as block manifest\n";
    }
    
    // Test block names
    $blockNames = $manifest->getBlockNames();
    echo "✅ Found " . count($blockNames) . " blocks in manifest\n";
    
    // Test specific block
    $testBlock = $manifest->getByBlockName('heading');
    if ($testBlock) {
        echo "✅ Successfully retrieved 'heading' block data\n";
        echo "   - Name: " . $testBlock['name'] . "\n";
        echo "   - Title: " . $testBlock['title'] . "\n";
    } else {
        echo "❌ Failed to retrieve 'heading' block data\n";
    }
    
} catch (Exception $e) {
    echo "❌ ManifestResolver error: " . $e->getMessage() . "\n";
    exit(1);
}

echo "\n";

// Test 2: DevServer validation
echo "🖥️  Testing DevServer...\n";
try {
    // Get configuration from environment
    $host = $_ENV['VITE_DEV_SERVER_HOST'] ?? 'https://block-theme.local';
    $port = (int) ($_ENV['VITE_DEV_SERVER_PORT'] ?? 5173);
    
    $devServer = new DevServer($host, $manifest);
    $devServer->setPort($port);
    
    echo "✅ DevServer initialized successfully\n";
    echo "✅ Host: " . $devServer->getServerHost() . "\n";
    echo "✅ Port: " . $devServer->getServerPort() . "\n";
    echo "✅ Server URL: " . $devServer->getServerUrl() . "\n";
    
    // Test URL generation
    echo "✅ Client URL: " . $devServer->getClientUrl() . "\n";
    echo "✅ Config URL: " . $devServer->getConfigUrl() . "\n";
    
} catch (Exception $e) {
    echo "❌ DevServer error: " . $e->getMessage() . "\n";
    exit(1);
}

echo "\n";

// Test 3: Live Vite Server Connection
echo "🌐 Testing Vite Server Connection...\n";
try {
    // Test if Vite client is active
    $isClientActive = $devServer->isClientActive();
    if ($isClientActive) {
        echo "✅ Vite client is active and responding\n";
    } else {
        echo "❌ Vite client is not responding\n";
        echo "   Make sure Vite dev server is running: npm run dev\n";
    }
    
    // Test if Vite config is active
    $isConfigActive = $devServer->isConfigActive();
    if ($isConfigActive) {
        echo "✅ Vite configuration endpoint is active\n";
        
        // Get and display config
        $config = $devServer->getConfig();
        if ($config) {
            echo "✅ Retrieved Vite configuration:\n";
            echo "   - Base: " . ($config['base'] ?? 'not set') . "\n";
            echo "   - Source Dir: " . ($config['srcDir'] ?? 'not set') . "\n";
            echo "   - Output Dir: " . ($config['outDir'] ?? 'not set') . "\n";
            echo "   - CSS Extension: " . ($config['css'] ?? 'not set') . "\n";
        }
    } else {
        echo "❌ Vite configuration endpoint is not responding\n";
        echo "   Make sure your Vite config includes the WordPress plugin\n";
    }
    
} catch (Exception $e) {
    echo "❌ Vite server connection error: " . $e->getMessage() . "\n";
}

echo "\n";

// Test 4: Integration Tests
echo "🔄 Testing DevServer + ManifestResolver Integration...\n";
try {
    // Test block info retrieval
    $blockInfo = $devServer->getBlockInfo('heading');
    if ($blockInfo) {
        echo "✅ DevServer can retrieve block info via ManifestResolver\n";
        echo "   - Block: " . $blockInfo['name'] . "\n";
    } else {
        echo "❌ DevServer cannot retrieve block info\n";
    }
    
    // Test block existence check
    if ($devServer->hasBlock('heading')) {
        echo "✅ DevServer can check block existence\n";
    } else {
        echo "❌ DevServer block existence check failed\n";
    }
    
    // Test non-existent block
    if (!$devServer->hasBlock('non-existent-block')) {
        echo "✅ DevServer correctly identifies non-existent blocks\n";
    } else {
        echo "❌ DevServer incorrectly identifies non-existent blocks\n";
    }
    
} catch (Exception $e) {
    echo "❌ Integration test error: " . $e->getMessage() . "\n";
}

echo "\n";

// Test 5: WordPress Integration Setup
echo "⚙️  Testing WordPress Integration Setup...\n";

// Check if DevServer is set up in bootstrap
$bootstrapPath = __DIR__ . '/bootstrap/theme.php';
if (file_exists($bootstrapPath)) {
    $bootstrapContent = file_get_contents($bootstrapPath);
    
    if (strpos($bootstrapContent, 'DevServer') !== false) {
        echo "✅ DevServer is configured in bootstrap/theme.php\n";
    } else {
        echo "❌ DevServer not found in bootstrap configuration\n";
    }
    
    if (strpos($bootstrapContent, 'ManifestResolver') !== false) {
        echo "✅ ManifestResolver is configured in bootstrap/theme.php\n";
    } else {
        echo "❌ ManifestResolver not found in bootstrap configuration\n";
    }
    
    if (strpos($bootstrapContent, 'WP_DEBUG') !== false) {
        echo "✅ Development mode check is in place\n";
    } else {
        echo "⚠️  No development mode check found\n";
    }
} else {
    echo "❌ Bootstrap file not found: $bootstrapPath\n";
}

echo "\n";

// Test 6: Environment Configuration
echo "🔧 Testing Environment Configuration...\n";

$envPath = __DIR__ . '/.env';
if (file_exists($envPath)) {
    echo "✅ Environment file exists\n";
    
    // Load environment variables if not already loaded
    if (!isset($_ENV['VITE_DEV_SERVER_HOST'])) {
        $envContent = file_get_contents($envPath);
        $lines = explode("\n", $envContent);
        foreach ($lines as $line) {
            if (preg_match('/^([^#=]+)=(.*)$/', trim($line), $matches)) {
                $key = trim($matches[1]);
                $value = trim($matches[2], '"\'');
                $_ENV[$key] = $value;
            }
        }
    }
    
    if (isset($_ENV['VITE_DEV_SERVER_HOST'])) {
        echo "✅ VITE_DEV_SERVER_HOST configured: " . $_ENV['VITE_DEV_SERVER_HOST'] . "\n";
    } else {
        echo "❌ VITE_DEV_SERVER_HOST not configured\n";
    }
    
    if (isset($_ENV['VITE_DEV_SERVER_PORT'])) {
        echo "✅ VITE_DEV_SERVER_PORT configured: " . $_ENV['VITE_DEV_SERVER_PORT'] . "\n";
    } else {
        echo "❌ VITE_DEV_SERVER_PORT not configured\n";
    }
} else {
    echo "❌ Environment file not found: $envPath\n";
}

echo "\n";

// Summary
echo "📊 Validation Summary\n";
echo "=====================\n";

$allGood = true;

if ($manifest && $manifest->isBlockManifest()) {
    echo "✅ ManifestResolver: Working correctly\n";
} else {
    echo "❌ ManifestResolver: Issues detected\n";
    $allGood = false;
}

if ($devServer) {
    echo "✅ DevServer: Initialized correctly\n";
} else {
    echo "❌ DevServer: Issues detected\n";
    $allGood = false;
}

if (isset($isClientActive) && $isClientActive) {
    echo "✅ Vite Dev Server: Connected and active\n";
} else {
    echo "❌ Vite Dev Server: Not responding (make sure it's running)\n";
    $allGood = false;
}

if (isset($isConfigActive) && $isConfigActive) {
    echo "✅ Vite Configuration: Available and accessible\n";
} else {
    echo "❌ Vite Configuration: Not accessible\n";
    $allGood = false;
}

echo "\n";

if ($allGood) {
    echo "🎉 All systems are working correctly!\n";
    echo "Your DevServer and ManifestResolver setup is ready for development.\n";
    exit(0);
} else {
    echo "⚠️  Some issues were detected. Please review the output above.\n";
    exit(1);
}
