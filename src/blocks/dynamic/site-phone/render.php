<?php

/**
 * Check if string starts with another string
 * @param string $string 
 * @param string $startString 
 * @return bool 
 */
function startsWith($string, $startString) {
    $len = strlen($startString);
    return (substr($string, 0, $len) === $startString);
}

/**
 * Format phone number to Finnish format
 * @param mixed $num 
 * @return string 
 */
function format_phone_num($num): string {

    /**
     * If number is in correct format, return it
     */
    if (startsWith($num, '+358')) {
        return preg_replace('/\s+/', '', $num);
    }

    /**
     * If number is in local format (e.g. 0401234567), format it to Finnish format
     */
    if (startsWith($num, '0')) {
        switch ($num):
            case (startsWith($num, '040')):
                return preg_replace('/\s+/', '', sprintf(
                    "%s %s %s",
                    '+358' . substr($num, 1, 2),
                    substr($num, 3, 3),
                    substr($num, 6)
                ));
                break;
            case (startsWith($num, '050')):
                return preg_replace('/\s+/', '', sprintf(
                    "%s %s %s",
                    '+358' . substr($num, 1, 2),
                    substr($num, 3, 3),
                    substr($num, 6)
                ));
                break;
            case (startsWith($num, '044')):
                return preg_replace('/\s+/', '', sprintf(
                    "%s %s %s",
                    '+358' . substr($num, 1, 2),
                    substr($num, 3, 3),
                    substr($num, 6)
                ));
                break;
            case (startsWith($num, '045')):
                return preg_replace('/\s+/', '', sprintf(
                    "%s %s %s",
                    '+358' . substr($num, 1, 2),
                    substr($num, 3, 3),
                    substr($num, 6)
                ));
                break;
            case (startsWith($num, '09')):
                return preg_replace('/\s+/', '', sprintf(
                    "%s %s %s",
                    '+358' . substr($num, 1, 2),
                    substr($num, 3, 3),
                    substr($num, 6)
                ));
                break;
            default:
                return $num;
                break;
        endswitch;
    }

    return $num;
}

/**
 * Render global contact phone block
 * @param array $block_attributes 
 * @param string $content 
 * @return string 
 */
function render_site_phone($block_attributes, $content) { ?>
    <?php $contact = array(
        'phone' => $block_attributes['options']['contact-tel'],
        'icon' => 'fas fa-phone',
        'title' => __('Phone', 'kotisivu-block-theme'),
        'slug' => 'phone',
        'aria-label' => __('Phone', 'kotisivu-block-theme')
    ); ?>
    <?php ob_start(); ?>
    <a class="site-contact site-contact--phone" href="tel:<?php echo format_phone_num($contact['phone']) ?>" target="_blank" rel="noopener noreferrer" title="<?php echo __($contact['title'], 'kotisivu-block-theme'); ?>" aria-label="<?php echo __($contact['aria-label'], 'kotisivu-block-theme'); ?>" data-track="true" data-type="phone" data-label="Phone">
        <div class="site-contact__icon is-square-icon" aria-hidden="true" tabindex="-1" style="background-color: var(--_icon-background)">
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                <path fill="var(--_icon-color)" d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
            </svg>
        </div>
        <span class="site-contact__text"><?php echo $contact['phone'] ?></span>
    </a>
    <?php return ob_get_clean(); ?>
<?php } ?>