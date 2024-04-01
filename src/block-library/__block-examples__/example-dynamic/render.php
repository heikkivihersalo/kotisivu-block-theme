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
// Takes script handle and object name as arguments.
// Script handle is always in a format of 'ksd-[BLOCK_SLUG]-view-script'.
//
add_action('wp_enqueue_scripts', function () {
    wp_localize_script('ksd-example-dynamic-view-script', 'rossySettings', [
        'lang' => function_exists('pll_current_language') ? pll_current_language() : get_locale(),
    ]);
});

?>
<section id="example-dynamic" class="example-dynamic">
    <div class="example-dynamic__content">
        <?php
        // This is the content that the user sees in the editor.
        echo $content;
        ?>
    </div>
</section>