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
                    'title'            => __('Phone (Tel)', 'kotisivu-block-theme'),
                    'type'            => 'tel',
                    'text'          => __('Customer support phone number', 'kotisivu-block-theme'),
                    'placeholder'    => '03 782 8091',
                    'sanitize' => true
                ),
                'gsm' => array(
                    'id'            => 'contact-gsm',
                    'title'            => __('Phone (GSM)', 'kotisivu-block-theme'),
                    'type'            => 'tel',
                    'text'          => __('Customer support phone number', 'kotisivu-block-theme'),
                    'placeholder'    => '0400 418 939',
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
                    'title'            => __('Contact Information', 'kotisivu-block-theme'),
                    'type'            => 'wp_editor',
                    'value'            => 'Vinssikatu 3<br>15700 Lahti',
                    'sanitize' => true
                ),
                'billing_address'        => array(
                    'id'            => 'billing-address',
                    'title'            => __('Billing', 'kotisivu-block-theme'),
                    'type'            => 'wp_editor',
                    'value'            => 'A-Kuivaus Oy<br>PL 36541<br>01051 LASKUT',
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
