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
 * Get block wrapper attributes
 */
$attributes = get_block_wrapper_attributes(
    array(
     'class' => 'site-footer',
    )
);

/**
 * Get the user defined contact settings
 */
$contact = (new App\Models\Settings\Contact())->all();

?>

<footer <?php echo wp_kses_data($attributes); ?>>
    <div class="footer__top">
        <h2 style="display: flex; flex-direction: column; gap: 0.175em;">
            <span style="font-size: var(--wp--preset--font-size--small)"></span><?php echo $contact['name']; ?>
        </h2>
    </div>

    <div class="footer__bottom">
        <div class="footer__legal">
            <span class="footer__copyright">
                <?php echo __('©', 'kotisivu-block-theme') . ' ' . gmdate('Y') . ' ' . $contact['name']; ?>
            </span>
            <span class="footer__dot">&#x2022;</span>
            <nav class="footer__site-nav">
                <?php if (has_nav_menu('secondary-navigation')) : ?>
                    <?php
                    wp_nav_menu(
                        array(
                            'theme_location' => 'secondary-navigation',
                            'container'      => '',
                            'menu_class'     => 'footer__menu',
                            'menu_id'        => 'footer-navigation',
                        )
                    );
                    ?>
                <?php endif; ?>
            </nav>
        </div>
        <?php echo do_blocks('<!-- wp:ksd/part-social-icons {"className":"footer__socials"} /-->'); ?>
    </div>
</footer>
