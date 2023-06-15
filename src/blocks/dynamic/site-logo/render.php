<?php

/**
 * Get site logo content
 * @param array $logo 
 * @param bool $isLink 
 * @param string 
 * @return string 
 */
function get_site_logo_content(array $logo, bool $is_link, string $company_name, string $class_name): string {

    /**
     * If no logo is present, return site/blog name
     */
    if (!$logo) return get_bloginfo('name');

    /**
     * If logo is found, return logo either a link or as a div
     */
    $site_url = get_home_url();
    $site_name = isset($company_name) ? $company_name : get_bloginfo('name');

    $tag = $is_link ? 'a' : 'div';
    $href = $is_link ? 'href="' . $site_url . '"' : '';
    $src = $logo[0];
    $width = $logo[1];
    $height = $logo[2];
    $alt = $site_name . ' Logo';

    $string = sprintf(
        '<%s class="%s" %s aria-roledescription="logo">
            <img src="%s" width="%s" height="%s" alt="%s" aria-hidden="true" tabindex="-1" />
            <span class="is-visually-hidden">%s</span>
        </%s>',
        $tag,
        $class_name,
        $href,
        $src,
        $width,
        $height,
        $alt,
        $site_name,
        $tag
    );

    return $string;
}

/**
 * Render site logo block
 * @param block_attributes
 * @param content
 */
function render_site_logo($block_attributes, $content) {
    return get_site_logo_content(
        wp_get_attachment_image_src(get_theme_mod('custom_logo'), 'full'),
        $block_attributes['isLink'],
        $block_attributes["options"]['contact-company-name'],
        $block_attributes['className']
    );
}
