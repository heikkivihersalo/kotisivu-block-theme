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
     * @var string
     */
    private const DEFAULT_PORT = '5173';

    /**
     * Vite server host
     * @var string
     */
    protected string $host;

    /**
     * Vite server port
     * @var string
     */
    protected string $port = self::DEFAULT_PORT;

    /**
     * Vite plugin configuration
     * @var array<string, mixed>|null
     */
    protected ?array $config = null;

    /**
     * Vite build map from server
     * @var array<string, array<string, mixed>>|null
     */
    protected ?array $buildMap = null;

    /**
     * Vite client hook priority
     * @var int
     */
    protected int $clientHookPriority = 5;

    /**
     * Manifest resolver
     * @var ManifestResolver|null
     */
    protected ?ManifestResolver $manifest = null;

    /**
     * Asset resolver
     * @var AssetResolver|null
     */
    protected ?AssetResolver $assetResolver = null;


    /**
     * Cache: whether config was checked and active
     * @var bool|null
     */
    private ?bool $configActive = null;

    /**
     * Cache: whether client was checked and active
     * @var bool|null
     */
    private ?bool $clientActive = null;


    /**
     * Constructor
     *
     * @param string $host Base site host used to compose dev server URL
     * @param ManifestResolver|null $manifest Manifest resolver instance
     */
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
    /**
     * Register WordPress hooks when the dev server is reachable.
     */
    public function register(): self {
        // Only hook when both config and client are reachable
        if ($this->isConfigActive() && $this->isClientActive()) {
            add_action('wp_head', [$this, 'injectViteClient'], $this->clientHookPriority);
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
     *
     * @param string $host
     * @return $this
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
     *
     * @param int $port
     * @return $this
     */
    public function setPort(int $port): self {
        $this->port = (string) $port;
        // Invalidate caches when connection target changes
        $this->clientActive = null;
        $this->configActive = null;
        return $this;
    }

    /**
     * Set hook priority for injecting Vite client and import map.
     *
     * @param int $level
     * @return $this
     */
    public function setClientHook(int $level): self {
        $this->clientHookPriority = $level;
        return $this;
    }

    /**
     * Set the config (mainly used for tests)
     *
     * @param array<string, mixed> $config
     * @return $this
     */
    public function setConfig(array $config): self {
        $this->config = $config;
        // Invalidate caches when config changes
        $this->clientActive = null;
        $this->configActive = null;
        // Keep resolver in sync if already instantiated
        if ($this->assetResolver) {
            $this->assetResolver = new AssetResolver($this->manifest, $this->config, $this->buildMap);
        }
        return $this;
    }

    /**
     * Perform a GET request to the Vite dev server and decode JSON.
     *
     * @param string $url Full URL to request
     * @return array{errors: string|null, response: int, data: array<string, mixed>}
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
     * Check if the Vite HMR client endpoint is reachable.
     *
     * @return bool True if client is active
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
     * Check and fetch Vite plugin config from the dev server.
     *
     * @return bool True if config is active and fetched
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

        // Re-create asset resolver with the fresh config/build map
        $this->assetResolver = new AssetResolver($this->manifest, $this->config, $this->buildMap);

        return true;
    }

    /**
     * Inject the Vite HMR client and inline assets loader in the head.
     *
     * @return void
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
     * Adjust import map printing priority so modules resolve correctly.
     *
     * @return void
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
     * Add a flag class to body when dev server is active.
     *
     * @param array<int, string> $classes
     * @return array<int, string>
     */
    public function filterBodyClass(array $classes): array {
        $classes[] = 'vite-dev-server-is-active';
        return $classes;
    }

    /**
     * Rewrite enqueued asset URLs to point to the dev server when applicable.
     *
     * @param string $src Asset URL
     * @param string $handle Asset handle
     * @return string Modified asset URL
     */
    public function filterAssetLoaderSrc(string $src, string $handle): string {
        $base   = (string) ($this->getConfig('base') ?? '');
        $outDir = (string) ($this->getConfig('outDir') ?? '');

        // Accept when URL contains base or (when base is root) the outDir segment (e.g., /build/)
        $hasBase   = PathResolver::containsBase($src, $base);
        $hasOutDir = $outDir !== '' && strpos($src, '/' . trim($outDir, '/') . '/') !== false;
        if (!$hasBase && !$hasOutDir) {
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
     * Emit <script type="module"> for dev server JS so HMR works.
     *
     * @param string $tag The original script tag
     * @param string $handle The script handle
     * @param string $src The script src URL
     * @return string Modified script tag
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
     * When a block's render file points to a built path, swap it to the source for dev.
     *
     * @param array<string, mixed> $metadata
     * @return array<string, mixed>
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
     * Get raw block entry from manifest when using a block manifest.
     *
     * @param string $blockName The block name
     * @return array<string, mixed>|false
     */
    public function getBlockInfo(string $blockName): array|false {
        if (!isset($this->manifest) || !$this->manifest->isBlockManifest()) {
            return false;
        }

        return $this->manifest->getByBlockName($blockName);
    }

    /**
     * Get the server port
     *
     * @return string The server port
     */
    public function getServerPort(): string {
        return $this->port;
    }

    /**
     * Get the server host
     *
     * @return string The server host
     */
    public function getServerHost(): string {
        return $this->host;
    }

    /**
     * Get the vite plugin config or a specific key.
     *
     * @param string|null $key
     * @return array<string, mixed>|string|bool|null
     */
    public function getConfig(?string $key = null): mixed {
        if (!isset($this->config)) {
            return null;
        }

        return isset($key) ? ($this->config[$key] ?? null) : $this->config;
    }
}
