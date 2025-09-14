<?php

declare(strict_types=1);

namespace App\Services\Vite;

/**
 * Path and URL utilities for Vite integration.
 *
 * Stateless helper focused on parsing and composing paths/URLs
 * used by the DevServer and manifest-related logic.
 */
class PathResolver {
    /**
     * Remove query string from a URL or path
     *
     * @param string $path URL or path to clean
     * @return string Cleaned URL or path without query string
     */
    public static function removeQuery(string $path): string {
        return (string) preg_replace('/\?.*$/', '', $path);
    }

    /**
     * Build the Vite server URL from host and port
     *
     * @param string $host Vite server host (e.g. http://localhost)
     * @param string $port Vite server port (e.g. 5173)
     * @return string Full server URL (e.g. http://localhost:5173)
     */
    public static function serverUrl(string $host, string $port): string {
        return rtrim($host, '/') . ':' . ltrim($port, ':');
    }

    /**
     * Build base URL, e.g. http://localhost:5173/app
     *
     * @param string $serverUrl Vite server URL (e.g. http://localhost:5173)
     * @param string|null $base Base path from Vite config (e.g. /app/)
     * @return string Full base URL (e.g. http://localhost:5173
     */
    public static function baseUrl(string $serverUrl, ?string $base): string {
        $base = $base ?? '/';
        return untrailingslashit($serverUrl . $base);
    }

    /**
     * Build server filesystem path, e.g. ABSPATH . base
     *
     * @param string $absPath Absolute filesystem path (e.g. ABSPATH)
     * @param string|null $base Base path from Vite config (e.g. /app/)
     * @return string Full filesystem path (e.g. ABSPATH . '/app')
     */
    public static function serverPath(string $absPath, ?string $base): string {
        $base = $base ?? '/';
        return untrailingslashit($absPath) . $base;
    }

    /**
     * Whether a path contains the configured base (and base is meaningful)
     *
     * @param string $path Path to check
     * @param string|null $base Configured base path
     * @return bool True when base is non-empty and found in path
     */
    public static function containsBase(string $path, ?string $base): bool {
        $base = (string) ($base ?? '');
        return $base !== '' && $base !== '/' && strpos($path, $base) !== false;
    }

    /**
     * Whether a URL contains the server base URL
     *
     * @param string $url URL to check
     * @param string $baseUrl Configured server base URL
     * @return bool True when baseUrl is non-empty and found in url
     */
    public static function containsServerUrl(string $url, string $baseUrl): bool {
        return $baseUrl !== '' && strpos($url, $baseUrl) !== false;
    }

    /**
     * Extract file name from a path by removing base/outDir prefix
     * Returns false if the composed prefix is not found.
     *
     * @param string $path   Full path or URL to extract from
     * @param string|null $base   Base path from Vite config (e.g. /app/)
     * @param string|null $outDir Output directory from Vite config (e.g. dist)
     * @return string|false Relative file name (e.g. js/app
     */
    public static function fileName(string $path, ?string $base, ?string $outDir): string|false {
        $clean  = self::removeQuery($path);
        $base   = rtrim((string) ($base ?? '/'), '/');
        $outDir = trim((string) ($outDir ?? ''), '/');

        // Default prefix is <base>/<outDir>/ when base is meaningful
        $prefix = $base;
        if ($outDir !== '') {
            $prefix .= '/' . $outDir;
        }
        $prefix = rtrim($prefix, '/') . '/';

        $pos = strpos($clean, $prefix);
        if ($pos === false) {
            // When base is root ('/' or empty), allow matching with just /<outDir>/
            if (($base === '' || $base === '/') && $outDir !== '') {
                $altPrefix = '/' . $outDir . '/';
                $posAlt    = strpos($clean, $altPrefix);
                if ($posAlt === false) {
                    return false;
                }
                $result = substr($clean, $posAlt + strlen($altPrefix));
                return $result !== '' ? $result : false;
            }
            return false;
        }

        $result = substr($clean, $pos + strlen($prefix));
        return $result !== '' ? $result : false;
    }

    /**
     * Vite client URL from a base URL
     *
     * @param string $baseUrl Base URL (e.g. http://localhost:5173)
     * @return string Full URL to Vite client (e.g. http://localhost:
     */
    public static function clientUrl(string $baseUrl): string {
        return $baseUrl . '/@vite/client';
    }

    /**
     * Vite plugin config URL from server URL
     *
     * @param string $serverUrl Vite server URL (e.g. http://localhost:5173)
     * @return string Full URL to vite-wordpress.json (e.g. http://localhost
     */
    public static function configUrl(string $serverUrl): string {
        return $serverUrl . '/vite-wordpress.json';
    }

    /**
     * Build a relative filesystem path from one directory to a target path.
     * Falls back to absolute target when no reasonable relation is found.
     *
     * @param string $fromDir Directory to start from
     * @param string $toPath  Target path to reach
     * @return string Relative path or absolute target when no relation found
     */
    public static function relativeLocalPath(string $fromDir, string $toPath): string {
        if ($fromDir === '' || $toPath === '') {
            return $toPath;
        }

        // Normalize separators to forward slashes for consistency
        $from = wp_normalize_path(untrailingslashit($fromDir));
        $to   = wp_normalize_path($toPath);

        // Early return if already relative
        if (!str_starts_with($to, '/') && !preg_match('/^[A-Za-z]:\//', $to)) {
            return $to;
        }

        $fromParts = array_values(array_filter(explode('/', $from), 'strlen'));
        $toParts   = array_values(array_filter(explode('/', $to), 'strlen'));

        // If roots differ (e.g., Windows drive letters), return absolute target
        if (!empty($fromParts) && !empty($toParts) && $fromParts[0] !== $toParts[0] && preg_match('/^[A-Za-z]:$/', $fromParts[0])) {
            return $to;
        }

        // Find common prefix length
        $i   = 0;
        $len = min(count($fromParts), count($toParts));
        while ($i < $len && $fromParts[$i] === $toParts[$i]) {
            $i++;
        }

        $upCount   = count($fromParts) - $i;
        $upParts   = $upCount > 0 ? array_fill(0, $upCount, '..') : [];
        $downParts = array_slice($toParts, $i);
        $relParts  = array_merge($upParts, $downParts);

        $rel = implode('/', $relParts);
        return $rel !== '' ? $rel : './';
    }
}
