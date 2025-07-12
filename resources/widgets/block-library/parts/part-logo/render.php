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

$logo         = wp_get_attachment_image_src(get_theme_mod('custom_logo'), 'full');
$company_name = $attributes['options']['contact-company-name'] ?? get_bloginfo('name');

if (false !== $logo) :
    $src    = $logo[0];
    $width  = 0 === $logo[1] ? '350px' : $logo[1];
    $height = 0 === $logo[2] ? '100%' : $logo[2];
else :
    $src    = '';
    $width  = '350px';
    $height = '100%';
endif;

?>

<div class="site-header__logo">
	<a class="site-header__logo__link" href="<?php echo get_home_url(); ?>" aria-label="<?php _e('Return back to homepage', 'kotisivu-block-theme'); ?>">
		<img src="<?php echo $src; ?>" width="<?php echo $width; ?>" height="<?php echo $height; ?>" alt="<?php echo $company_name; ?> Logo" aria-hidden="true" tabindex="-1" />
		<span class="is-visually-hidden"><?php echo get_bloginfo('name'); ?></span>
	</a>
</div>
