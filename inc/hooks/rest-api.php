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
 * Add featured image to posts query
 */
function register_rest_images_for_posts() {
	register_rest_field(
		'post',
		'metadata',
		array(
			'get_callback' => function ( $data ) {
				$meta = get_post_meta( $data['id'], '', '' );
				$meta['featured_image'] = Utils::get_featured_image_meta( $data['id'], 'full' );
				return $meta;
			},
		)
	);
}

/**
 * Add featured image to media query
 */
function register_rest_images_for_media() {
	register_rest_field(
		'attachment',
		'metadata',
		array(
			'get_callback' => function ( $data ) {
				$meta = get_post_meta( $data['id'], '', '' );
				$meta['featured_image'] = Utils::get_featured_image_meta( $data['id'], 'medium' );
				return $meta;
			},
		)
	);
}
