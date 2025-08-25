<?php

declare(strict_types=1);

namespace App\Providers;

use App\Services\Vite\DevServer;
use Vihersalo\Core\Contracts\Container;
use Vihersalo\Core\Foundation\ServiceProvider;

/**
 * Vite Development Server Provider
 *
 * This provider sets up HMR (Hot Module Replacement) support
 * when the Vite development server is running
 */
class ViteDevServerProvider extends ServiceProvider {
    /**
     * Register the service
     */
    public function register(Container $container): void {
        $container->singleton(DevServer::class, function () {
            return new DevServer();
        });
    }

    /**
     * Boot the service
     */
    public function boot(Container $container): void {
        // Only register dev server in development mode
        if (defined('WP_DEBUG') && WP_DEBUG) {
            $devServer = $container->make(DevServer::class);

            // Configure dev server
            $devServer
                ->setHost($this->getDevServerHost())
                ->setPort($this->getDevServerPort())
                ->register();
        }
    }

    /**
     * Get the development server host
     */
    protected function getDevServerHost(): string {
        // Allow override via environment or use site URL
        return $_ENV['VITE_DEV_SERVER_HOST'] ?? get_site_url();
    }

    /**
     * Get the development server port
     */
    protected function getDevServerPort(): int {
        // Allow override via environment or use default
        return (int) ($_ENV['VITE_DEV_SERVER_PORT'] ?? 5173);
    }
}
