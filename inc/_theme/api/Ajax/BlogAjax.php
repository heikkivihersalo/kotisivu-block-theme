<?php
/**
 * The blog ajax class
 *
 * @link       https://www.kotisivu.dev
 * @since      2.0.0
 *
 * @package    Kotisivu\BlockTheme\Api\Ajax
 */

namespace Kotisivu\BlockTheme\Theme\Api\Ajax;

defined( 'ABSPATH' ) || die();

/**
 * The blog ajax class
 *
 * @since      2.0.0
 * @package    Kotisivu\BlockTheme\Api\Ajax
 * @author     Heikki Vihersalo <heikki@vihersalo.fi>
 */
final class BlogAjax {
	/**
	 * Get next page of posts via AJAX
	 *
	 * @return void
	 */
	public static function get_next_page() {
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
				 * Get current post content
				 */
				ob_start();
				get_template_part( 'src/page-templates/template-home/includes/card' );
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
}
