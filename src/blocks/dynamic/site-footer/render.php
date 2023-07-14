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
            <svg class="footer__contact-wrapper-icon" width="100%" height="100%" viewBox="0 0 63 63" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.5;">
                <g transform="matrix(0.934426,0,0,0.934426,-12.2008,-22.4795)">
                    <path d="M63.111,31.921C58.166,28.709 52.396,27 46.5,27C29.667,27 16,40.667 16,57.5C16,74.333 29.667,88 46.5,88C63.345,88 77,74.345 77,57.5C77,74.345 63.345,88 46.5,88C29.667,88 16,74.333 16,57.5C16,40.667 29.667,27 46.5,27C52.396,27 58.166,28.709 63.111,31.921Z" style="fill:none;stroke:var(--wp--preset--color--primary);stroke-width:5.89px;" />
                </g>
                <g transform="matrix(1,0,0,1,-14.0745,-27.25)">
                    <path d="M32,54L45.57,67.57L73.825,39.315" style="fill:none;stroke:var(--wp--preset--color--primary);stroke-width:5.5px;" />
                </g>
            </svg>
        </address>
        <div class="footer__contact-wrapper">
            <div class="footer__contact-heading"><?php echo __('Sales and<br> quote proposals', 'kotisivu-block-theme'); ?></div>
            <?php echo __('Phone', 'kotisivu-block-theme') . ': ' . do_blocks('<!-- wp:ksd/site-phone {"className":"footer__phone"} /-->') . '<br>'; ?>
            <?php echo __('Email', 'kotisivu-block-theme') . ': ' . do_blocks('<!-- wp:ksd/site-email {"className":"footer__email"} /-->'); ?>
            <svg class="footer__contact-wrapper-icon" width="100%" height="100%" viewBox="0 0 63 63" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.5;">
                <g transform="matrix(0.934426,0,0,0.934426,-12.2008,-22.4795)">
                    <path d="M63.111,31.921C58.166,28.709 52.396,27 46.5,27C29.667,27 16,40.667 16,57.5C16,74.333 29.667,88 46.5,88C63.345,88 77,74.345 77,57.5C77,74.345 63.345,88 46.5,88C29.667,88 16,74.333 16,57.5C16,40.667 29.667,27 46.5,27C52.396,27 58.166,28.709 63.111,31.921Z" style="fill:none;stroke:var(--wp--preset--color--primary);stroke-width:5.89px;" />
                </g>
                <g transform="matrix(1,0,0,1,-14.0745,-27.25)">
                    <path d="M32,54L45.57,67.57L73.825,39.315" style="fill:none;stroke:var(--wp--preset--color--primary);stroke-width:5.5px;" />
                </g>
            </svg>
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