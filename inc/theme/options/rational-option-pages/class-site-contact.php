<?php

namespace Kotisivu\BlockTheme;

defined('ABSPATH') or die();

/**
 * Add filters to modify the theme behavior
 * 
 * @package Kotisivu\BlockTheme 
 */

class SiteContact {

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
                    'placeholder'    => '044 123 1234',
                    'sanitize' => true
                ),
                'name'        => array(
                    'id'        => 'contact-company-name',
                    'type'     => 'text',
                    'title'            => __('Company Name', 'kotisivu-block-theme'),
                    'sanitize' => true
                ),
                'id'        => array(
                    'id'        => 'contact-business-id',
                    'type'     => 'text',
                    'title'            => __('Business ID', 'kotisivu-block-theme'),
                    'sanitize' => true
                ),
                'vat'        => array(
                    'id'        => 'contact-vat-number',
                    'type'     => 'text',
                    'title'            => __('VAT number', 'kotisivu-block-theme'),
                    'sanitize' => true
                ),
                'address'        => array(
                    'id'            => 'contact-address',
                    'title'            => __('Contact Information', 'kotisivu-block-theme'),
                    'type'            => 'wp_editor',
                    'value'            => 'Osoite 123, 12345 Kaupunki',
                    'sanitize' => true
                )
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
