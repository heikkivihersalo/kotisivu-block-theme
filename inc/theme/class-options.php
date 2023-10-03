<?php

namespace Kotisivu\BlockTheme;

defined('ABSPATH') or die();


class Options extends Theme {
    /**
     * Constructor
     * @return void 
     */
    public function __construct() {
        /**
         * Require dependencies
         */
        require_once(dirname(__DIR__) . '/lib/rational-option-pages/RationalOptionPages.php');

        /**
         * Load class files
         */
        $this->load_classes();
    }

    /**
     * Load Classes
     * @return void 
     */
    private function load_classes(): void {
        foreach (glob(dirname(__FILE__) . '/options/rational-option-pages/*.php') as $class)
            require_once $class;

        foreach (glob(dirname(__FILE__) . '/options/*.php') as $class)
            require_once $class;
    }

    /**
     * Create new options page for theme analytics
     * @return void
     */
    public function create_analytics_page(): void {
        $analyticsPage = new SiteAnalytics();
        new \RationalOptionPages($analyticsPage->init());
    }

    /**
     * Create new options page for theme options
     * @return void
     */
    public function create_options_page(): void {
        $optionsPage = new SiteOptions('kotisivu-block-theme');
        new \RationalOptionPages($optionsPage->init());
    }

    /**
     * Create new options page for theme social media accounts
     * @return void
     */
    public function create_social_media_page(): void {
        $socialMediaPage = new SiteSocialMedia('kotisivu-block-theme');
        new \RationalOptionPages($socialMediaPage->init());
    }

    /**
     * Create new options section for theme cache
     * @return void
     */
    public function create_general_page(): void {
        $generalPage = new SiteGeneralOptions();
        $generalPage->init();
    }

    /**
     * Initialize options
     * @return void
     */
    public function init() {
        $this->create_general_page();
        $this->create_analytics_page();
        $this->create_options_page();
        $this->create_social_media_page();
    }
}
