<?php

function render_site_header($block_attributes, $content) { ?>
    <?php wp_enqueue_script('ksd-navigation-header-view-script') ?>
    <?php ob_start(); ?>
    <?php echo do_blocks('<!-- wp:ksd/site-logo {"className":"header__logo"} /-->'); ?>
    <nav class="header__site-nav">
        <?php get_template_part('inc/template-parts/header', 'nav-toggle'); ?>
        <?php if (has_nav_menu('primary-navigation')) : ?>
            <?php wp_nav_menu(array(
                'theme_location' => 'primary-navigation',
                'container' => '',
                'menu_class' => 'header__menu',
                'menu_id' => 'primary-navigation'
            )); ?>
        <?php endif; ?>
        <?php echo block_template_part('header-buttons'); ?>
    </nav>
    <?php return ob_get_clean(); ?>
<?php } ?>