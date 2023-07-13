<?php

/**
 * Render global contact company opening hours callback
 * @param mixed $block_attributes 
 * @param mixed $content 
 * @return string|false 
 */
function render_site_hours($block_attributes, $content) { ?>
    <?php ob_start(); ?>
    <div class="site-contact site-contact--hours">
        <div class="site-contact__icon is-square-icon" aria-hidden="true" tabindex="-1" style="background-color: var(--_icon-background)">
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                <path fill="var(--_icon-color)" d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
            </svg>
        </div>
        <div class="site-contact__text">
            <?php echo $block_attributes["options"]['contact-opening-hours']; ?>
        </div>
    </div>
    <?php return ob_get_clean(); ?>
<?php } ?>