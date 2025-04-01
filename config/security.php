<?php

declare(strict_types=1);

return [

    /*
    |--------------------------------------------------------------------------
    | Remove WP & WooCommerce version
    |--------------------------------------------------------------------------
    | Define wrether to show WP and WooCommerce versioning or not.
    | This is a security measure to hide the versioning of the software.
    | Default: false (disabled)
    */

    'version' => false,

    /*
    |--------------------------------------------------------------------------
    | Remove Really Simple Discovery link
    |--------------------------------------------------------------------------
    | Default: false (disabled)
    */

    'rsd_links' => false,

    /*
    |--------------------------------------------------------------------------
    | Windows Live Writer manifest
    |--------------------------------------------------------------------------
    | Define whether to show the Windows Live Writer manifest or not.
    | The manifest is used by the Windows Live Writer application.
    | Default: false (disabled)
    */

    'wlwmanifest' => false,

    /*
    |--------------------------------------------------------------------------
    | XLM-RPC
    |--------------------------------------------------------------------------
    | Define whether to allow XML-RPC or not.
    | Default: false (disabled)
    */

    'xmlrpc' => false,

    /*
    |--------------------------------------------------------------------------
    | Repository Theme updates
    |--------------------------------------------------------------------------
    | Define whether to enable theme updates or not.
    | By default, WordPress will check for updates to themes and plugins
    | by checking the WordPress.org repository for matching theme/plugin slugs.
    |
    | This can lead to a security risk, as the theme/plugin slug is public information.
    | However we can disable this by blocking the update checks and endpoints.
    | Default: false (disabled)
    */

    'theme_updates' => false,

    /*
    |--------------------------------------------------------------------------
    | Post links
    |--------------------------------------------------------------------------
    | Define whether to show the post links or not.
    | Default: false (disabled)
    */

    'post_links' => false,

    /*
    |--------------------------------------------------------------------------
    | Shortlink
    |--------------------------------------------------------------------------
    | Define whether to show the shortlink or not.
    | Default: false (disabled)
    */

    'shortlink' => false,

    /*
    |--------------------------------------------------------------------------
    | Canonical
    |--------------------------------------------------------------------------
    | Define whether to show the canonical link or not.
    | Default: false (disabled)
    */

    'canonical' => false,

    /*
    |--------------------------------------------------------------------------
    | Feed links
    |--------------------------------------------------------------------------
    | Define whether to show the feed links or not.
    | Default: false (disabled)
    */

    'feed_links' => false,

    /*
    |--------------------------------------------------------------------------
    | REST API tags
    |--------------------------------------------------------------------------
    | Define whether to show the REST API tags or not.
    | Default: false (disabled)
    */

    'rest_api_tags' => false,

    /*
    |--------------------------------------------------------------------------
    | oEmbed links
    |--------------------------------------------------------------------------
    | Define whether to show the oEmbed links or not.
    | Default: false (disabled)
    */

    'oembed_links' => false,

    /*
    |--------------------------------------------------------------------------
    | Resource hints
    |--------------------------------------------------------------------------
    | Define whether to show the resource hints or not.
    | Default: false (disabled)
    */

    'resource_hints' => false,

    /*
    |--------------------------------------------------------------------------
    | Robots
    |--------------------------------------------------------------------------
    | Define whether to show the robots max image preview large or not.
    | Default: false (disabled)
    */

    'robots_max_image_preview_large' => false,

    /*
    |--------------------------------------------------------------------------
    | Emoji
    |--------------------------------------------------------------------------
    | Define whether to embed the emoji related scripts and styles or not.
    | Default: false (disabled)
    */

    'emoji' => false,

    /*
    |--------------------------------------------------------------------------
    | jQuery
    |--------------------------------------------------------------------------
    | Define jQuery related settings.
    | Default: false (disabled)
    */

    'jquery_to_footer' => true, // Move jQuery to footer
    'jquery_migrate' => false,


    /*
    |--------------------------------------------------------------------------
    | Gutenberg junk like duotone filters
    |--------------------------------------------------------------------------
    | Default: false (disabled)
    */

    'duotone_filters' => false,
];
