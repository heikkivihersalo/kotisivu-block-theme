<?php

/**
 * Render 404 content
 * @param array $block_attributes
 * @param string $content
 * @return string $html
 */
function render_site_404($block_attributes, $content) { ?>
    <?php ob_start(); ?>
    <section class="not-found-hero">
        <h1 class="not-found-hero__heading">404</h1>
        <p class="not-found-hero__text"><?php _e('Page not found', 'kotisivu-block-theme'); ?></p>
    </section>
    <section class="not-found-contact-us">
        <h2 class="not-found-contact-us__heading"><?php _e('Is there anything we can help you with?', 'kotisivu-block-theme'); ?></h2>
        <p class="not-found-contact-us__text"><?php _e('Please contact us', 'kotisivu-block-theme'); ?></p>
        <div class="not-found-contact-us__contact-wrapper">
            <?php echo do_blocks('<!-- wp:ksd/site-phone {"className":"footer__phone"} /-->'); ?>
            <?php echo do_blocks('<!-- wp:ksd/site-email {"className":"footer__email"} /-->'); ?>
        </div>
    </section>
    <?php return ob_get_clean(); ?>
<?php } ?>