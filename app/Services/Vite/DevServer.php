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
     * Default Vite dev server port
     */
    private const DEFAULT_PORT = '5173';

    /**
     * Vite server host
     */
    protected string $host;

    /**
     * Vite server port
     */
    protected string $port = self::DEFAULT_PORT;

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
     * Manifest resolver
     */
    protected ?ManifestResolver $manifest = null;

    /**
     * Asset resolver
     */
    protected ?AssetResolver $assetResolver = null;


    /**
     * Cache: whether config was checked and active
     */
    private ?bool $configActive = null;

    /**
     * Cache: whether client was checked and active
     */
    private ?bool $clientActive = null;


    public function __construct(string $host = '', ?ManifestResolver $manifest = null) {
        $this->host = $host ?: get_site_url();

        if (null !== $manifest) {
            $this->manifest = $manifest;

        }
        $this->assetResolver = new AssetResolver($this->manifest, $this->config, $this->buildMap);
    }

    /**
     * Register hooks and filters for the dev server
     */
    public function register(): self {
        // Only hook when both config and client are reachable
        if ($this->isConfigActive() && $this->isClientActive()) {
            add_action('wp_head', [$this, 'injectViteClient'], $this->clientHookPriority);
            add_action('elementor/editor/before_enqueue_scripts', [$this, 'injectIntoElementorEditor']);
            add_action('init', [$this, 'prioritizeImportMapHook']);
            add_filter('body_class', [$this, 'filterBodyClass'], 999);
            add_filter('script_module_loader_src', [$this, 'filterAssetLoaderSrc'], 999, 2);
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
        // Invalidate caches when connection target changes
        $this->clientActive = null;
        $this->configActive = null;
        return $this;
    }

    /**
     * Set the server port
     */
    public function setPort(int $port): self {
        $this->port = (string) $port;
        // Invalidate caches when connection target changes
        $this->clientActive = null;
        $this->configActive = null;
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
     * Set the config (mainly used for tests)
     */
    public function setConfig(array $config): self {
        $this->config = $config;
        // Invalidate caches when config changes
        $this->clientActive = null;
        $this->configActive = null;
        return $this;
    }

    /**
     * Make a request to the Vite dev server
     *
     * @return array{
     *     errors: string|null,
     *     response: int,
     *     data: array<string, mixed>
     * }
     */
    protected function viteServerRequest(string $url): array {
        // phpcs:disable WordPress.WP.AlternativeFunctions
        $curl    = curl_init();
        $options = [
            CURLOPT_URL            => $url,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT        => 5,
        ];

        curl_setopt_array($curl, $options);

        $jsonData = curl_exec($curl);
        $errors   = curl_error($curl) ? curl_error($curl) : null;
        $response = curl_getinfo($curl, CURLINFO_HTTP_CODE);

        curl_close($curl);
        // phpcs:enable

        $data = [];

        if (null === $errors && $response >= 200 && $response < 300) {
            $data = json_decode($jsonData, true);
        }

        return [
            'errors'   => $errors,
            'response' => $response,
            'data'     => $data,
        ];
    }

    /**
     * Check if the Vite client is active
     */
    public function isClientActive(): bool {
        if ($this->clientActive !== null) {
            return $this->clientActive;
        }

        $serverUrl = PathResolver::serverUrl($this->host, $this->port);
        $baseUrl   = PathResolver::baseUrl($serverUrl, (string) ($this->getConfig('base') ?? '/'));
        $clientUrl = PathResolver::clientUrl($baseUrl);

        $request            = $this->viteServerRequest($clientUrl);
        $this->clientActive = empty($request['errors']) && ($request['response'] ?? 0) === 200;
        return $this->clientActive;
    }

    /**
     * Check if the Vite plugin config is active
     */
    public function isConfigActive(): bool {
        if ($this->configActive !== null) {
            return $this->configActive;
        }

        $serverUrl = PathResolver::serverUrl($this->host, $this->port);
        $configUrl = PathResolver::configUrl($serverUrl);
        $request   = $this->viteServerRequest($configUrl);

        if (!empty($request['errors']) || ($request['response'] ?? 0) !== 200) {
            $this->configActive = false;
            return false;
        }

        $this->config       = $request['data'];
        $this->buildMap     = !empty($request['data']['buildMap']) ? $request['data']['buildMap'] : null;
        $this->configActive = true;

        return true;
    }

    /**
     * Inject the Vite client script into WordPress head
     */
    public function injectViteClient(): void {
        $serverUrl = PathResolver::serverUrl($this->host, $this->port);
        $baseUrl   = PathResolver::baseUrl($serverUrl, (string) ($this->getConfig('base') ?? '/'));
        $clientUrl = esc_url(PathResolver::clientUrl($baseUrl));
        echo "<script type=\"module\" src=\"{$clientUrl}\"></script>\n";
        echo "<script type=\"module\">window.process = {env: {NODE_ENV: 'development'}};</script>\n";

        // Inject inline assets HMR client
        $inlineAssetsUrl = esc_url($baseUrl . '/__vite_inline_assets');
        echo "<script type=\"module\" src=\"{$inlineAssetsUrl}\"></script>\n";
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
        $base = (string) ($this->getConfig('base') ?? '');
        if (!PathResolver::containsBase($src, $base)) {
            return $src;
        }

        $resolvedPath = $this->assetResolver->getSourcePath($src);

        if ($resolvedPath) {
            $serverUrl   = PathResolver::serverUrl($this->host, $this->port);
            $baseUrl     = PathResolver::baseUrl($serverUrl, (string) ($this->getConfig('base') ?? '/'));
            $resolvedUrl = "{$baseUrl}/{$resolvedPath}";

            // Track that this handle was resolved via the dev server so we can adjust tag attributes
            if ($this->assetResolver) {
                $this->assetResolver->trackResolvedHandle($handle, $resolvedUrl);
            }

            return $resolvedUrl;
        }

        return $src;
    }

    /**
     * Filter script tags to use module type for dev server assets
     */
    public function filterAssetLoaderTags(string $tag, string $handle, string $src): string {
        $serverUrl = PathResolver::serverUrl($this->host, $this->port);
        $baseUrl   = PathResolver::baseUrl($serverUrl, (string) ($this->getConfig('base') ?? '/'));
        if (
            PathResolver::containsServerUrl($src, $baseUrl)
            && $this->assetResolver
            && $this->assetResolver->hasResolvedHandle($handle)
        ) {
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

        $base = (string) ($this->getConfig('base') ?? '');
        if (!PathResolver::containsBase($renderFilePath, $base) || !is_file($renderFilePath)) {
            return $metadata;
        }

        $resolvedPath = $this->assetResolver->getSourcePath($renderFilePath);

        if ($resolvedPath) {
            $serverPath         = PathResolver::serverPath(ABSPATH, (string) ($this->getConfig('base') ?? '/'));
            $resolvedPath       = "{$serverPath}/{$resolvedPath}";
            $metadata['render'] = PathResolver::relativeLocalPath($blockDirPath, $resolvedPath);
        }

        return $metadata;
    }

    /**
     * Get block information from manifest
     */
    public function getBlockInfo(string $blockName): array|false {
        if (!isset($this->manifest) || !$this->manifest->isBlockManifest()) {
            return false;
        }

        return $this->manifest->getByBlockName($blockName);
    }

    /**
     * Get the server port
     */
    public function getServerPort(): string {
        return $this->port;
    }

    /**
     * Get the server host
     */
    public function getServerHost(): string {
        return $this->host;
    }

    /**
     * Get the vite plugin config
     *
     * @param string|null $key Config key to get
     * @return array<string, mixed>|string|bool|null The plugin config
     */
    public function getConfig(?string $key = null): mixed {
        if (!isset($this->config)) {
            return null;
        }

        return isset($key) ? ($this->config[$key] ?? null) : $this->config;
    }
}
