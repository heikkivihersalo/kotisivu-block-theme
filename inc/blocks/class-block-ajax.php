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
 *
 * @package Kotisivu\BlockTheme
 */
class BlockAjax {
	/**
	 * Constructor
	 * @return void
	 */
	public function __construct() {
	}

	public function load_more_blog_posts(): void {
		/**
		 * Check nonce
		 */
		check_ajax_referer( 'ajax-nonce', 'security' );

		/**
		 * Init variables
		 */
		$post_type      = 'post';
		$post_count     = wp_count_posts( $post_type );
		$posts_per_page = 6;
		$paged          = isset( $_POST['paged'] ) ? urldecode( (int) $_POST['paged'] ) : 1;
		$index          = 0;
		$response       = array(
			'posts'      => array(),
			'post_count' => $post_count->publish,
		);

		/**
		 * Get posts
		 */
		$query = new \WP_Query(
			array(
				'post_type'      => $post_type,
				'posts_per_page' => $posts_per_page,
				'orderby'        => 'date',
				'order'          => 'DESC',
				'post_status'    => 'publish',
				'paged'          => $paged,
			)
		);

		/**
		 * Append posts to response object
		 */
		if ( $query->have_posts() ) :
			while ( $query->have_posts() ) :
				$query->the_post();
				/**
				 * Get current post content from 'blog grid' -block folder
				 */
				ob_start();
				get_template_part( 'src/blocks/dynamic/blog-grid/includes/card' );
				$post_content = ob_get_clean();

				/**
				 * Create response
				 */
				$response['posts'][] = array(
					'index'     => $index,
					'date'      => get_the_date( get_option( 'date_format' ) ),
					'title'     => get_the_title(),
					'excerpt'   => get_the_excerpt(),
					'thumbnail' => get_the_post_thumbnail_url( get_the_ID(), 'full' ),
					'url'       => esc_url( get_permalink() ),
					'content'   => $post_content,
				);

				/**
				 * Update index
				 */
				++$index;
			endwhile;
		endif;

		/**
		 * Return a response
		 */
		echo wp_json_encode( $response );
		exit;
	}

	public function init(): void {
			add_action( 'wp_ajax_nopriv_load_more_posts', array( $this, 'load_more_blog_posts' ) );
			add_action( 'wp_ajax_load_more_posts', array( $this, 'load_more_blog_posts' ) );
	}
}
