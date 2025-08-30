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

    /**
     * Manifest resolver
     */
    protected ?ManifestResolver $manifest = null;

    public function __construct(string $host = '', ?ManifestResolver $manifest = null) {
        $this->host = $host ?: get_site_url();

        if (null !== $manifest) {
            $this->manifest = $manifest;
        }
    }

    /**
     * Register hooks and filters for the dev server
     */
    public function register(): self {
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
     * Set the config (mainly used for tests)
     */
    public function setConfig(array $config): self {
        $this->config = $config;
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
        $fileName = $this->getFileName($filePath);

        if (false === $fileName) {
            return false;
        }

        // Check if manifest exists and resolve from the manifest
        if (isset($this->manifest)) {
            $manifestEntry = $this->manifest->getByFile($fileName);

            if ($manifestEntry && isset($manifestEntry['src'])) {
                return $manifestEntry['src'];
            }

            // If it's a block manifest, try resolving block assets
            if ($this->manifest->isBlockManifest()) {
                $blockAssetPath = $this->resolveBlockAsset($fileName);
                if ($blockAssetPath) {
                    return $blockAssetPath;
                }
            }
        }

        // If not resolved from the manifest, try resolving via server's build map
        if (isset($this->buildMap[$fileName])) {
            $buildEntry = $this->buildMap[$fileName];
            if (isset($buildEntry['src'])) {
                return $buildEntry['src'];
            }
        }

        // If not resolved from the build map, try resolving from the file system
        $fileName       = str_replace('.css', ".{$this->getConfig('css')}", $fileName);
        $fileSystemPath = "{$this->getServerPath()}/{$this->getConfig('srcDir')}/{$fileName}";

        if (file_exists($fileSystemPath)) {
            return "{$this->getConfig('srcDir')}/{$fileName}";
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

            $fileProperties = ['editorScript', 'editorStyle', 'style', 'viewScript', 'render'];

            foreach ($fileProperties as $property) {
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
     * Removes query parameters, base and outDir from path to get the file name
     *
     * @param string $path Path to get the file name from
     * @return string|false The file name or false if no valid file name
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

        return isset($key) ? $this->config[$key] : $this->config;
    }

    /**
     * Check if the path contains the base path
     */
    public function containsBase(string $path): bool {
        $base = $this->getConfig('base');
        return $base !== '' && strpos($path, $base) !== false;
    }

    /**
     * Check if the URL contains the server base URL
     */
    public function containsServerUrl(string $url): bool {
        $baseUrl = $this->getBaseUrl();
        return $baseUrl !== '' && strpos($url, $baseUrl) !== false;
    }
}
