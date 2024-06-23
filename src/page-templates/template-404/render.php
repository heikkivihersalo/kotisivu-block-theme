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

$block_custom_attributes = array(
	'class' => 'not-found-hero',
);
?>

<section <?php echo get_block_wrapper_attributes( $block_custom_attributes ); ?>>
	<h1 class="not-found-hero__heading">404</h1>
	<p class="not-found-hero__text"><?php _e( 'Page not found', 'kotisivu-block-theme' ); ?></p>
</section>
<section class="not-found-contact-us">
	<h2 class="not-found-contact-us__heading"><?php _e( 'Is there anything we can help you with?', 'kotisivu-block-theme' ); ?></h2>
	<p class="not-found-contact-us__text"><?php _e( 'Please contact us', 'kotisivu-block-theme' ); ?></p>
	<div class="not-found-contact-us__contact-wrapper">
		<?php echo do_blocks( '<!-- wp:ksd/site-phone {"className":"footer__phone"} /-->' ); ?>
		<?php echo do_blocks( '<!-- wp:ksd/site-email {"className":"footer__email"} /-->' ); ?>
	</div>
</section>