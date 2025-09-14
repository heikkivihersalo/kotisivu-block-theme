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
        $cssExt   = (string) ($this->config['css'] ?? 'css');
        $srcDir   = trim((string) ($this->config['srcDir'] ?? 'resources'), '/');
        $themeDir = rtrim((string) get_stylesheet_directory(), '/');

        $candidateName  = str_replace('.css', ".{$cssExt}", $fileName);
        $fileSystemPath = $themeDir . '/' . $srcDir . '/' . $candidateName;

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

        foreach ($this->manifest->getBlockNames() as $blockName) {
            $blockData = $this->manifest->getByBlockName($blockName);
            if (!$blockData) {
                continue;
            }

            $matchedFile = $this->findMatchingBlockFile($blockData, $fileName);
            if ($matchedFile !== null) {
                return $this->resolveBlockSourcePath($blockName, $matchedFile);
            }
        }

        return false;
    }

    /**
     * Find a matching block.json file reference for the given output filename.
     *
     * @param array<string,mixed> $blockData
     * @param string $fileName
     * @return string|null Matching block file reference, or null if not found
     */
    private function findMatchingBlockFile(array $blockData, string $fileName): ?string {
        foreach (self::BLOCK_FILE_PROPERTIES as $property) {
            if (!array_key_exists($property, $blockData)) {
                continue;
            }

            foreach ($this->normalizePropertyValues($blockData[$property]) as $value) {
                $blockFile = $this->stripFileProtocol($value);
                if ($this->fileMatches($blockFile, $fileName)) {
                    return $blockFile;
                }
            }
        }

        return null;
    }

    /**
     * Normalize a block.json property value to iterable strings.
     * Accepts strings or arrays of strings; ignores non-string values.
     *
     * @param mixed $value
     * @return array<int,string>
     */
    private function normalizePropertyValues(mixed $value): array {
        $values = is_array($value) ? $value : [$value];
        return array_values(array_filter($values, static fn ($v) => is_string($v)));
    }

    /**
     * Remove the file:./ prefix from file references used by block.json.
     *
     * @param string $value
     * @return string Matching block file reference, or null if not found
     */
    private function stripFileProtocol(string $value): string {
        return str_replace('file:./', '', $value);
    }

    /**
     * Determine if a block file reference matches the built filename.
     *
     * @param string $blockFile
     * @param string $fileName
     * @return bool True if the block file matches the built filename
     */
    private function fileMatches(string $blockFile, string $fileName): bool {
        return $blockFile === $fileName || basename($blockFile) === basename($fileName);
    }

    /**
     * Resolve the source path for a matched block asset, honoring blocksDir mappings and
     * falling back to the default srcDir/blocks/<block>/<file> when necessary.
     *
     * @param string $blockName Block name (e.g. 'heading')
     * @param string $blockFile Block file reference (e.g. 'index.js')
     * @return string Relative source path (e.g. 'resources/blocks/heading/index.js')
     */
    private function resolveBlockSourcePath(string $blockName, string $blockFile): string {
        $srcDir    = (string) ($this->config['srcDir'] ?? 'resources');
        $blocksDir = is_array($this->config['blocksDir'] ?? null) ? $this->config['blocksDir'] : [];

        // Default fallback (legacy dev pattern)
        $defaultPath = rtrim($srcDir, '/') . "/blocks/{$blockName}/{$blockFile}";

        if (empty($blocksDir)) {
            return $defaultPath;
        }

        $themeRoot = rtrim((string) get_stylesheet_directory(), '/');

        foreach ($blocksDir as $outputPath => $sourcePath) { // phpcs:ignore VariableAnalysis.CodeAnalysis.VariableAnalysis.UnusedVariable
            // Compute candidate directory where this block would live in source
            $candidateDir  = trailingslashit((string) $sourcePath) . $blockName;
            $candidateFile = trailingslashit($candidateDir) . $blockFile;
            $absCandidate  = $themeRoot . '/' . ltrim($candidateFile, '/');

            if (file_exists($absCandidate)) {
                return ltrim($candidateFile, '/');
            }

            if ($alt = $this->tryAlternativeScriptExtensions($candidateFile, $themeRoot)) {
                return $alt;
            }
        }

        return $defaultPath;
    }

    /**
     * If the candidate script file isn't found, try common alternative extensions.
     * Returns the first matching relative path, or null.
     *
     * @param string $candidateFile
     * @param string $themeRoot
     * @return string|null Matching relative path, or null if none found
     */
    private function tryAlternativeScriptExtensions(string $candidateFile, string $themeRoot): ?string {
        $base = (string) preg_replace('/\.(js|jsx|ts|tsx)$/', '', $candidateFile);
        foreach (['.ts', '.tsx', '.jsx', '.js'] as $ext) {
            $try = ltrim($base . $ext, '/');
            if (file_exists($themeRoot . '/' . $try)) {
                return $try;
            }
        }
        return null;
    }
}
