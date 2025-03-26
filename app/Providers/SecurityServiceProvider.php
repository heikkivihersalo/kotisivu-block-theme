<?php

declare(strict_types=1);

namespace App\Providers;

use Vihersalo\Core\Bootstrap\WP_Hooks;
use Vihersalo\Core\Support\ServiceProvider;
use Vihersalo\Core\Support\Utils\Security as Utils;
use Vihersalo\Core\Support\Utils\Common as CommonUtils;

class SecurityServiceProvider extends ServiceProvider {
    /**
     * Register the navigation provider
     * @return void
     */
    public function register() {
        $loader = $this->app->make(WP_Hooks::class);

        $this->removeJsonApi($loader);
        $this->removeUnsecureEndpoints($loader);
        $this->setSecurityEnhancements($loader);
        $this->removeWpVersions($loader);
        $this->disableXmlrpc($loader);
    }

    /**
     * Register all of the hooks related to the API security enhancements
     * @param WP_Hooks $loader The loader to use
     * @return void
     */
    public function removeJsonApi(WP_Hooks $loader) {
        /**
         * Remove JSON API
         */
        $loader->addFilter('json_enabled', null, '__returnFalse');
        $loader->addFilter('json_jsonp_enabled', null, '__returnFalse');
        $loader->addFilter('rest_jsonp_enabled', null, '__returnFalse');
        $loader->addFilter('embed_oembed_discover', null, '__returnFalse');

        $loader->removeAction('wp_head', 'rest_output_link_wp_head', 10);
        $loader->removeAction('wp_head', 'wp_oembed_add_discovery_links', 10);
        $loader->removeAction('rest_api_init', 'wp_oembed_register_route');
        $loader->removeFilter('oembed_dataparse', 'wp_filter_oembed_result', 10);
        $loader->removeAction('wp_head', 'wp_oembed_add_discovery_links');
        $loader->removeAction('wp_head', 'wp_oembed_add_host_js');
        $loader->removeAction('template_redirect', 'rest_output_link_header', 11, 0);
    }

    /**
     * Register all of the hooks related to the API security enhancements
     * @param WP_Hooks $loader The loader to use
     * @return void
     */
    public function removeUnsecureEndpoints(WP_Hooks $loader) {
        $loader->addFilter('rest_endpoints', Utils::class, 'disableRestApiUserEndpoints');
    }

    /**
     * Register all of the hooks related to the security enhancements
     * @param WP_Hooks $loader The loader to use
     * @return void
     */
    public function setSecurityEnhancements(WP_Hooks $loader) {
        $loader->addAction('wp_default_scripts', $this, 'disableXmlrpc', 9999);
        $loader->addAction('template_redirect', Utils::class, 'disableAuthorPages');
        $loader->addFilter('http_request_args', Utils::class, 'disableThemeUpdate', 10, 2);
    }

    /**
     * Remove WordPress version from header
     * @param WP_Hooks $loader The loader to use
     * @return void
     */
    public function removeWpVersions(WP_Hooks $loader) {
        $loader->removeAction('wp_head', 'wp_generator');
        $loader->removeAction('wp_head', 'wc_generator_tag');
    }

    /**
     * Disable XML-RPC
     * @param WP_Hooks $loader The loader to use
     * @return void
     */
    public function disableXmlrpc(WP_Hooks $loader) {
        $loader->addFilter('xmlrpc_enabled', CommonUtils::class, 'returnFalse');
    }
}
