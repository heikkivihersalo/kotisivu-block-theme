<?php

function render_site_header($block_attributes, $content) { ?>
    <?php wp_enqueue_script('ksd-navigation-header-view-script') ?>
    <?php ob_start(); ?>
    <?php echo do_blocks('<!-- wp:ksd/site-logo {"className":"header__logo"} /-->'); ?>
    <nav class="header__site-nav">
        <button class="header__toggle" aria-controls="primary-navigation" aria-expanded="false">
            <span class="is-visually-hidden"><?php _e('Menu', 'kotisivu-block-theme'); ?></span>
            <svg fill="var(--_toggle-color)" viewBox="0 0 100 100" width="50" aria-hidden="true">
                <rect class="line top" width="80" height="10" x="10" y="25" rx="5">
                </rect>
                <rect class="line middle" width="80" height="10" x="10" y="45" rx="5">
                </rect>
                <rect class="line bottom" width="80" height="10" x="10" y="65" rx="5">
                </rect>
            </svg>
        </button>
        <?php if (has_nav_menu('primary-navigation')) : ?>
            <?php wp_nav_menu(array(
                'theme_location' => 'primary-navigation',
                'container' => '',
                'menu_class' => 'header__menu',
                'menu_id' => 'primary-navigation'
            )); ?>
        <?php endif; ?>
        <?php echo do_blocks('<!-- wp:ksd/dark-mode-toggle /-->'); ?>
        <?php echo block_template_part('header-buttons'); ?>
    </nav>
    <?php return ob_get_clean(); ?>
<?php } ?>