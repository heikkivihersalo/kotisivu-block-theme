<?php

namespace Kotisivu\BlockTheme;

defined('ABSPATH') or die();

/**
 * Add filters to modify the theme behavior
 * 
 * @package Kotisivu\BlockTheme 
 */

class SiteSocialMedia {
    /**
     * Get social media section
     * @return array 
     */
    public function get_social_media_section(): array {
        return array(
            'title' => __('Social Media Accounts', 'kotisivu-block-theme'),
            'text'    => '<p>' .
                __("Add social media URL's here.", 'kotisivu-block-theme')
                . '</p>',
            'fields' => array(
                'facebook' => array(
                    'title' => __('Facebook', 'kotisivu-block-theme'),
                    'id' => 'facebook-url',
                    'type' => 'url',
                    'value' => '',
                    'placeholder' => 'https://www.facebook.com/accountname',
                    'sanitize' => true
                ),
                'twitter' => array(
                    'title' => __('Twitter', 'kotisivu-block-theme'),
                    'id' => 'twitter-url',
                    'type' => 'url',
                    'value' => '',
                    'placeholder' => 'https://www.twitter.com/accountname',
                    'sanitize' => true
                ),
                'instagram' => array(
                    'title' => __('Instagram', 'kotisivu-block-theme'),
                    'id' => 'instagram-url',
                    'type' => 'url',
                    'value' => '',
                    'placeholder' => 'https://www.instagram.com/accountname',
                    'sanitize' => true
                ),
                'linkedin' => array(
                    'title' => __('LinkedIn', 'kotisivu-block-theme'),
                    'id' => 'linkedin-url',
                    'type' => 'url',
                    'value' => '',
                    'placeholder' => 'https://www.linkedin.com/company/accountname',
                    'sanitize' => true
                ),
                'youtube' => array(
                    'title' => __('YouTube', 'kotisivu-block-theme'),
                    'id' => 'youtube-url',
                    'type' => 'url',
                    'value' => '',
                    'placeholder' => 'https://www.youtube.com/channel/accountname',
                    'sanitize' => true
                ),
                'pinterest' => array(
                    'title' => __('Pinterest', 'kotisivu-block-theme'),
                    'id' => 'pinterest-url',
                    'type' => 'url',
                    'value' => '',
                    'placeholder' => 'https://www.pinterest.com/accountname',
                    'sanitize' => true
                ),
                'snapchat' => array(
                    'title' => __('Snapchat', 'kotisivu-block-theme'),
                    'id' => 'snapchat-url',
                    'type' => 'url',
                    'value' => '',
                    'placeholder' => 'https://www.snapchat.com/add/accountname',
                    'sanitize' => true
                ),
                'tiktok' => array(
                    'title' => __('TikTok', 'kotisivu-block-theme'),
                    'id' => 'tiktok-url',
                    'type' => 'url',
                    'value' => '',
                    'placeholder' => 'https://www.tiktok.com/@accountname',
                    'sanitize' => true
                ),
                'twitch' => array(
                    'title' => __('Twitch', 'kotisivu-block-theme'),
                    'id' => 'twitch-url',
                    'type' => 'url',
                    'value' => '',
                    'placeholder' => 'https://www.twitch.tv/accountname',
                    'sanitize' => true
                ),
                'reddit' => array(
                    'title' => __('Reddit', 'kotisivu-block-theme'),
                    'id' => 'reddit-url',
                    'type' => 'url',
                    'value' => '',
                    'placeholder' => 'https://www.reddit.com/user/accountname',
                    'sanitize' => true
                ),
                'discord' => array(
                    'title' => __('Discord', 'kotisivu-block-theme'),
                    'id' => 'discord-url',
                    'type' => 'url',
                    'value' => '',
                    'placeholder' => 'https://discord.gg/accountname',
                    'sanitize' => true
                ),
                'whatsapp' => array(
                    'title' => __('WhatsApp', 'kotisivu-block-theme'),
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
            'kotisivu-block-theme_site-options' => array(
                'page_title' => __('Social Media Accounts', 'kotisivu-block-theme'),
                'parent_slug' => 'kotisivu_theme_settings',
                'sections' => array(
                    'section-social' => $this->get_social_media_section(),
                ),
            ),
        );
    }
}
