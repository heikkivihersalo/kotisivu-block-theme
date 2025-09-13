<?php

declare(strict_types=1);

namespace App\Services\Vite;

/**
 * Manages the integration of ViteJS assets with WordPress
 *
 * This class provides functionality to parse and query Vite manifest files,
 * allowing for proper asset resolution in both development and production modes.
 */
class AssetResolver {
    /**
     * Block metadata properties that reference files we may need to resolve.
     *
     * @var array<int, string>
     */
    private const BLOCK_FILE_PROPERTIES = ['editorScript', 'editorStyle', 'style', 'viewScript', 'render'];

    /**
     * Manifest resolver instance
     */
    protected ?ManifestResolver $manifest = null;

    /**
     * Vite plugin configuration returned by the dev server (when active).
     * Expected keys: base, outDir, srcDir, css, ...
     *
     * @var array<string, mixed>|null
     */
    protected ?array $config = null;

    /**
     * Dev server build map for inline assets resolution.
     *
     * @var array<string, array<string, mixed>>|null
     */
    protected ?array $buildMap = null;
    /**
     * Resolved handles map (handle => resolved url or path)
     *
     * @var array<string, string>
     */
    protected array $resolvedHandles = [];

    /**
     * Constructor
     *
     * @param ManifestResolver|null $manifest Manifest resolver to use
     * @param array<string, mixed>|null $config Vite plugin configuration
     * @param array<string, array<string, mixed>>|null $buildMap Build map from dev server
     */
    public function __construct(?ManifestResolver $manifest = null, ?array $config = null, ?array $buildMap = null) {
        $this->manifest = $manifest;
        $this->config   = $config;
        $this->buildMap = $buildMap;
    }

    /**
     * Track a resolved handle and its final URL/path
     *
     * @param string $handle  WordPress asset handle
     * @param string $resolved Fully qualified URL or relative path resolved for dev server
     */
    public function trackResolvedHandle(string $handle, string $resolved): void {
        $this->resolvedHandles[$handle] = $resolved;
    }

    /**
     * Check if a handle has been resolved
     *
     * @param string $handle WordPress asset handle
     * @return bool True when we have a dev-server resolution for this handle
     */
    public function hasResolvedHandle(string $handle): bool {
        return isset($this->resolvedHandles[$handle]);
    }

    /**
     * Resolve the original source path for a given built asset URL/path, trying manifest,
     * dev-server buildMap and finally local filesystem fallbacks.
     *
     * Input can be a full URL including query string; base/outDir will be stripped.
     *
     * @param string $asset The enqueued asset src (URL or path)
     * @return string|false Relative source path (e.g. resources/js/app.ts) or false if not resolvable
     */
    public function getSourcePath(string $asset): string|false {
        $fileName = PathResolver::fileName(
            $asset,
            (string) ($this->config['base'] ?? '/'),
            (string) ($this->config['outDir'] ?? '')
        );

        if ($fileName === false) {
            // Not a file that can be resolved by vite, probably a full URL
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
     * Try to resolve an asset path using the manifest
     *
     * @param string $fileName File name relative to outDir
     * @return string|false Source path or false when not found
     */
    protected function tryResolveViaManifest(string $fileName): string|false {
        if (!$this->manifest) {
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
     * Try to resolve an asset path using the build map from the dev server
     *
     * @param string $fileName File name relative to outDir
     * @return string|false Source path or false when not found
     */
    protected function tryResolveViaBuildMap(string $fileName): string|false {
        if (empty($this->buildMap) || !isset($this->buildMap[$fileName])) {
            return false;
        }

        $buildEntry = $this->buildMap[$fileName];
        return $buildEntry['src'] ?? false;
    }

    /**
     * Try to resolve an asset path by checking the filesystem directly
     *
     * This is a best-effort fallback for CSS preprocessor extensions and typical
     * theme structures when the dev server is active but an explicit mapping is missing.
     *
     * @param string $fileName File name relative to outDir
     * @return string|false Relative source path or false when not found
     */
    protected function tryResolveViaFilesystem(string $fileName): string|false {
        $cssExt = (string) ($this->config['css'] ?? 'css');
        $srcDir = trim((string) ($this->config['srcDir'] ?? 'resources'), '/');
        $base   = (string) ($this->config['base'] ?? '/');
        $server = rtrim(PathResolver::serverPath(ABSPATH, $base), '/');

        $candidateName  = str_replace('.css', ".{$cssExt}", $fileName);
        $fileSystemPath = $server . '/' . $srcDir . '/' . $candidateName;

        if (file_exists($fileSystemPath)) {
            return $srcDir . '/' . $candidateName;
        }

        return false;
    }

    /**
     * Resolve a block asset path, considering block.json properties
     *
     * Handles string values and arrays for properties like "style".
     *
     * @param string $fileName File name relative to outDir
     * @return string|false Relative source path or false when not found
     */
    public function resolveBlockAsset(string $fileName): string|false {
        if (!$this->manifest || !$this->manifest->isBlockManifest()) {
            return false;
        }

        // Try to find the block that contains this file
        foreach ($this->manifest->getBlockNames() as $blockName) {
            $blockData = $this->manifest->getByBlockName($blockName);

            if (!$blockData) {
                continue;
            }

            foreach (self::BLOCK_FILE_PROPERTIES as $property) {
                if (!isset($blockData[$property])) {
                    continue;
                }

                $values = is_array($blockData[$property]) ? $blockData[$property] : [$blockData[$property]];

                foreach ($values as $value) {
                    if (!is_string($value)) {
                        continue;
                    }

                    $blockFile = str_replace('file:./', '', $value);

                    // Check if this matches our target file
                    if (basename($blockFile) === basename($fileName) || $blockFile === $fileName) {
                        // Construct source path for development
                        $srcDir = $this->config['srcDir'] ?? 'resources';
                        return "{$srcDir}/blocks/{$blockName}/{$blockFile}";
                    }
                }
            }
        }

        return false;
    }
}
