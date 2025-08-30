<?php

declare(strict_types=1);

/**
 * Standalone test for Vite services without WordPress dependencies
 * This validates the core functionality of DevServer and ManifestResolver
 */

// Include the composer autoloader
require_once __DIR__ . '/vendor/autoload.php';

// Add WordPress function fallbacks for standalone testing
if (!function_exists('untrailingslashit')) {
    function untrailingslashit(string $value): string {
        return rtrim($value, '/\\');
    }
}

if (!defined('ABSPATH')) {
    define('ABSPATH', '/tmp/wordpress/');
}

use App\Services\Vite\DevServer;
use App\Services\Vite\ManifestResolver;

/**
 * Simple test runner
 */
class SimpleTestRunner {
    private int $passed     = 0;
    private int $failed     = 0;
    private array $failures = [];

    public function test(string $name, callable $test): void {
        try {
            $test();
            echo "✅ {$name}\n";
            $this->passed++;
        } catch (\Throwable $e) {
            echo "❌ {$name}: {$e->getMessage()}\n";
            $this->failures[] = $name . ': ' . $e->getMessage();
            $this->failed++;
        }
    }

    public function assert(bool $condition, string $message = 'Assertion failed'): void {
        if (!$condition) {
            throw new \Exception($message);
        }
    }

    public function assertEquals($expected, $actual, string $message = 'Values are not equal'): void {
        if ($expected !== $actual) {
            throw new \Exception("{$message}. Expected: " . var_export($expected, true) . ", Actual: " . var_export($actual, true));
        }
    }

    public function assertInstanceOf(string $expected, $actual, string $message = 'Instance type mismatch'): void {
        if (!($actual instanceof $expected)) {
            throw new \Exception("{$message}. Expected instance of {$expected}, got " . get_class($actual));
        }
    }

    public function assertTrue(bool $condition, string $message = 'Expected true'): void {
        if (!$condition) {
            throw new \Exception($message);
        }
    }

    public function assertFalse(bool $condition, string $message = 'Expected false'): void {
        if ($condition) {
            throw new \Exception($message);
        }
    }

    public function assertIsArray($value, string $message = 'Expected array'): void {
        if (!is_array($value)) {
            throw new \Exception($message);
        }
    }

    public function assertContains($needle, array $haystack, string $message = 'Array does not contain value'): void {
        if (!in_array($needle, $haystack, true)) {
            throw new \Exception($message);
        }
    }

    public function assertCount(int $expected, array $array, string $message = 'Array count mismatch'): void {
        if (count($array) !== $expected) {
            throw new \Exception("{$message}. Expected {$expected}, got " . count($array));
        }
    }

    public function summary(): void {
        echo "\n" . str_repeat('=', 50) . "\n";
        echo "Test Summary:\n";
        echo "Passed: {$this->passed}\n";
        echo "Failed: {$this->failed}\n";
        echo "Total: " . ($this->passed + $this->failed) . "\n";

        if ($this->failed > 0) {
            echo "\nFailures:\n";
            foreach ($this->failures as $failure) {
                echo "- {$failure}\n";
            }
            exit(1);
        } else {
            echo "\n🎉 All tests passed!\n";
            exit(0);
        }
    }
}

// Create test instance
$test = new \SimpleTestRunner();

// Create test manifest
$testManifestPath = sys_get_temp_dir() . '/test-block-manifest.php';
$manifestContent  = '<?php
return [
    "test-block" => [
        "apiVersion" => 3,
        "name" => "ksd/test-block",
        "title" => "Test Block",
        "editorScript" => "file:./index.js",
        "editorStyle" => "file:./index.css",
        "style" => "file:./style-index.css",
        "render" => "file:./render.php"
    ],
    "another-block" => [
        "apiVersion" => 3,
        "name" => "ksd/another-block",
        "title" => "Another Block", 
        "editorScript" => "file:./index.js",
        "style" => "file:./style-index.css"
    ]
];';
file_put_contents($testManifestPath, $manifestContent);

echo "🧪 Running Vite Services Validation Tests\n";
echo str_repeat('=', 50) . "\n";

// Test ManifestResolver
$test->test('ManifestResolver can be instantiated', function () use ($test, $testManifestPath) {
    $resolver = new ManifestResolver();
    $resolver->setManifest($testManifestPath);
    $test->assertInstanceOf(ManifestResolver::class, $resolver);
});

$test->test('ManifestResolver detects block manifest', function () use ($test, $testManifestPath) {
    $resolver = new ManifestResolver();
    $resolver->setManifest($testManifestPath);
    $test->assertTrue($resolver->isBlockManifest());
});

$test->test('ManifestResolver gets block names', function () use ($test, $testManifestPath) {
    $resolver = new ManifestResolver();
    $resolver->setManifest($testManifestPath);
    $blockNames = $resolver->getBlockNames();
    $test->assertContains('test-block', $blockNames);
    $test->assertContains('another-block', $blockNames);
    $test->assertCount(2, $blockNames);
});

$test->test('ManifestResolver gets block by name', function () use ($test, $testManifestPath) {
    $resolver = new ManifestResolver();
    $resolver->setManifest($testManifestPath);
    $block = $resolver->getByBlockName('test-block');
    $test->assertIsArray($block);
    $test->assertEquals('ksd/test-block', $block['name']);
    $test->assertEquals('Test Block', $block['title']);
});

$test->test('ManifestResolver returns false for nonexistent block', function () use ($test, $testManifestPath) {
    $resolver = new ManifestResolver();
    $resolver->setManifest($testManifestPath);
    $block = $resolver->getByBlockName('nonexistent-block');
    $test->assertFalse($block);
});

$test->test('ManifestResolver gets block by file', function () use ($test, $testManifestPath) {
    $resolver = new ManifestResolver();
    $resolver->setManifest($testManifestPath);
    $block = $resolver->getByFile('index.js');
    $test->assertIsArray($block);
    $test->assertEquals('ksd/test-block', $block['name']);
});

// Test DevServer
$test->test('DevServer can be instantiated', function () use ($test, $testManifestPath) {
    $resolver = new ManifestResolver();
    $resolver->setManifest($testManifestPath);
    $devServer = new DevServer('http://localhost', $resolver);
    $test->assertInstanceOf(DevServer::class, $devServer);
});

$test->test('DevServer has correct host and port', function () use ($test, $testManifestPath) {
    $resolver = new ManifestResolver();
    $resolver->setManifest($testManifestPath);
    $devServer = new DevServer('http://localhost', $resolver);
    $devServer->setPort(5173);
    $test->assertEquals('http://localhost', $devServer->getServerHost());
    $test->assertEquals('5173', $devServer->getServerPort());
});

$test->test('DevServer can set host and port', function () use ($test, $testManifestPath) {
    $resolver = new ManifestResolver();
    $resolver->setManifest($testManifestPath);
    $devServer = new DevServer('http://localhost', $resolver);
    $devServer->setHost('https://example.com')->setPort(3000);
    $test->assertEquals('https://example.com', $devServer->getServerHost());
    $test->assertEquals('3000', $devServer->getServerPort());
});

$test->test('DevServer generates correct URLs', function () use ($test, $testManifestPath) {
    $resolver = new ManifestResolver();
    $resolver->setManifest($testManifestPath);
    $devServer = new DevServer('http://localhost', $resolver);
    $devServer->setPort(5173);
    $test->assertEquals('http://localhost:5173', $devServer->getServerUrl());
    $test->assertEquals('http://localhost:5173/vite-wordpress.json', $devServer->getConfigUrl());
    $test->assertEquals('http://localhost:5173/@vite/client', $devServer->getClientUrl());
});

$test->test('DevServer can get block info', function () use ($test, $testManifestPath) {
    $resolver = new ManifestResolver();
    $resolver->setManifest($testManifestPath);
    $devServer = new DevServer('http://localhost', $resolver);
    $blockInfo = $devServer->getBlockInfo('test-block');
    $test->assertIsArray($blockInfo);
    $test->assertEquals('ksd/test-block', $blockInfo['name']);
});

$test->test('DevServer can check if block exists', function () use ($test, $testManifestPath) {
    $resolver = new ManifestResolver();
    $resolver->setManifest($testManifestPath);
    $devServer = new DevServer('http://localhost', $resolver);
    $test->assertTrue($devServer->hasBlock('test-block'));
    $test->assertTrue($devServer->hasBlock('another-block'));
    $test->assertFalse($devServer->hasBlock('nonexistent-block'));
});

$test->test('DevServer contains base check works', function () use ($test, $testManifestPath) {
    $resolver = new ManifestResolver();
    $resolver->setManifest($testManifestPath);
    $devServer = new DevServer('http://localhost', $resolver);
    $devServer->setConfig(['base' => '/wp-content/themes/test-theme']);

    $test->assertTrue($devServer->containsBase('/wp-content/themes/test-theme/build/app.js'));
    $test->assertFalse($devServer->containsBase('/some/other/path/app.js'));
});

$test->test('DevServer getFileName works correctly', function () use ($test, $testManifestPath) {
    $resolver = new ManifestResolver();
    $resolver->setManifest($testManifestPath);
    $devServer = new DevServer('http://localhost', $resolver);
    $devServer->setConfig([
        'base'   => '/wp-content/themes/test-theme',
        'outDir' => 'build'
    ]);

    $fileName = $devServer->getFileName('/wp-content/themes/test-theme/build/app.js?version=123');
    $test->assertEquals('app.js', $fileName);

    $fileName = $devServer->getFileName('/some/other/path');
    $test->assertFalse($fileName);
});

$test->test('DevServer getRelativeLocalPath works correctly', function () use ($test, $testManifestPath) {
    $resolver = new ManifestResolver();
    $resolver->setManifest($testManifestPath);
    $devServer = new DevServer('http://localhost', $resolver);

    $from = '/absolute/path/to/blocks/test-block';
    $to   = '/absolute/path/to/build/test-block/render.php';

    $relativePath = $devServer->getRelativeLocalPath($from, $to);
    $test->assertEquals('file:./../../build/test-block/render.php', $relativePath);
});

$test->test('DevServer works without manifest', function () use ($test) {
    $devServer = new DevServer('http://localhost');
    $test->assertInstanceOf(DevServer::class, $devServer);

    // These should return false when no manifest is set
    $test->assertFalse($devServer->hasBlock('any-block'));
    $test->assertFalse($devServer->getBlockInfo('any-block'));
});

$test->test('DevServer configuration methods work', function () use ($test, $testManifestPath) {
    $resolver = new ManifestResolver();
    $resolver->setManifest($testManifestPath);
    $devServer = new DevServer('http://localhost', $resolver);

    // Test config getter when no config is set
    $test->assertEquals(null, $devServer->getConfig());
    $test->assertEquals(null, $devServer->getConfig('nonexistent'));

    // Test config setter and getter
    $config = [
        'base'   => '/wp-content/themes/test',
        'outDir' => 'build',
        'srcDir' => 'resources'
    ];

    $devServer->setConfig($config);
    $test->assertEquals($config, $devServer->getConfig());
    $test->assertEquals('/wp-content/themes/test', $devServer->getConfig('base'));
    $test->assertEquals('build', $devServer->getConfig('outDir'));
});

// Test integration between DevServer and ManifestResolver
$test->test('DevServer integrates correctly with ManifestResolver', function () use ($test, $testManifestPath) {
    $resolver = new ManifestResolver();
    $resolver->setManifest($testManifestPath);
    $devServer = new DevServer('http://localhost', $resolver);

    // Test that DevServer can access manifest data
    $blockInfo = $devServer->getBlockInfo('test-block');
    $test->assertIsArray($blockInfo);
    $test->assertEquals('Test Block', $blockInfo['title']);

    // Test block existence check
    $test->assertTrue($devServer->hasBlock('test-block'));
    $test->assertFalse($devServer->hasBlock('nonexistent-block'));
});

// Test with actual block manifest
$test->test('DevServer works with actual block manifest', function () use ($test) {
    $actualManifestPath = __DIR__ . '/../../build/block-manifest.php';
    if (file_exists($actualManifestPath)) {
        $resolver = new ManifestResolver();
        $resolver->setManifest($actualManifestPath);
        $devServer = new DevServer('http://localhost', $resolver);

        $test->assertTrue($resolver->isBlockManifest());
        $blockNames = $resolver->getBlockNames();
        $test->assertTrue(count($blockNames) > 0);

        // Test with a known block from the actual manifest
        if (in_array('heading', $blockNames)) {
            $test->assertTrue($devServer->hasBlock('heading'));
            $blockInfo = $devServer->getBlockInfo('heading');
            $test->assertIsArray($blockInfo);
        }
    } else {
        echo "ℹ️  Skipping actual manifest test - build/block-manifest.php not found\n";
    }
});

// Test error conditions
$test->test('ManifestResolver throws exception for invalid file', function () use ($test) {
    try {
        $resolver = new ManifestResolver();
        $resolver->setManifest('/nonexistent/path/manifest.php');
        $test->assert(false, 'Expected RuntimeException');
    } catch (\RuntimeException $e) {
        $test->assert(str_contains($e->getMessage(), 'Manifest file path does not exist'));
    }
});

// Clean up
unlink($testManifestPath);

// Show summary
$test->summary();
