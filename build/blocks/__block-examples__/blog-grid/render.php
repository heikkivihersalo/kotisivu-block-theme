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

/**
 * Localize variables for the script.
 */
$ajax = array(
    'ajax_url' => admin_url('admin-ajax.php'),
    'ajax_nonce' => wp_create_nonce('ajax-nonce')
);

$blog = array(
    'blog_paged' => 1
);

$inline_script = sprintf(
    'const %1$s = %2$s',
    'PHP_VARIABLES',
    json_encode(array_merge($ajax, $blog))
);

wp_add_inline_script('ksd-blog-grid-view-script', $inline_script, 'before');

/**
 * Get the blog posts.
 */
$post_type = 'post';
$post_count = wp_count_posts($post_type);
$query = new WP_Query(array(
    'post_type' => $post_type,
    'posts_per_page' => 6,
    'paged' => 1
));

?>
<div id="blog-post-container" class="blog-grid__container">
    <ul id="blog-post-list" class="blog-grid__list">
        <?php if ($query->have_posts()) : ?>
            <?php while ($query->have_posts()) : $query->the_post(); ?>
                <?php get_template_part('src/blocks/dynamic/blog-grid/includes/card'); ?>
            <?php endwhile; ?>
        <?php endif; ?>
    </ul>

    <?php echo $post_count->publish > 6 ? '<hr class="blog-grid__separator" />' : ''; ?>
    <div class="wp-block-button is-style-primary-outline is-content-justification-center is-layout-flex">
        <button class="wp-block-button__link wp-element-button" href="#!" id="blog-load-more" <?php echo $post_count->publish < 6 ? 'disabled' : ''; ?>>
            <?php _e('Show earlier posts', 'kotisivu-block-theme'); ?>
            <span class="blog-grid__button-arrow" aria-hidden="true">></span>
        </button>
    </div>
</div>

<?php wp_reset_postdata(); ?>