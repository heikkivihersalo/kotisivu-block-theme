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

use Kotisivu\BlockTheme\Utils;

//
// Get block wrapper attributes
//
$attributes = get_block_wrapper_attributes([
    'class' => 'site-footer',
]);

//
// Get site options
//
$options = Utils::get_options_file('site-options');
$contact = array(
    'phone' => isset($options['contact-phone']) ? $options['contact-phone'] : '',
    'email' => isset($options['contact-email']) ? $options['contact-email'] : '',
    'address' => isset($options['contact-address']) ? $options['contact-address'] : '',
    'name' => isset($options['contact-company-name']) ? $options['contact-company-name'] : get_bloginfo('name'),
    'id' => isset($options['contact-business-id']) ? $options['contact-business-id'] : '',
    'vat' => isset($options['contact-vat-number']) ? $options['contact-vat-number'] : ''
);

?>

<footer <?php echo wp_kses_data($attributes); ?>>
    <div class="footer__top">
        <h2 style="display: flex; flex-direction: column; gap: 0.175em;"><span style="font-size: var(--wp--preset--font-size--small)"></span><?php echo $contact['name']; ?></h2>
    </div>

    <div class="footer__bottom">
        <div class="footer__legal">
            <span class="footer__copyright"><?php echo __('©', 'kotisivu-block-theme') . ' ' . date('Y') . ' ' . $contact['name']; ?></span>
            <span class="footer__dot">&#x2022;</span>
            <nav class="footer__site-nav">
                <?php if (has_nav_menu('secondary-navigation')) : ?>
                    <?php wp_nav_menu(array(
                        'theme_location' => 'secondary-navigation',
                        'container' => '',
                        'menu_class' => 'footer__menu',
                        'menu_id' => 'footer-navigation'
                    )); ?>
                <?php endif; ?>
            </nav>
        </div>
        <?php echo do_blocks('<!-- wp:ksd/part-social-icons {"className":"footer__socials"} /-->'); ?>
    </div>
</footer>