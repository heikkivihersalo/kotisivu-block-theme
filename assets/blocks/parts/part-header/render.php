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

$attributes = get_block_wrapper_attributes([
    'class' => 'site-header',
]);

?>

<header <?php echo wp_kses_data($attributes); ?>>
    <?php echo do_blocks('<!-- wp:ksd/logo {"className":"header__logo", "isLink":true} /-->'); ?>
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
    </nav>
</header>
