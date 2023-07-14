<?php
/**
 * Render global contact company name callback
 * @param mixed $block_attributes 
 * @param mixed $content 
 * @return string|false 
 */
function render_site_company_name($block_attributes, $content) { ?>
    <?php $contact = array(
        'name' => isset($block_attributes["options"]['contact-company-name']) ? $block_attributes["options"]['contact-company-name'] : '',
        'icon' => 'fa fa-home'
    ); ?>
    <?php ob_start(); ?>
    <h3 class="site-contact site-contact--company-name">
        <i class="site-contact__icon <?php echo $contact['name'] ?>" aria-hidden="true"></i>
        <?php echo $contact['name'] ?>
    </h3>
    <?php return ob_get_clean(); ?>
<?php } ?>