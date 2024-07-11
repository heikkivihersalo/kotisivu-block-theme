<?php
/**
 * PHP file to use when rendering the block type on the server to show on the front end.
 *
 * The following variables are exposed to the file:
 *     $attributes (array): The block attributes.
 *     $content (string): The block default content.
 *     $block (WP_Block): The block instance.
 *
 * Template file will be wrapped with `template-main` block.
 * It is used to keep the same structure for all templates and to avoid code duplication.
 * CSS classes can be passed in WordPress HTML -template which will be added to content area.
 *
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

/**
 * Get home page ID
 */
$home_id = get_option( 'page_for_posts' );

/**
 * Localize variables for the script.
 */
wp_add_inline_script(
	'ksd-template-home-view-script',
	sprintf(
		'const %s = %s',
		'AJAX',
		wp_json_encode(
			array(
				'url'   => admin_url( 'admin-ajax.php' ),
				'nonce' => wp_create_nonce( 'ajax-nonce' ),
				'paged' => 1,
			)
		)
	),
	'before'
);

/**
 * Get the blog posts.
 */
$post_count = wp_count_posts( 'post' );
$query      = new WP_Query(
	array(
		'post_type'      => 'post',
		'posts_per_page' => 6,
		'paged'          => 1,
	)
);

?>

<section class="hero">
	<h1 class="hero__heading"><?php echo get_the_title( $home_id ); ?></h1>
	<?php echo get_the_post_thumbnail( $home_id, 'full', array( 'class' => 'hero__image' ) ); ?>
</section>
<section class="posts">
	<div id="posts-container" class="posts__container">
		<ul id="posts-list" class="posts__list">
			<?php if ( $query->have_posts() ) : ?>
				<?php
				while ( $query->have_posts() ) :
					$query->the_post();
					?>
					<?php get_template_part( 'src/page-templates/template-home/includes/card' ); ?>
				<?php endwhile; ?>
			<?php endif; ?>
		</ul>

		<?php echo $post_count->publish > 6 ? '<hr class="posts__separator" />' : ''; ?>
		<button id="load-next-posts" class="posts__button wp-block-button__link wp-element-button" href="" <?php echo $post_count->publish < 6 ? 'disabled' : ''; ?>>
			<?php _e( 'Show earlier posts', 'kotisivu-block-theme' ); ?>
		</button>
	</div>
</section>
