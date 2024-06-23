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

$attributes = get_block_wrapper_attributes(
	array(
		'role'       => 'banner',
		'class'      => 'site-header',
		'data-modal' => 'closed',
	)
);

?>
<header <?php echo wp_kses_data( $attributes ); ?>>
	<?php echo do_blocks( '<!-- wp:ksd/part-logo-dynamic /-->' ); ?>
	<?php echo do_blocks( '<!-- wp:ksd/part-nav-header /-->' ); ?>
</header>