<?php ?>
<li class="blog-grid__item" data-url="<?php echo esc_url(get_permalink()); ?>">
    <?php $author_name = get_the_author_meta('display_name'); ?>
    <?php $author_id = get_the_author_meta('ID'); ?>
    <?php $author_profile_image = get_avatar($author_id, 96); ?>
    <h3 class="blog-grid__title"><?php echo get_the_title(); ?></h3>
    <div class="blog-grid__author">
        <?php echo $author_profile_image; ?>
        <span class="blog-grid__author-name"><?php echo $author_name; ?></span>
        <time class="blog-grid__date" datetime="<?php echo get_the_date('c'); ?>">
            <?php echo get_the_date(get_option('date_format')); ?>
        </time>
    </div>

    <p class="blog-grid__excerpt"><?php echo get_the_excerpt(); ?></p>

    <?php $image_id = get_post_thumbnail_id(); ?>
    <?php if ($image_id) : ?>
        <?php $image_meta = wp_get_attachment_image_src($image_id, 'medium'); ?>
        <img class="blog-grid__image" src="<?php echo $image_meta[0]; ?>" alt="<?php echo get_post_meta($image_id, '_wp_attachment_image_alt', TRUE); ?>" title="<?php echo get_the_title($image_id); ?>" width="<?php echo $image_meta[1]; ?>" height="<?php echo $image_meta[2]; ?>">
    <?php else : ?>
        <img class="blog-grid__image" src="" />
    <?php endif; ?>

    <div class="blog-grid__button wp-block-button is-style-primary-fill">
        <a class="wp-block-button__link wp-element-button" href="<?php echo esc_url(get_permalink()); ?>">
            <?php _e('Read more', 'kotisivu-block-theme'); ?>
        </a>
    </div>
</li>