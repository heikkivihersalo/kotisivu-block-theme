<?php

function get_query_args($attributes, $post_type) {
    return array(
        'post_type' => $post_type,
        'posts_per_page' => 6,
        'paged' => 1
    );
}

function localize_blog_grid() {
    $ajax = array(
        'ajax_url' => admin_url('admin-ajax.php'),
        'ajax_nonce' => wp_create_nonce('ajax-nonce')
    );

    $blog = array(
        'blog_paged' => 1
    );

    /* Inline */
    $inline_script = sprintf(
        'const %1$s = %2$s',
        'PHP_VARIABLES',
        json_encode(array_merge($ajax, $blog))
    );

    wp_add_inline_script('ksd-blog-grid-view-script', $inline_script, 'before');
}

function render_blog_grid($block_attributes, $content) { ?>
    <?php wp_enqueue_script('ksd-blog-grid-view-script') ?>
    <?php localize_blog_grid(); ?>

    <?php $post_type = 'post' ?>
    <?php $post_count = wp_count_posts($post_type) ?>
    <?php $query = new WP_Query(get_query_args($block_attributes, $post_type)); ?>
    <?php ob_start(); ?>

    <div id="blog-post-container" class="blog-grid__container">
        <ul id="blog-post-list" class="blog-grid__list">
            <?php if ($query->have_posts()) : ?>

                <?php while ($query->have_posts()) : $query->the_post(); ?>
                    <?php get_template_part('blocks/src/templates/post', 'card'); ?>
                <?php endwhile; ?>

            <?php endif; ?>
        </ul>
        <?php echo $post_count->publish > 6 ? '<hr class="blog-grid__separator" />' : ''; ?>
        <div class="wp-block-button">
            <button class="wp-block-button__link wp-element-button" href="#!" id="blog-load-more" <?php echo $post_count->publish < 6 ? 'disabled' : ''; ?>>
                <?php echo __('Show earlier posts', 'kotisivu-block-theme'); ?>
                <svg class="wp-block-button__icon" width="100%" height="100%" viewBox="0 0 815 507" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.5;">
                    <g transform="matrix(1,0,0,1,7.5,-101.081)">
                        <path d="M0,108.581L400,600L800,108.581" style="fill:none;stroke:var(--_color);stroke-width:var(--_stroke-width);" />
                    </g>
                </svg>
            </button>
        </div>
    </div>

    <?php wp_reset_postdata(); ?>
    <?php return ob_get_clean(); ?>

<?php } ?>