<?php

/**
 * Get site logo content
 * @param mixed|array|bool $logo 
 * @param bool $isLink 
 * @param string 
 * @return string 
 */
function get_site_logo_content(mixed $logo, bool $is_link, string $company_name, string $class_name): string {

    /**
     * If no logo is present, return site/blog name
     */
    if (!$logo) return $company_name;

    /**
     * If logo is found, return logo either a link or as a div
     */
    $site_url = get_home_url();

    $tag = $is_link ? 'a' : 'div';
    $href = $is_link ? 'href="' . $site_url . '"' : '';
    $src = $logo[0];
    $width = $logo[1] == 0 ? '350px' : $logo[1];
    $height = $logo[2] == 0 ? '100%' : $logo[2];
    $alt = $company_name . ' Logo';
    $aria_label = $is_link ? 'aria-label="' . __('Return back to homepage', 'kotisivu-block-theme') . '"' : '';

    $string = sprintf(
        '<%s class="%s" %s aria-roledescription="logo" %s>
            <img src="%s" width="%s" height="%s" alt="%s" aria-hidden="true" tabindex="-1" />
            <span class="is-visually-hidden">%s</span>
        </%s>',
        $tag,
        $class_name,
        $href,
        $aria_label,
        $src,
        $width,
        $height,
        $alt,
        $company_name,
        $tag
    );

    return $string;
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

$logo = wp_get_attachment_image_src(get_theme_mod('custom_logo'), 'full');
$isLink = isset($attributes['isLink']) ? $attributes['isLink'] : false;
$className = isset($attributes['className']) ? $attributes['className'] : "";
$companyName = isset($attributes["options"]['contact-company-name']) ? $attributes["options"]['contact-company-name'] : get_bloginfo('name');

echo get_site_logo_content($logo, $isLink, $companyName, $className);
