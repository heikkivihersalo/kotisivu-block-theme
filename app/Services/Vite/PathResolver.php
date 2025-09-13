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
     */
    public static function removeQuery(string $path): string {
        return (string) preg_replace('/\?.*$/', '', $path);
    }

    /**
     * Build the Vite server URL from host and port
     */
    public static function serverUrl(string $host, string $port): string {
        return rtrim($host, '/') . ':' . ltrim($port, ':');
    }

    /**
     * Build base URL, e.g. http://localhost:5173/app
     */
    public static function baseUrl(string $serverUrl, ?string $base): string {
        $base = $base ?? '/';
        return untrailingslashit($serverUrl . $base);
    }

    /**
     * Build server filesystem path, e.g. ABSPATH . base
     */
    public static function serverPath(string $absPath, ?string $base): string {
        $base = $base ?? '/';
        return untrailingslashit($absPath) . $base;
    }

    /**
     * Whether a path contains the configured base (and base is meaningful)
     */
    public static function containsBase(string $path, ?string $base): bool {
        $base = (string) ($base ?? '');
        return $base !== '' && $base !== '/' && strpos($path, $base) !== false;
    }

    /**
     * Whether a URL contains the server base URL
     */
    public static function containsServerUrl(string $url, string $baseUrl): bool {
        return $baseUrl !== '' && strpos($url, $baseUrl) !== false;
    }

    /**
     * Extract file name from a path by removing base/outDir prefix
     * Returns false if the composed prefix is not found.
     */
    public static function fileName(string $path, ?string $base, ?string $outDir): string|false {
        $clean  = self::removeQuery($path);
        $base   = rtrim((string) ($base ?? '/'), '/');
        $outDir = trim((string) ($outDir ?? ''), '/');

        $prefix = $base;
        if ($outDir !== '') {
            $prefix .= '/' . $outDir;
        }
        $prefix = rtrim($prefix, '/') . '/';

        $pos = strpos($clean, $prefix);
        if ($pos === false) {
            return false;
        }

        $result = substr($clean, $pos + strlen($prefix));
        return $result !== '' ? $result : false;
    }

    /**
     * Vite client URL from a base URL
     */
    public static function clientUrl(string $baseUrl): string {
        return $baseUrl . '/@vite/client';
    }

    /**
     * Vite plugin config URL from server URL
     */
    public static function configUrl(string $serverUrl): string {
        return $serverUrl . '/vite-wordpress.json';
    }

    /**
     * Build a relative filesystem path from one directory to a target path.
     * Falls back to absolute target when no reasonable relation is found.
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
