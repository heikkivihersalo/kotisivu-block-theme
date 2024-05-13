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
        require_once dirname(__DIR__) . '/api/class-api.php';
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
     * Initialize class
     * @return void 
     */
    public function init(): void {
        /**
         * Register rest api endpoints
         */
        $api = new Api\Api();
        $api->init();

        /**
         * Modify rest api behavior
         */
        add_action('rest_api_init', [$this, 'register_rest_images_for_posts']);
        add_action('rest_api_init', [$this, 'register_rest_images_for_media']);
    }
}
