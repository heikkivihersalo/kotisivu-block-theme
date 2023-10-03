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
class SiteOptions extends Theme {

    /**
     * Get contact section
     * @return array
     */
    private function get_contact_section(): array {
        return array(
            'title' => __('Contact Information', 'kotisivu-block-theme'),
            'text'    => '<p>' .
                __('Add contact information here.', 'kotisivu-block-theme')
                . '</p>',
            'fields' => array(
                'email'            => array(
                    'id'            => 'contact-email',
                    'title'            => __('Email', 'kotisivu-block-theme'),
                    'type'            => 'email',
                    'placeholder'    => 'email.address@domain.com',
                    'sanitize' => true
                ),
                'phone' => array(
                    'id'            => 'contact-phone',
                    'title'            => __('Phone', 'kotisivu-block-theme'),
                    'type'            => 'tel',
                    'text'          => __('Use format +358123456789', 'kotisivu-block-theme'),
                    'placeholder'    => '+358123456789',
                    'sanitize' => true
                ),
                'name'        => array(
                    'id'        => 'contact-company-name',
                    'type'     => 'text',
                    'title'            => __('Company Name', 'kotisivu-block-theme'),
                    'sanitize' => true
                ),
                'id'        => array(
                    'id'        => 'contact-company-id',
                    'type'     => 'text',
                    'title'            => __('Company ID (VAT)', 'kotisivu-block-theme'),
                    'sanitize' => true
                ),
                'address'        => array(
                    'id'            => 'contact-address',
                    'title'            => __('Address', 'kotisivu-block-theme'),
                    'type'            => 'wp_editor',
                    'value'            => 'Kotikatu 1<br>00000 Helsinki',
                    'sanitize' => true
                ),
                'opening_hours'        => array(
                    'id'            => 'contact-opening-hours',
                    'title'            => __('Opening Hours', 'kotisivu-block-theme'),
                    'type'            => 'wp_editor',
                    'value'            => 'Mon-Fri 9-17<br>Sat-Sun 10-16',
                    'sanitize' => true
                ),
            )
        );
    }

    /**
     * Initialize options
     * @return array 
     */
    public function init() {
        return array(
            'kotisivu-block-theme_site-options' => array(
                'page_title' => __('Contact Information', 'kotisivu-block-theme'),
                'parent_slug' => 'kotisivu_theme_settings',
                'sections' => array(
                    'section-contact' => $this->get_contact_section()
                ),
            ),
        );
    }
}
