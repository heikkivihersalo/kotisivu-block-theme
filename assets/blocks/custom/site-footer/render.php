<?php
function format_footer_business_id(string $business_id, string $vat_number): string {
    /**
     * If site uses Polylang, check if current language is Finnish
     */
    if (function_exists('pll_current_language')) {
        $current_lang = pll_current_language();
        if ($current_lang !== 'fi') {
            return __('VAT', 'kotisivu-block-theme') . ': ' . $vat_number;
        }
    }

    /**
     * If site does not use translation plugin, check if current language is Finnish
     */
    if (get_locale() !== 'fi') {
        return __('VAT', 'kotisivu-block-theme') . ': ' . $vat_number;
    }

    /**
     * Return business id (site is in Finnish)
     */
    return __('Business ID', 'kotisivu-block-theme') . ': ' . $business_id;
}

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

$contact = array(
    'phone' => isset($attributes["options"]['contact-phone']) ? $attributes["options"]['contact-phone'] : '',
    'email' => isset($attributes["options"]['contact-email']) ? $attributes["options"]['contact-email'] : '',
    'address' => isset($attributes["options"]['contact-address']) ? $attributes["options"]['contact-address'] : '',
    'name' => isset($attributes["options"]['contact-company-name']) ? $attributes["options"]['contact-company-name'] : get_bloginfo('name'),
    'id' => isset($attributes["options"]['contact-business-id']) ? $attributes["options"]['contact-business-id'] : '',
    'vat' => isset($attributes["options"]['contact-vat-number']) ? $attributes["options"]['contact-vat-number'] : ''
);
?>

<div class="footer__top">
    <div class="footer__column">
        <?php echo do_blocks('<!-- wp:ksd/site-logo {"className":"footer__logo", "isLink": false} /-->'); ?>
        <p class="footer__description"><?php echo get_bloginfo('description'); ?></p>
    </div>
    <div class="footer__column">
        <h2><?php _e('Company', 'kotisivu-block-theme'); ?></h2>
        <address class="footer__contact">
            <?php echo $contact['name']; ?><br>
            <?php echo $contact['address']; ?><br>
            <?php echo format_footer_business_id($contact['id'], $contact['vat']); ?>
        </address>
    </div>
    <div class="footer__column">
        <h2><?php _e('Contact Us', 'kotisivu-block-theme'); ?></h2>
        <div class="footer__site-contact-wrapper">
            <?php echo do_blocks('<!-- wp:ksd/site-phone {"className":"footer__phone"} /-->'); ?>
            <?php echo do_blocks('<!-- wp:ksd/site-email {"className":"footer__email"} /-->'); ?>
        </div>
    </div>
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
    <?php echo do_blocks('<!-- wp:ksd/site-social {"className":"footer__socials"} /-->'); ?>
</div>