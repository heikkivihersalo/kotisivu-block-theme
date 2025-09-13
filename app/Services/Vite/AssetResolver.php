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
     * Block metadata file-like properties
     */
    private const BLOCK_FILE_PROPERTIES = ['editorScript', 'editorStyle', 'style', 'viewScript', 'render'];

    /**
     * Manifest resolver
     */
    protected ?ManifestResolver $manifest = null;
    protected ?array $config              = null;
    protected ?array $buildMap            = null;
    /**
     * Resolved handles map (handle => resolved url or path)
     */
    protected array $resolvedHandles = [];

    /**
     * Sets the manifest resolver
     */
    public function __construct(?ManifestResolver $manifest = null, ?array $config = null, ?array $buildMap = null) {
        $this->manifest = $manifest;
        $this->config   = $config;
        $this->buildMap = $buildMap;
    }

    /**
     * Track a resolved handle and its final URL/path
     */
    public function trackResolvedHandle(string $handle, string $resolved): void {
        $this->resolvedHandles[$handle] = $resolved;
    }

    /**
     * Check if a handle has been resolved
     */
    public function hasResolvedHandle(string $handle): bool {
        return isset($this->resolvedHandles[$handle]);
    }

    /**
     * Get the resolved URL/path for a handle
     */
    public function getResolvedHandle(string $handle): string|false {
        return $this->resolvedHandles[$handle] ?? false;
    }

    /**
     * Get the source path for a given asset, trying various resolving methods
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
                if (isset($blockData[$property])) {
                    $blockFile = $blockData[$property];

                    // Remove 'file:./' prefix if present
                    $blockFile = str_replace('file:./', '', $blockFile);

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
