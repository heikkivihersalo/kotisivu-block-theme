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

$contact = array(
    'name' => isset($attributes["options"]['contact-company-name']) ? $attributes["options"]['contact-company-name'] : '',
    'icon' => 'fa fa-home'
);

?>

<h3 class="site-contact site-contact--company-name is-layout-flex is-content-alignment-center has-small-gap">
    <i class="site-contact__icon <?php echo $contact['name'] ?>" aria-hidden="true"></i>
    <?php echo $contact['name'] ?>
</h3>