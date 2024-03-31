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

$sanitized_attributes = wp_kses_data(
    get_block_wrapper_attributes([
        'id' => 'primary',
        'class' => 'content-area',
    ])
);
?>

<div <?php echo $sanitized_attributes ?>>
    <main id="main" class="site-main">
        <?php echo do_blocks(
            sprintf('<!-- wp:ksd/%s /-->', $attributes['templateSlug'])
        ); ?>
    </main>
</div>