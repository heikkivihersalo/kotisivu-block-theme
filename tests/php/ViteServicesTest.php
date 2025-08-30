<?php

declare(strict_types=1);

use App\Services\Vite\DevServer;
use App\Services\Vite\ManifestResolver;
use PHPUnit\Framework\TestCase;

class ViteServicesTest extends TestCase {
    private DevServer $devServer;
    private ManifestResolver $manifestResolver;
    private string $testManifestPath;

    protected function setUp(): void {
        parent::setUp();
        
        // Create a test manifest
        $this->testManifestPath = sys_get_temp_dir() . '/test-block-manifest.php';
        $this->createTestManifest();
        
        // Initialize services
        $this->manifestResolver = new ManifestResolver();
        $this->manifestResolver->setManifest($this->testManifestPath);
        
        $this->devServer = new DevServer('http://localhost', $this->manifestResolver);
        $this->devServer->setPort(5173);
    }

    protected function tearDown(): void {
        if (file_exists($this->testManifestPath)) {
            unlink($this->testManifestPath);
        }
        parent::tearDown();
    }

    private function createTestManifest(): void {
        $manifestContent = '<?php
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
        file_put_contents($this->testManifestPath, $manifestContent);
    }

    /**
     * Test ManifestResolver basic functionality
     */
    public function test_manifest_resolver_can_be_instantiated(): void {
        $this->assertInstanceOf(ManifestResolver::class, $this->manifestResolver);
    }

    public function test_manifest_resolver_can_detect_block_manifest(): void {
        $this->assertTrue($this->manifestResolver->isBlockManifest());
    }

    public function test_manifest_resolver_can_get_block_names(): void {
        $blockNames = $this->manifestResolver->getBlockNames();
        $this->assertContains('test-block', $blockNames);
        $this->assertContains('another-block', $blockNames);
        $this->assertCount(2, $blockNames);
    }

    public function test_manifest_resolver_can_get_block_by_name(): void {
        $block = $this->manifestResolver->getByBlockName('test-block');
        $this->assertIsArray($block);
        $this->assertEquals('ksd/test-block', $block['name']);
        $this->assertEquals('Test Block', $block['title']);
    }

    public function test_manifest_resolver_returns_false_for_nonexistent_block(): void {
        $block = $this->manifestResolver->getByBlockName('nonexistent-block');
        $this->assertFalse($block);
    }

    public function test_manifest_resolver_can_get_by_file(): void {
        $block = $this->manifestResolver->getByFile('index.js');
        $this->assertIsArray($block);
        $this->assertEquals('ksd/test-block', $block['name']);
    }

    /**
     * Test DevServer basic functionality
     */
    public function test_dev_server_can_be_instantiated(): void {
        $this->assertInstanceOf(DevServer::class, $this->devServer);
    }

    public function test_dev_server_has_correct_host_and_port(): void {
        $this->assertEquals('http://localhost', $this->devServer->getServerHost());
        $this->assertEquals('5173', $this->devServer->getServerPort());
    }

    public function test_dev_server_can_set_host_and_port(): void {
        $this->devServer->setHost('https://example.com')->setPort(3000);
        $this->assertEquals('https://example.com', $this->devServer->getServerHost());
        $this->assertEquals('3000', $this->devServer->getServerPort());
    }

    public function test_dev_server_generates_correct_urls(): void {
        $this->assertEquals('http://localhost:5173', $this->devServer->getServerUrl());
        $this->assertEquals('http://localhost:5173/vite-wordpress.json', $this->devServer->getConfigUrl());
        $this->assertEquals('http://localhost:5173/@vite/client', $this->devServer->getClientUrl());
    }

    public function test_dev_server_can_get_block_info(): void {
        $blockInfo = $this->devServer->getBlockInfo('test-block');
        $this->assertIsArray($blockInfo);
        $this->assertEquals('ksd/test-block', $blockInfo['name']);
    }

    public function test_dev_server_can_check_if_block_exists(): void {
        $this->assertTrue($this->devServer->hasBlock('test-block'));
        $this->assertTrue($this->devServer->hasBlock('another-block'));
        $this->assertFalse($this->devServer->hasBlock('nonexistent-block'));
    }

    public function test_dev_server_contains_base_check(): void {
        // Mock a config for testing
        $this->devServer->setConfig(['base' => '/wp-content/themes/test-theme']);
        
        $this->assertTrue($this->devServer->containsBase('/wp-content/themes/test-theme/build/app.js'));
        $this->assertFalse($this->devServer->containsBase('/some/other/path/app.js'));
    }

    public function test_dev_server_get_file_name(): void {
        // Mock a config for testing
        $this->devServer->setConfig([
            'base' => '/wp-content/themes/test-theme',
            'outDir' => 'build'
        ]);
        
        $fileName = $this->devServer->getFileName('/wp-content/themes/test-theme/build/app.js?version=123');
        $this->assertEquals('app.js', $fileName);
        
        $fileName = $this->devServer->getFileName('/some/other/path');
        $this->assertFalse($fileName);
    }

    public function test_dev_server_get_relative_local_path(): void {
        $from = '/absolute/path/to/blocks/test-block';
        $to = '/absolute/path/to/build/test-block/render.php';
        
        $relativePath = $this->devServer->getRelativeLocalPath($from, $to);
        $this->assertEquals('file:./../../build/test-block/render.php', $relativePath);
    }

    /**
     * Test DevServer and ManifestResolver integration
     */
    public function test_dev_server_integration_with_manifest_resolver(): void {
        // Test that DevServer can access manifest data
        $blockInfo = $this->devServer->getBlockInfo('test-block');
        $this->assertIsArray($blockInfo);
        $this->assertEquals('Test Block', $blockInfo['title']);
        
        // Test block existence check
        $this->assertTrue($this->devServer->hasBlock('test-block'));
        $this->assertFalse($this->devServer->hasBlock('nonexistent-block'));
    }

    public function test_dev_server_can_resolve_block_assets(): void {
        // Mock filesystem and config for testing
        $this->devServer->setConfig([
            'srcDir' => 'resources',
            'css' => 'scss'
        ]);
        
        // Test that getSourcePath method exists and can be called
        $sourcePath = $this->devServer->getSourcePath('index.js');
        
        // Since we don't have actual files, this should return false
        // but the method should not throw an error
        $this->assertFalse($sourcePath);
    }

    /**
     * Test error conditions
     */
    public function test_manifest_resolver_throws_exception_for_invalid_file(): void {
        $this->expectException(RuntimeException::class);
        $this->expectExceptionMessage('Manifest file path does not exist');
        
        $resolver = new ManifestResolver();
        $resolver->setManifest('/nonexistent/path/manifest.php');
    }

    public function test_manifest_resolver_throws_exception_when_accessing_unset_manifest(): void {
        $this->expectException(RuntimeException::class);
        $this->expectExceptionMessage('Manifest has not been set yet');
        
        $resolver = new ManifestResolver();
        $resolver->get();
    }

    /**
     * Test that services work without manifest
     */
    public function test_dev_server_works_without_manifest(): void {
        $devServer = new DevServer('http://localhost');
        $this->assertInstanceOf(DevServer::class, $devServer);
        
        // These should return false when no manifest is set
        $this->assertFalse($devServer->hasBlock('any-block'));
        $this->assertFalse($devServer->getBlockInfo('any-block'));
    }

    /**
     * Test WordPress-specific functionality
     */
    public function test_dev_server_filter_methods_exist(): void {
        // Test that filter methods exist and can be called
        $this->assertTrue(method_exists($this->devServer, 'filterAssetLoaderSrc'));
        $this->assertTrue(method_exists($this->devServer, 'filterAssetLoaderTags'));
        $this->assertTrue(method_exists($this->devServer, 'filterBlockTypeMetadata'));
        $this->assertTrue(method_exists($this->devServer, 'filterBodyClass'));
    }

    public function test_dev_server_action_methods_exist(): void {
        // Test that action methods exist and can be called
        $this->assertTrue(method_exists($this->devServer, 'injectViteClient'));
        $this->assertTrue(method_exists($this->devServer, 'prioritizeImportMapHook'));
    }

    /**
     * Test configuration methods
     */
    public function test_dev_server_configuration(): void {
        // Test config getter when no config is set
        $this->assertNull($this->devServer->getConfig());
        $this->assertNull($this->devServer->getConfig('nonexistent'));
        
        // Test config setter and getter
        $config = [
            'base' => '/wp-content/themes/test',
            'outDir' => 'build',
            'srcDir' => 'resources'
        ];
        
        $this->devServer->setConfig($config);
        $this->assertEquals($config, $this->devServer->getConfig());
        $this->assertEquals('/wp-content/themes/test', $this->devServer->getConfig('base'));
        $this->assertEquals('build', $this->devServer->getConfig('outDir'));
    }
}
