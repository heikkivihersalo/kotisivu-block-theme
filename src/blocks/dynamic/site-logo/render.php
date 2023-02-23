<?php

function render_site_logo($block_attributes, $content) { ?>
    <?php $site_logo = wp_get_attachment_image_src(get_theme_mod('custom_logo'), 'thumbnail'); ?>

    <?php ob_start(); ?>
        <a href="<?php echo get_site_url(); ?>" class="site-logo" rel="home" aria-current="page">
            <?php if ($site_logo) : ?>
                <img class="site-logo__image" src="<?php echo $site_logo[0] ?>" width="<?php echo $site_logo[1] ?>" height="<?php echo $site_logo[2] ?>" alt="<?php echo get_bloginfo('name') . ' logo' ?>" />
            <?php else : ?>
                <?php echo get_bloginfo('name'); ?>
            <?php endif ?>
        </a>
    <?php return ob_get_clean(); ?>

<?php } ?>