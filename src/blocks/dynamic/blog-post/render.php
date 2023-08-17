<?php

/**
 * Get the total reading time of a post
 * @param string $content
 * @return string $reading_time
 */
function get_reading_time($content) {
    $word_count = str_word_count(strip_tags($content));
    $reading_time = ceil($word_count / 200) == 0 ? 1 : ceil($word_count / 200);

    return $reading_time . ' ' . __('min read', 'kotisivu-block-theme');
}

/**
 * Render blog post
 * @param array $block_attributes
 * @param string $content
 * @return string $html
 */
function render_blog_post($block_attributes, $content) { ?>
    <?php global $post; ?>
    <?php $author_id = $post->post_author; ?>
    <?php $author_name = get_the_author_meta('display_name', $author_id); ?>
    <?php $author_image = get_avatar_url($author_id); ?>
    <?php $tags = get_the_tags(); ?>

    <?php ob_start(); ?>
    <article class="post-container">
        <div class="post-hero">
            <h1 class="post-hero__heading"><?php echo get_the_title(); ?></h1>
            <img class="post-hero__image" src="<?php echo get_the_post_thumbnail_url(); ?>" alt="<?php echo get_the_title(); ?>">
            <div class="post-hero__meta">
                <div>
                    <img class="post-hero__author-image" src="<?php echo $author_image; ?>">
                </div>
                <div>
                    <p class="post-hero__author"><?php echo $author_name; ?></p>
                    <div class="post-hero__date"><span class="post-hero__reading-time"><?php echo get_reading_time($content); ?></span><time class="post-hero__published-date" datetime="<?php echo the_time('c') ?>"><?php echo get_the_date(get_option('date_format')); ?></time></div>
                </div>
            </div>
            <div class="post-hero__tags">
                <?php if ($tags) : ?>
                    <?php foreach ($tags as $tag) { ?>
                        <a href="<?php echo get_tag_link($tag->term_id); ?>">#<?php echo $tag->name; ?></a>
                    <?php } ?>
                <?php endif; ?>
            </div>
        </div>
        <div class="post-content">
            <?php echo get_the_content(); ?>
        </div>
    </article>
    <?php return ob_get_clean(); ?>
<?php } ?>