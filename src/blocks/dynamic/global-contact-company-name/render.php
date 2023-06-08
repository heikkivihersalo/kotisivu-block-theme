<?php
/**
 * Render global contact company name callback
 * @param mixed $block_attributes 
 * @param mixed $content 
 * @return string|false 
 */
function render_global_contact_company_name($block_attributes, $content) { ?>
    <?php $contact = array(
        'name' => $block_attributes["options"]['contact-company-name'],
        'icon' => 'fa fa-home'
    ); ?>
    <?php ob_start(); ?>
    <h3 class="global-contact global-contact--company-name">
        <i class="global-contact__icon <?php echo $contact['name'] ?>" aria-hidden="true"></i>
        <?php echo $contact['name'] ?>
    </h3>
    <?php return ob_get_clean(); ?>
<?php } ?>