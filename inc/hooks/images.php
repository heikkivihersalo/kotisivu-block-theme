<?php
/**
 *
 *
 * @package Kotisivu\BlockTheme
 * @since 1.0.0
 */

namespace Kotisivu\BlockTheme;

defined( 'ABSPATH' ) || die();

/**
 * Add custom image options for WordPress
 *
 * @param mixed $sizes Image sizes
 * @return void
 */
function register_image_sizes(): void {
	/* Update default core image sizes */
	foreach ( SITE_SETTINGS['image_sizes']['default'] as $size ) :
		update_option( $size['slug'] . '_size_w', $size['width'] );
		update_option( $size['slug'] . '_size_h', $size['height'] );
	endforeach;

	/* Add new image sizes to core */
	foreach ( SITE_SETTINGS['image_sizes']['custom'] as $size ) :
		add_image_size( $size['slug'], $size['width'], $size['height'], false );
	endforeach;
}

/**
 * Remove default image sizes from WordPress
 *
 * @param mixed $sizes Image sizes
 * @return mixed
 */
function remove_default_image_sizes( mixed $sizes ): mixed {
	unset( $sizes['1536x1536'] ); // remove 1536x1536 image size
	unset( $sizes['2048x2048'] ); // remove 2048x2048 image size

	return $sizes;
}

/**
 * Add custom image options to admin interface
 *
 * @param mixed $sizes Image sizes
 * @return array
 */
function add_custom_image_sizes_to_admin( mixed $sizes ): array {
	$custom_images = array();

	foreach ( SITE_SETTINGS['image_sizes']['custom'] as $image ) :
		$custom_images[ $image['slug'] ] = $image['name'];
	endforeach;

	return array_merge( $sizes, $custom_images );
}

function replace_image_markup( $block_content, $block ) {
	if ( 'core/image' !== $block['blockName'] ) {
		return $block_content;
	}

	$classes  = $block['attrs']['className'] ?? '';
	$sizeSlug = $block['attrs']['sizeSlug'] ?? 'full';

	return wp_get_attachment_image(
		$block['attrs']['id'],
		$sizeSlug,
		false,
		array(
			'class' => 'wp-block-image' . ' size-' . $sizeSlug . ' ' . $classes,
		)
	);
}
