<?php

declare(strict_types=1);

namespace App\Services\Vite;

use RuntimeException;

/**
 * Manages the integration of ViteJS manifest with WordPress
 *
 * This class provides functionality to parse and query Vite manifest files,
 * allowing for proper asset resolution in both development and production modes.
 */
class ManifestResolver {
    /**
     * The parsed manifest data
     */
    private array $manifest;

    /**
     * Path to the manifest file
     */
    private string $path;

    /**
     * Directory where the source files are located
     */
    private string $srcDir = 'src';

    /**
     * Sets the manifest file path and resolves it
     */
    public function setManifest(string $manifestPath): self {
        $this->path = $manifestPath;
        $this->resolveManifest();

        return $this;
    }

    /**
     * Sets the source directory
     */
    public function setSrc(string $srcDir): self {
        $this->srcDir = $srcDir;

        return $this;
    }

    /**
     * Checks if a specific entry exists in the manifest
     */
    public function has(string $id): bool {
        return isset($this->getManifest()["{$this->srcDir}/{$id}"]);
    }

    /**
     * Retrieves a manifest entry or the entire manifest
     */
    public function get(?string $id = null): ?array {
        return isset($id) ? ($this->getManifest()["{$this->srcDir}/{$id}"] ?? null) : $this->getManifest();
    }

    /**
     * Retrieves a manifest entry by file key
     */
    public function getByFile(string $file): array|false {
        foreach ($this->getManifest() as $item) {
            // Standard Vite manifest structure
            if (isset($item['file']) && $item['file'] === $file) {
                return $item;
            }
        }

        return false;
    }

    /**
     * Retrieves a manifest entry by name key
     */
    public function getByName(string $name): array|false {
        foreach ($this->getManifest() as $item) {
            if (isset($item['name']) && $item['name'] === $name) {
                return $item;
            }
        }

        return false;
    }

    /**
     * Retrieves a block manifest entry by block name
     */
    public function getByBlockName(string $blockName): array|false {
        // Remove the namespace prefix if it exists (e.g., 'ksd/heading' -> 'heading')
        $blockKey = str_replace('ksd/', '', $blockName);

        $manifest = $this->getManifest();
        return $manifest[$blockKey] ?? false;
    }

    /**
     * Check if this is a block manifest (contains block.json-like data)
     */
    public function isBlockManifest(): bool {
        $manifest = $this->getManifest();

        // Check if the first item has block-like properties
        $firstItem = reset($manifest);
        return is_array($firstItem)
            && (
                isset($firstItem['apiVersion'])
                || isset($firstItem['name'])
                || isset($firstItem['title'])
            );
    }

    /**
     * Get all block names from the manifest
     */
    public function getBlockNames(): array {
        if (!$this->isBlockManifest()) {
            return [];
        }

        return array_keys($this->getManifest());
    }

    /**
     * Retrieves the parsed manifest data
     *
     * @throws RuntimeException If the manifest has not been set
     */
    protected function getManifest(): array {
        if (!isset($this->manifest)) {
            throw new RuntimeException(
                'ViteWordpress: Manifest has not been set yet.'
            );
        }

        return $this->manifest;
    }

    /**
     * Resolves the manifest file and loads its content
     *
     * @throws RuntimeException If the manifest file does not exist or cannot be parsed
     */
    protected function resolveManifest(): void {
        $manifestExtension = pathinfo($this->path, PATHINFO_EXTENSION);

        if (!file_exists($this->path)) {
            throw new RuntimeException(
                'ViteWordpress: Manifest file path does not exist. Try to run `yarn build` or `npm run build` first.'
            );
        }

        if ('json' === $manifestExtension) {
            // phpcs:ignore WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents
            $content        = file_get_contents($this->path);
            $decoded        = json_decode($content ?: '[]', true);
            $this->manifest = is_array($decoded) ? $decoded : [];

            if (json_last_error()) {
                throw new RuntimeException(esc_html('ViteWordpress: Error decoding manifest JSON: ' . json_last_error_msg()));
            }
        } elseif ('php' === $manifestExtension) {
            $data = require $this->path;
            if (!is_array($data)) {
                throw new RuntimeException('ViteWordpress: Manifest PHP must return an array.');
            }
            $this->manifest = $data;
        } else {
            throw new RuntimeException('ViteWordpress: Unknown manifest file type.');
        }
    }
}
