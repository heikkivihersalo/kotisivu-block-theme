<?php

declare(strict_types=1);

namespace App\Services\Vite;

/**
 * Dev Server for HMR integration with Vite
 *
 * Based on the vite-wordpress-php example plugin, this class provides
 * HMR (Hot Module Replacement) support by integrating with Vite's dev server
 */
class DevServer {
    /**
     * Vite server host
     */
    protected string $host;

    /**
     * Vite server port
     */
    protected string $port = '5173';

    /**
     * Vite plugin configuration
     */
    protected ?array $config = null;

    /**
     * Vite build map from server
     */
    protected ?array $buildMap = null;

    /**
     * Vite client hook priority
     */
    protected int $clientHookPriority = 5;

    /**
     * Resolved assets cache
     */
    protected array $resolvedAssets = [];

    public function __construct(string $host = '') {
        $this->host = $host ?: get_site_url();
    }

    /**
     * Register hooks and filters for the dev server
     */
    public function register(): self {
        if ($this->isConfigActive() && $this->isClientActive()) {
            add_action('wp_head', [$this, 'injectViteClient'], $this->clientHookPriority);
            add_action('init', [$this, 'prioritizeImportMapHook']);
            add_filter('body_class', [$this, 'filterBodyClass'], 999);
            add_filter('script_loader_src', [$this, 'filterAssetLoaderSrc'], 999, 2);
            add_filter('style_loader_src', [$this, 'filterAssetLoaderSrc'], 999, 2);
            add_filter('script_loader_tag', [$this, 'filterAssetLoaderTags'], 999, 3);
            add_filter('block_type_metadata', [$this, 'filterBlockTypeMetadata']);
        }

        return $this;
    }

    /**
     * Set the server host
     */
    public function setHost(string $host): self {
        $this->host = $host;
        return $this;
    }

    /**
     * Set the server port
     */
    public function setPort(int $port): self {
        $this->port = (string) $port;
        return $this;
    }

    /**
     * Set the client hook priority
     */
    public function setClientHook(int $level): self {
        $this->clientHookPriority = $level;
        return $this;
    }

    /**
     * Make a request to the Vite dev server
     */
    protected function viteServerRequest(string $url): array {
        $response = wp_remote_get($url, [
            'timeout'   => 5,
            'sslverify' => false,
        ]);

        if (is_wp_error($response)) {
            return [
                'errors'   => $response->get_error_message(),
                'response' => 0,
                'data'     => [],
            ];
        }

        $code = wp_remote_retrieve_response_code($response);
        $body = wp_remote_retrieve_body($response);

        return [
            'errors'   => null,
            'response' => $code,
            'data'     => $code >= 200 && $code < 300 ? json_decode($body, true) : [],
        ];
    }

    /**
     * Check if the Vite client is active
     */
    public function isClientActive(): bool {
        $request = $this->viteServerRequest($this->getClientUrl());
        return empty($request['errors']) && ($request['response'] ?? 0) === 200;
    }

    /**
     * Check if the Vite plugin config is active
     */
    public function isConfigActive(): bool {
        $request = $this->viteServerRequest($this->getConfigUrl());

        if (!empty($request['errors']) || ($request['response'] ?? 0) !== 200) {
            return false;
        }

        $this->config   = $request['data'];
        $this->buildMap = !empty($request['data']['buildMap'])
            ? $request['data']['buildMap']
            : null;

        return true;
    }

    /**
     * Inject the Vite client script into WordPress head
     */
    public function injectViteClient(): void {
        $clientUrl = esc_url($this->getClientUrl());
        echo "<script type=\"module\" src=\"{$clientUrl}\"></script>\n";
        echo "<script type=\"module\">window.process = {env: {NODE_ENV: 'development'}};</script>\n";
    }

    /**
     * Prioritize import map hook for module support
     */
    public function prioritizeImportMapHook(): void {
        global $wp_script_modules;

        if (isset($wp_script_modules)) {
            $position = wp_is_block_theme() ? 'wp_head' : 'wp_footer';
            remove_action($position, [$wp_script_modules, 'print_import_map']);
            add_action($position, [$wp_script_modules, 'print_import_map'], $this->clientHookPriority - 1);
        }
    }

    /**
     * Add body class when dev server is active
     */
    public function filterBodyClass(array $classes): array {
        $classes[] = 'vite-dev-server-is-active';
        return $classes;
    }

    /**
     * Filter asset loader src to point to dev server
     */
    public function filterAssetLoaderSrc(string $src, string $handle): string {
        if (!$this->containsBase($src)) {
            return $src;
        }

        if (isset($this->resolvedAssets[$handle])) {
            return $this->resolvedAssets[$handle];
        }

        $resolvedPath = $this->getSourcePath($src);

        if ($resolvedPath) {
            $resolvedUrl                   = "{$this->getBaseUrl()}/{$resolvedPath}";
            $this->resolvedAssets[$handle] = $resolvedUrl;
            return $resolvedUrl;
        }

        return $src;
    }

    /**
     * Filter script tags to use module type for dev server assets
     */
    public function filterAssetLoaderTags(string $tag, string $handle, string $src): string {
        if ($this->containsServerUrl($src) && isset($this->resolvedAssets[$handle])) {
            return '<script type="module" src="' . esc_url($src) . '"></script>';
        }

        return $tag;
    }

    /**
     * Filter block type metadata to resolve render paths
     */
    public function filterBlockTypeMetadata(array $metadata): array {
        if (!isset($metadata['render'])) {
            return $metadata;
        }

        $blockDirPath   = dirname($metadata['file']);
        $renderFilePath = path_join($blockDirPath, basename($metadata['render']));

        if (!$this->containsBase($renderFilePath) || !is_file($renderFilePath)) {
            return $metadata;
        }

        $resolvedPath = $this->getSourcePath($renderFilePath);

        if ($resolvedPath) {
            $resolvedPath       = "{$this->getServerPath()}/{$resolvedPath}";
            $metadata['render'] = $this->getRelativeLocalPath($blockDirPath, $resolvedPath);
        }

        return $metadata;
    }

    /**
     * Get source path for an asset
     */
    public function getSourcePath(string $filePath): string|false {
        $fileName = $this->getFileName($filePath);

        if (false === $fileName) {
            return false;
        }

        // Check build map from server
        if (isset($this->buildMap[$fileName])) {
            $buildEntry = $this->buildMap[$fileName];
            if (isset($buildEntry['src'])) {
                return $buildEntry['src'];
            }
        }

        // Try file system resolution
        $fileName       = str_replace('.css', ".{$this->getConfig('css')}", $fileName);
        $fileSystemPath = "{$this->getServerPath()}/{$this->getConfig('srcDir')}/{$fileName}";

        if (file_exists($fileSystemPath)) {
            return "{$this->getConfig('srcDir')}/{$fileName}";
        }

        return false;
    }

    /**
     * Get relative local path for block.json
     */
    public function getRelativeLocalPath(string $from, string $to): string {
        $fromParts = explode(DIRECTORY_SEPARATOR, rtrim($from, DIRECTORY_SEPARATOR));
        $toParts   = explode(DIRECTORY_SEPARATOR, rtrim($to, DIRECTORY_SEPARATOR));

        // Remove common prefix
        while ($fromParts && $toParts && $fromParts[0] === $toParts[0]) {
            array_shift($fromParts);
            array_shift($toParts);
        }

        // Construct relative path
        return 'file:./' . str_repeat('..' . DIRECTORY_SEPARATOR, count($fromParts)) . implode(DIRECTORY_SEPARATOR, $toParts);
    }

    /**
     * Get file name from path
     */
    public function getFileName(string $path): string|false {
        $fileName = preg_replace('/\?.*$/', '', $path);
        $fileName = explode("{$this->getConfig('base')}/{$this->getConfig('outDir')}/", $fileName);

        return !isset($fileName[1]) ? false : $fileName[1];
    }

    /**
     * Get URLs and paths
     */
    public function getConfigUrl(): string {
        return "{$this->getServerUrl()}/vite-wordpress.json";
    }

    public function getClientUrl(): string {
        return "{$this->getBaseUrl()}/@vite/client";
    }

    public function getBaseUrl(): string {
        return untrailingslashit("{$this->getServerUrl()}{$this->getConfig('base')}");
    }

    public function getServerUrl(): string {
        return "{$this->host}:{$this->port}";
    }

    public function getServerPath(): string {
        return untrailingslashit(ABSPATH) . $this->getConfig('base');
    }

    /**
     * Get config value
     */
    public function getConfig(?string $key = null): mixed {
        if (!isset($this->config)) {
            return null;
        }

        return isset($key) ? $this->config[$key] : $this->config;
    }

    /**
     * Check if path contains base
     */
    public function containsBase(string $path): bool {
        $base = $this->getConfig('base');
        return $base !== '' && strpos($path, $base) !== false;
    }

    /**
     * Check if URL contains server base URL
     */
    public function containsServerUrl(string $url): bool {
        $baseUrl = $this->getBaseUrl();
        return $baseUrl !== '' && strpos($url, $baseUrl) !== false;
    }
}
