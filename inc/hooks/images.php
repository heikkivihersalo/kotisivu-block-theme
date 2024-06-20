<?php

namespace Kotisivu\BlockTheme;

defined('ABSPATH') or die();

/**
 * Add custom image options for WordPress
 * @param mixed $sizes 
 * @return void 
 */
function modify_default_image_sizes(mixed $sizes): void {
    if (empty($sizes)) return;

    /* Update default core image sizes */
    foreach ($sizes as $size) :
        update_option($size['slug'] . '_w', $size['width']);
        update_option($size['slug'] . '_h', $size['height']);
    endforeach;

    /* Add new image sizes to core */
    foreach ($sizes as $size) :
        add_image_size($size['slug'], $size['width'], $size['height']);
    endforeach;
}

/**
 * Add custom image options to admin interface
 * @param mixed $sizes 
 * @return array 
 */
function add_custom_image_sizes(mixed $sizes): array {
    $custom_images = [];

    foreach (SITE_IMAGE_SIZES["customSizes"] as $image) :
        $custom_images[$image['slug']] = $image['name'];
    endforeach;

    return array_merge($sizes, $custom_images);
}
