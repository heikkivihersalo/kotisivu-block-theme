<?php

namespace Kotisivu\BlockTheme;

defined('ABSPATH') or die();

/**
 * Add Rest API filters to modify the theme behavior
 * 
 * @package Kotisivu\BlockTheme 
 */

class Rest {
    /**
     * Constructor
     * @return void 
     */
    public function __construct() {
    }

    /**
     * Get featured image metadata
     * @param mixed $id
     * @param string $size
     * @return array
     */
    public function get_featured_image_meta(mixed $post_id, string $size = 'medium') {
        $id = get_post_thumbnail_id($post_id);
        $meta = wp_get_attachment_image_src($id, $size);

        return array(
            'id' => $id,
            'url' => $meta[0],
            'width' => $meta[1],
            'height' => $meta[2],
            'alt' => get_post_meta($id, '_wp_attachment_image_alt', true),
            'title' => get_the_title($id)
        );
    }

    /** 
     * Get custom image metadata
     * @param mixed $field
     * @param string $size
     * @return array
     */
    public function get_custom_image_meta(mixed $field, string $size = 'medium') {
        $id = esc_attr(preg_replace('/\D/', '', $field));
        $url = wp_get_attachment_url($id, $size);

        return array(
            'id' => $id,
            'url' => $url,
        );
    }

    /**
     * Add featured image to posts query
     */
    public function register_rest_images_for_posts() {
        register_rest_field('post', 'metadata', array(
            'get_callback' => function ($data) {
                $meta = get_post_meta($data['id'], '', '');
                $meta['featured_image'] = $this->get_featured_image_meta($data['id'], 'full');
                return $meta;
            },
        ));
    }

    /**
     * Add featured image to media query
     */
    public function register_rest_images_for_media() {
        register_rest_field('attachment', 'metadata', array(
            'get_callback' => function ($data) {
                $meta = get_post_meta($data['id'], '', '');
                $meta['featured_image'] = $this->get_featured_image_meta($data['id'], 'medium');
                return $meta;
            },
        ));
    }

    /**
     * Add featured image to posts query
     */
    public function register_rest_images_for_references() {
        register_rest_field('references', 'metadata', array(
            'get_callback' => function ($data) {
                /**
                 * Get post meta
                 */
                $meta = get_post_meta($data['id'], '', '');

                /**
                 * Build reference data
                 */
                $reference = array(
                    'id' => isset($data['id']) ? $data['id'] : '',
                    'title' => isset($data['title']['rendered']) ? $data['title']['rendered'] : '',
                    'content' => isset($meta['reference_content']) ? $meta['reference_content'] : '',
                    'link' => isset($data['link']) ? $data['link'] : '',
                    'name' => isset($meta['reference_name']) ? $meta['reference_name'] : '',
                    'logo' =>  get_custom_image_meta($meta['company_logo'][0], 'medium'),
                    'featured_image' => $this->get_featured_image_meta($data['id'], 'medium')
                );

                /**
                 * Add reference data to meta
                 */
                $meta['reference'] = $reference;

                /**
                 * Return meta
                 */
                return $meta;
            },
        ));
    }

    /**
     * Initialize class
     * @return void 
     */
    public function init(): void {
        add_action('rest_api_init', [$this, 'register_rest_images_for_posts']);
        add_action('rest_api_init', [$this, 'register_rest_images_for_media']);
    }
}
