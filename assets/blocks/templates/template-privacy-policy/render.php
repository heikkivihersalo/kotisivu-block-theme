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

$attributes = get_block_wrapper_attributes([
    'class' => 'content-area',
]);

?>

<div id="primary" <?php echo wp_kses_data($attributes); ?>>
    <main id="main" class="site-main">
        <h1><?php the_title(); ?></h1>
        <?php the_content(); ?>
    </main>
</div>