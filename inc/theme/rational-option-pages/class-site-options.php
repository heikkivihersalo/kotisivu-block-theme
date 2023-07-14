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
            'title' => __('Contact Information', $this->textdomain),
            'text'    => '<p>' .
                __('Add contact information here.', $this->textdomain)
                . '</p>',
            'fields' => array(
                'email'            => array(
                    'id'            => 'contact-email',
                    'title'            => __('Email', $this->textdomain),
                    'type'            => 'email',
                    'placeholder'    => 'email.address@domain.com',
                    'sanitize' => true
                ),
                'phone' => array(
                    'id'            => 'contact-phone',
                    'title'            => __('Phone', $this->textdomain),
                    'type'            => 'tel',
                    'text'          => __('Use format +358123456789', $this->textdomain),
                    'placeholder'    => '+358123456789',
                    'sanitize' => true
                ),
                'name'        => array(
                    'id'        => 'contact-company-name',
                    'type'     => 'text',
                    'title'            => __('Company Name', $this->textdomain),
                    'sanitize' => true
                ),
                'id'        => array(
                    'id'        => 'contact-company-id',
                    'type'     => 'text',
                    'title'            => __('Company ID (VAT)', $this->textdomain),
                    'sanitize' => true
                ),
                'address'        => array(
                    'id'            => 'contact-address',
                    'title'            => __('Address', $this->textdomain),
                    'type'            => 'wp_editor',
                    'value'            => 'Kotikatu 1<br>00000 Helsinki',
                    'sanitize' => true
                ),
                'opening_hours'        => array(
                    'id'            => 'contact-opening-hours',
                    'title'            => __('Opening Hours', $this->textdomain),
                    'type'            => 'wp_editor',
                    'value'            => 'Mon-Fri 9-17<br>Sat-Sun 10-16',
                    'sanitize' => true
                ),
            )
        );
    }

    /**
     * Get social media section
     * @return array 
     */
    public function get_social_media_section(): array {
        return array(
            'title' => __('Social Media Accounts', $this->textdomain),
            'text'    => '<p>' .
                __("Add social media URL's here.", $this->textdomain)
                . '</p>',
            'fields' => array(
                'facebook' => array(
                    'title' => __('Facebook', $this->textdomain),
                    'id' => 'facebook-url',
                    'type' => 'url',
                    'value' => '',
                    'placeholder' => 'https://www.facebook.com/accountname',
                    'sanitize' => true
                ),
                'twitter' => array(
                    'title' => __('Twitter', $this->textdomain),
                    'id' => 'twitter-url',
                    'type' => 'url',
                    'value' => '',
                    'placeholder' => 'https://www.twitter.com/accountname',
                    'sanitize' => true
                ),
                'instagram' => array(
                    'title' => __('Instagram', $this->textdomain),
                    'id' => 'instagram-url',
                    'type' => 'url',
                    'value' => '',
                    'placeholder' => 'https://www.instagram.com/accountname',
                    'sanitize' => true
                ),
                'linkedin' => array(
                    'title' => __('LinkedIn', $this->textdomain),
                    'id' => 'linkedin-url',
                    'type' => 'url',
                    'value' => '',
                    'placeholder' => 'https://www.linkedin.com/company/accountname',
                    'sanitize' => true
                ),
                'youtube' => array(
                    'title' => __('YouTube', $this->textdomain),
                    'id' => 'youtube-url',
                    'type' => 'url',
                    'value' => '',
                    'placeholder' => 'https://www.youtube.com/channel/accountname',
                    'sanitize' => true
                ),
                'pinterest' => array(
                    'title' => __('Pinterest', $this->textdomain),
                    'id' => 'pinterest-url',
                    'type' => 'url',
                    'value' => '',
                    'placeholder' => 'https://www.pinterest.com/accountname',
                    'sanitize' => true
                ),
                'snapchat' => array(
                    'title' => __('Snapchat', $this->textdomain),
                    'id' => 'snapchat-url',
                    'type' => 'url',
                    'value' => '',
                    'placeholder' => 'https://www.snapchat.com/add/accountname',
                    'sanitize' => true
                ),
                'tiktok' => array(
                    'title' => __('TikTok', $this->textdomain),
                    'id' => 'tiktok-url',
                    'type' => 'url',
                    'value' => '',
                    'placeholder' => 'https://www.tiktok.com/@accountname',
                    'sanitize' => true
                ),
                'twitch' => array(
                    'title' => __('Twitch', $this->textdomain),
                    'id' => 'twitch-url',
                    'type' => 'url',
                    'value' => '',
                    'placeholder' => 'https://www.twitch.tv/accountname',
                    'sanitize' => true
                ),
                'reddit' => array(
                    'title' => __('Reddit', $this->textdomain),
                    'id' => 'reddit-url',
                    'type' => 'url',
                    'value' => '',
                    'placeholder' => 'https://www.reddit.com/user/accountname',
                    'sanitize' => true
                ),
                'discord' => array(
                    'title' => __('Discord', $this->textdomain),
                    'id' => 'discord-url',
                    'type' => 'url',
                    'value' => '',
                    'placeholder' => 'https://discord.gg/accountname',
                    'sanitize' => true
                ),
                'whatsapp' => array(
                    'title' => __('WhatsApp', $this->textdomain),
                    'id' => 'whatsapp-url',
                    'type' => 'url',
                    'value' => '',
                    'placeholder' => 'https://wa.me/358123456789',
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
            'kotisivu-theme_site-options' => array(
                'page_title' => __('Site Options', $this->textdomain),
                'sections' => array(
                    'section-contact' => $this->get_contact_section(),
                    'section-social' => $this->get_social_media_section(),
                ),
            ),
        );
    }
}
