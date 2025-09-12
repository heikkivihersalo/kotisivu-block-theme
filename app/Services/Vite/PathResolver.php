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
     * Return a block.json local file path relative reference
     * like: file:./../relative/path.php
     */
    public static function relativeLocalPath(string $from, string $to): string {
        $fromParts = explode(DIRECTORY_SEPARATOR, rtrim($from, DIRECTORY_SEPARATOR));
        $toParts   = explode(DIRECTORY_SEPARATOR, rtrim($to, DIRECTORY_SEPARATOR));

        // Remove common prefix
        while ($fromParts && $toParts && $fromParts[0] === $toParts[0]) {
            array_shift($fromParts);
            array_shift($toParts);
        }

        return 'file:./' . str_repeat('..' . DIRECTORY_SEPARATOR, count($fromParts)) . implode(DIRECTORY_SEPARATOR, $toParts);
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
}
