<?php

namespace Kotisivu\BlockTheme;

defined('ABSPATH') or die();

/**
 * Add filters to modify the theme behavior
 * 
 * Inherits following attributes
 * * name
 * * version
 * * textdomain
 * * options
 * * config
 * * path
 * * uri
 * * parent_path
 * * parent_uri
 * 
 * @package Kotisivu\BlockTheme 
 */
class Filters extends Theme {
    /**
     * Add custom image options to admin interface
     * @param array $sizes 
     * @return array 
     */
    public function add_custom_sizes_to_admin(array $sizes): array {
        $custom_images = [];

        foreach ($this->config["customImages"]["customSizes"] as $image) :
            $custom_images[$image['slug']] = [__($image['name'],  'kotisivu-block-theme')];
        endforeach;

        return array_merge($sizes, $custom_images);
    }

    /**
     * Disable WordPress default update api calls
     * @param array $response 
     * @param string $url 
     * @return array response
     */
    public function disable_theme_update(array $response, string $url): array {
        /**
         * Ensure that a theme is never updated. This works by removing the
         * theme from the list of available updates.
         * @author: Micah Wood
         * @url: https://wpscholar.com/blog/exclude-plugin-theme-from-wordpress-updates/
         * 
         * Original snippets posted by Mark Jaquith 
         * https://markjaquith.wordpress.com/2009/12/14/excluding-your-plugin-or-theme-from-update-checks/
         * 
         */
        if (0 === strpos($url, 'https://api.wordpress.org/themes/update-check')) {
            $themes = json_decode($response['body']['themes']);
            unset($themes->themes->{'kotisivu-block-theme'});
            unset($themes->themes->{'style'});
            $response['body']['themes'] = json_encode($themes);
        }

        return $response;
    }

    /**
     * Add image support for SVG's
     * @param array $mimes 
     * @return array 
     */
    public function allow_svg_uploads(array $mimes): array {
        $mimes['svg'] = 'image/svg+xml';
        return $mimes;
    }

    /**
     * Override default excerpt length
     * @param int $length 
     * @return int 
     */
    public function limit_excerpt_length(int $length): int {
        return 20;
    }

    /**
     * Define allowed block types for Gutenberg
     * @param mixed $block_editor_context 
     * @param mixed $editor_context 
     * @return array 
     */
    public function allowed_block_types($block_editor_context, $editor_context): array {
        if (!empty($editor_context->post) || $editor_context->name === 'core/edit-site') :
            /** 
             * Get block arrays
             * Static and core blocks already only has slugs stored to array
             * Dynamic blocks needs to be parsed and create new slug array
             */
            $static = $this->blocks["static"];
            $default = $this->blocks["default"];
            $dynamic = $this->blocks["dynamic"];
            $dynamic_block_slugs = [];

            /* Parse only the slug from dynamic blocks. if array empty, do nothing */
            if ($dynamic) :
                foreach ($this->blocks["dynamic"] as $block) :
                    array_push($dynamic_block_slugs, $block['slug']);
                endforeach;
            endif;

            /* Return merged block array */
            return array_merge(
                $static,
                $default,
                $dynamic_block_slugs
            );
        endif;

        /**
         * If 'block_editor_context' is an array, return content
         */
        if (is_array($block_editor_context)) {
            return $block_editor_context;
        }

        /* Else return an empty array */
        return array();
    }

    /**
     * Disable jQuery
     * @return void 
     */
    public function remove_jquery(): void {
        $jquery = $this->config["settings"]["jquery"];

        /* If user is logged in or jquery is loaded normally, return nothing */
        if ($jquery == 'normal' || is_user_logged_in()) return;

        /** 
         * Load jQuery on footer
         */
        if ($jquery == 'footer') {
            wp_scripts()->add_data('jquery', 'group', 1);
            wp_scripts()->add_data('jquery-core', 'group', 1);
            wp_scripts()->add_data('jquery-migrate', 'group', 1);
        }

        /** 
         * Disable jQuery from loading
         */
        if ($jquery == 'disable') {
            wp_dequeue_script('jquery');
            wp_deregister_script('jquery');
        }
    }

    /**
     * Load translations
     */
    public function load_translations(): void {
        load_theme_textdomain('kotisivu-block-theme', $this->parent_path . '/languages');
    }

    /**
     * Add featured image to posts query
     */
    function register_rest_images_for_posts() {
        register_rest_field('post', 'metadata', array(
            'get_callback' => function ($data) {
                $image_id = get_post_thumbnail_id($data['id']);
                $image_meta = wp_get_attachment_image_src($image_id, 'medium');
                $image = array(
                    'id' => $image_id,
                    'url' => $image_meta[0],
                    'width' => $image_meta[1],
                    'height' => $image_meta[2],
                    'alt' => get_post_meta($image_id, '_wp_attachment_image_alt', true),
                    'title' => get_the_title($image_id)
                );

                $meta = get_post_meta($data['id'], '', '');
                $meta['featured_image'] = $image;
                return $meta;
            },
        ));
    }

    /**
     * Add featured image to media query
     */
    function register_rest_images_for_media() {
        register_rest_field('attachment', 'metadata', array(
            'get_callback' => function ($data) {
                $image_id = get_post_thumbnail_id($data['id']);
                $image_meta = wp_get_attachment_image_src($image_id, 'medium');
                $image = array(
                    'id' => $image_id,
                    'url' => $image_meta[0],
                    'width' => $image_meta[1],
                    'height' => $image_meta[2],
                    'alt' => get_post_meta($image_id, '_wp_attachment_image_alt', true),
                    'title' => get_the_title($image_id)
                );

                $meta = get_post_meta($data['id'], '', '');
                $meta['featured_image'] = $image;
                return $meta;
            },
        ));
    }

    /**
     * Add featured image to posts query
     */
    function register_rest_images_for_references() {
        register_rest_field('references', 'metadata', array(
            'get_callback' => function ($data) {
                $image_id = get_post_thumbnail_id($data['id']);
                $image_meta = wp_get_attachment_image_src($image_id, 'medium');
                $meta = get_post_meta($data['id'], '', '');
                $logo_id = esc_attr(preg_replace('/\D/', '', $meta['company_logo'][0]));
                $logo_meta = wp_get_attachment_url($logo_id, 'medium');

                $reference = array(
                    'id' => isset($data['id']) ? $data['id'] : '',
                    'title' => isset($data['title']['rendered']) ? $data['title']['rendered'] : '',
                    'content' => isset($meta['reference_content']) ? $meta['reference_content'] : '',
                    'link' => isset($data['link']) ? $data['link'] : '',
                    'name' => isset($meta['reference_name']) ? $meta['reference_name'] : '',
                    'logo' =>  array(
                        'id' => $logo_id,
                        'url' => $logo_meta,
                    ),
                    'featured_image' => array(
                        'id' => $image_id,
                        'url' => isset($image_meta[0]) ? $image_meta[0] : '',
                        'width' => isset($image_meta[1]) ? $image_meta[1] : '',
                        'height' => isset($image_meta[2]) ? $image_meta[2] : '',
                        'alt' => get_post_meta($image_id, '_wp_attachment_image_alt', true) !== null ? get_post_meta($image_id, '_wp_attachment_image_alt', true) : '',
                        'title' => get_the_title($image_id)
                    )   
                );

                $meta['reference'] = $reference;
                return $meta;
            },
        ));
    }

    /**
     * Disable REST API for non logged in users
     * @param mixed $result
     * @return mixed
     * @link https://developer.wordpress.org/rest-api/using-the-rest-api/frequently-asked-questions/#require-authentication-for-all-requests
     */
    public function disable_rest_api_for_non_logged_in_users($result) {
        // If a previous authentication check was applied,
        // pass that result along without modification.
        if (true === $result || is_wp_error($result)) {
            return $result;
        }

        // No authentication has been performed yet.
        // Return an error if user is not logged in.
        if (!is_user_logged_in()) {
            return new WP_Error(
                'rest_not_logged_in',
                __('You are not currently logged in.'),
                array('status' => 401)
            );
        }

        // Our custom authentication check should have no effect
        // on logged-in requests
        return $result;
    }

    /**
     * Disable author pages
     * @return void
     */
    public function disable_author_pages() {
        global $wp_query;

        if (is_author()) {
            wp_redirect(get_option('home'), 301);
            exit;
        }
    }

    /**
     * Initialize class
     * @return void 
     */
    public function init(): void {
        add_action('after_setup_theme', [$this, 'load_translations']);
        add_filter('image_size_names_choose', [$this, 'add_custom_sizes_to_admin']);
        add_filter('upload_mimes', [$this, 'allow_svg_uploads']);
        add_filter('excerpt_length', [$this, 'limit_excerpt_length'], 999);
        add_filter('http_request_args', [$this, 'disable_theme_update'], 10, 2);
        add_filter('allowed_block_types_all', [$this, 'allowed_block_types'], 10, 2);
        add_filter('wp_enqueue_scripts', [$this, 'remove_jquery']);
        add_action('rest_api_init', [$this, 'register_rest_images_for_posts']);
        add_action('rest_api_init', [$this, 'register_rest_images_for_media']);
        add_filter('rest_authentication_errors', [$this, 'disable_rest_api_for_non_logged_in_users']);
        add_action('template_redirect', [$this, 'disable_author_pages']);
    }
}
