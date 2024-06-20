<?php

return array(
    'kotisivu-block-theme_site-analytics' => array(
        'parent_slug' => 'kotisivu_theme_settings',
        'icon_url' => 'dashicons-chart-line',
        'page_title' => __('Analytics', 'kotisivu-block-theme'),
        'sections' => array(
            'section-one' => array(
                'title' => __('Tag Manager', 'kotisivu-block-theme'),
                'text'    => '<p>' .
                    __('Using Tag Manager is the recommended way of adding analytics (including cookie management) to your site. Kotisivu Theme uses unique script to delay the loading of analytics so it does not have any performance impact on your site.', 'kotisivu-block-theme')
                    . '</p>',
                'fields' => array(
                    'active' => array(
                        'title' => __('Enable Tag Manager', 'kotisivu-block-theme'),
                        'id' => 'tagmanager-active',
                        'type' => 'checkbox',
                    ),
                    'id' => array(
                        'title' => __('Container ID', 'kotisivu-block-theme'),
                        'id' => 'tagmanager-id',
                        'type' => 'text',
                        'sanitize' => true
                    ),
                    'url' => array(
                        'title' => __('Server Url', 'kotisivu-block-theme'),
                        'id' => 'tagmanager-url',
                        'type' => 'url',
                        'value' => 'https://www.googletagmanager.com',
                        'placeholder' => 'https://www.googletagmanager.com',
                        'sanitize' => true
                    ),
                    'timeout' => array(
                        'title' => __('Timeout (delay)', 'kotisivu-block-theme'),
                        'id' => 'tagmanager-timeout',
                        'type' => 'number',
                        'value' => 1500,
                        'sanitize' => true
                    )
                )
            ),
        ),
    ),
);
