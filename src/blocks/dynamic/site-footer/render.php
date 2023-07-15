<?php

function render_site_footer($block_attributes, $content) { ?>
    <?php $contact = array(
        'phone' => isset($block_attributes["options"]['contact-phone']) ? $block_attributes["options"]['contact-phone'] : '',
        'email' => isset($block_attributes["options"]['contact-email']) ? $block_attributes["options"]['contact-email'] : '',
        'address' => isset($block_attributes["options"]['contact-address']) ? $block_attributes["options"]['contact-address'] : '',
        'name' => isset($block_attributes["options"]['contact-company-name']) ? $block_attributes["options"]['contact-company-name'] : '',
        'id' => isset($block_attributes["options"]['contact-company-id']) ? $block_attributes["options"]['contact-company-id'] : ''
    ); ?>

    <?php
    /** 
     * Start Capture 
     */
    ob_start();
    ?>

    <div class="footer__top-row">
        <?php echo block_template_part('footer-logo'); ?>
        <address class="footer__contact-wrapper">
            <?php echo $contact['address'] . '<br>'; ?>
            <?php echo __('VAT ID', 'kotisivu-block-theme') . ': ' . $contact['id'] ?>
        </address>
        <div class="footer__contact-wrapper">
            <?php echo __('Phone', 'kotisivu-block-theme') . ': ' . do_blocks('<!-- wp:ksd/site-phone {"className":"footer__phone"} /-->') . '<br>'; ?>
            <?php echo __('Email', 'kotisivu-block-theme') . ': ' . do_blocks('<!-- wp:ksd/site-email {"className":"footer__email"} /-->'); ?>
        </div>
    </div>

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

    <?php
    /** 
     * End Capture and return
     */
    return ob_get_clean();
    ?>
<?php } ?>