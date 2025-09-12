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
     * Block metadata file-like properties
     */
    private const BLOCK_FILE_PROPERTIES = ['editorScript', 'editorStyle', 'style', 'viewScript', 'render'];

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
     * Resolved assets cache
     */
    protected array $resolvedAssets = [];

    /**
     * Manifest resolver
     */
    protected ?ManifestResolver $manifest = null;

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
        // PathResolver is used statically
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

        if (isset($this->resolvedAssets[$handle])) {
            return $this->resolvedAssets[$handle];
        }

        $resolvedPath = $this->getSourcePath($src);

        if ($resolvedPath) {
            $serverUrl                     = PathResolver::serverUrl($this->host, $this->port);
            $baseUrl                       = PathResolver::baseUrl($serverUrl, (string) ($this->getConfig('base') ?? '/'));
            $resolvedUrl                   = "{$baseUrl}/{$resolvedPath}";
            $this->resolvedAssets[$handle] = $resolvedUrl;
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
        if (PathResolver::containsServerUrl($src, $baseUrl) && isset($this->resolvedAssets[$handle])) {
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

        $resolvedPath = $this->getSourcePath($renderFilePath);

        if ($resolvedPath) {
            $serverPath         = PathResolver::serverPath(ABSPATH, (string) ($this->getConfig('base') ?? '/'));
            $resolvedPath       = "{$serverPath}/{$resolvedPath}";
            $metadata['render'] = $this->getRelativeLocalPath($blockDirPath, $resolvedPath);
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
     * Check if a block exists in the manifest
     */
    public function hasBlock(string $blockName): bool {
        if (!isset($this->manifest) || !$this->manifest->isBlockManifest()) {
            return false;
        }

        return $this->manifest->getByBlockName($blockName) !== false;
    }

    /**
     * Get source path for an asset
     */
    public function getSourcePath(string $filePath): string|false {
        $fileName = PathResolver::fileName(
            $filePath,
            (string) ($this->getConfig('base') ?? '/'),
            (string) ($this->getConfig('outDir') ?? '')
        );
        if ($fileName === false) {
            return false;
        }

        // 1) Try manifest (if available)
        $resolved = $this->tryResolveViaManifest($fileName);
        if ($resolved !== false) {
            return $resolved;
        }

        // 2) Try dev server build map (if available)
        $resolved = $this->tryResolveViaBuildMap($fileName);
        if ($resolved !== false) {
            return $resolved;
        }

        // 3) Try local filesystem based on configured srcDir and css ext
        return $this->tryResolveViaFilesystem($fileName);
    }

    /**
     * Attempt to resolve from manifest if present
     */
    protected function tryResolveViaManifest(string $fileName): string|false {
        if (!isset($this->manifest)) {
            return false;
        }

        $manifestEntry = $this->manifest->getByFile($fileName);

        if ($manifestEntry && isset($manifestEntry['src'])) {
            return $manifestEntry['src'];
        }

        if ($this->manifest->isBlockManifest()) {
            $blockAssetPath = $this->resolveBlockAsset($fileName);
            if ($blockAssetPath) {
                return $blockAssetPath;
            }
        }

        return false;
    }

    /**
     * Attempt to resolve using dev server build map if available
     */
    protected function tryResolveViaBuildMap(string $fileName): string|false {
        if (!isset($this->buildMap) || !isset($this->buildMap[$fileName])) {
            return false;
        }

        $buildEntry = $this->buildMap[$fileName];
        return $buildEntry['src'] ?? false;
    }

    /**
     * Attempt to resolve by looking at the filesystem based on configured paths
     */
    protected function tryResolveViaFilesystem(string $fileName): string|false {
        $cssExt = (string) ($this->getConfig('css') ?? 'css');
        $srcDir = trim((string) ($this->getConfig('srcDir') ?? 'resources'), '/');
        $base   = (string) ($this->getConfig('base') ?? '/');
        $server = rtrim(PathResolver::serverPath(ABSPATH, $base), '/');

        $candidateName  = str_replace('.css', ".{$cssExt}", $fileName);
        $fileSystemPath = $server . '/' . $srcDir . '/' . $candidateName;

        if (file_exists($fileSystemPath)) {
            return $srcDir . '/' . $candidateName;
        }

        return false;
    }

    /**
     * Resolve block asset from block manifest
     */
    protected function resolveBlockAsset(string $fileName): string|false {
        if (!isset($this->manifest) || !$this->manifest->isBlockManifest()) {
            return false;
        }

        // Try to find the block that contains this file
        foreach ($this->manifest->getBlockNames() as $blockName) {
            $blockData = $this->manifest->getByBlockName($blockName);

            if (!$blockData) {
                continue;
            }

            foreach (self::BLOCK_FILE_PROPERTIES as $property) {
                if (isset($blockData[$property])) {
                    $blockFile = $blockData[$property];

                    // Remove 'file:./' prefix if present
                    $blockFile = str_replace('file:./', '', $blockFile);

                    // Check if this matches our target file
                    if (basename($blockFile) === basename($fileName) || $blockFile === $fileName) {
                        // Construct source path for development
                        $srcDir = $this->getConfig('srcDir') ?: 'resources';
                        return "{$srcDir}/blocks/{$blockName}/{$blockFile}";
                    }
                }
            }
        }

        return false;
    }

    /**
     * Gets the relative local path for block.json. This approach is based
     * on how npm handles local paths for packages.
     *
     * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/#wpdefinedpath
     *
     * @example
     * ```
     * $from = '/absolute/path/to/my/folder/';
     * $to = '/absolute/path/to/my/local/render.php';
     *
     * echo $this->getRelativeLocalPath($from, $to);
     * // Output: "file:./../local/render.php"
     * ```
     *
     * @param string $from The path from which it needs to be relative from
     * @param string $to The path to construct the relative path
     * @return string
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
