<?php

namespace Kotisivu\BlockTheme\Api;

defined('ABSPATH') or die();

/**
 * 
 * 
 * @package Kotisivu\BlockTheme 
 */
class Api {
    /**
     * Constructor
     * @return void 
     */
    public function __construct() {
        foreach (glob(dirname(__FILE__) . '/enums/*.php') as $enum)
            require_once $enum;

        foreach (glob(dirname(__FILE__) . '/interfaces/*.php') as $interface)
            require_once $interface;

        foreach (glob(dirname(__FILE__) . '/responses/*.php') as $response)
            require_once $response;

        foreach (glob(dirname(__FILE__) . '/routes/*.php') as $route)
            require_once $route;

        // foreach (glob(dirname(__FILE__) . '/utils/*.php') as $utils)
        //     require_once $utils;
    }

    /**
     * Initialize class
     * @return void 
     */
    public function init() {
        add_action('rest_api_init', function () {
            $options = new RouteOptions('options');
            $options->register_crud_endpoints();
            $options->register_custom_endpoints();
        });
    }
}
