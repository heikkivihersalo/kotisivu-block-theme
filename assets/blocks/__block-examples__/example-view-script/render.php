<?php

/**
 * PHP file to use when rendering the block type on the server to show on the front end.
 *
 * The following variables are exposed to the file:
 *     $attributes (array): The block attributes.
 *     $content (string): The block default content.
 *     $block (WP_Block): The block instance.
 *
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

//
// Localize PHP variables for use in JavaScript.
// - Takes script handle and object name as arguments
// - Script handle is always in a format of 'ksd-[BLOCK_SLUG]-view-script'
//
add_action('wp_enqueue_scripts', function () {
    wp_localize_script('ksd-example-view-script-view-script', 'rossySettings', [
        'nonce' => wp_create_nonce('wp_rest'), // Nonce for REST API authentication (must be used in all REST API requests)
        'lang' => function_exists('pll_current_language') ? pll_current_language() : get_locale(), // Current language
    ]);
});

?>
<div id="example-view-script" class="example-view-script">