<?php

namespace Kotisivu\BlockTheme\Api;

defined('ABSPATH') or die();

/**
 * Enum Permission
 * 
 * @package Kotisivu\BlockTheme\Api
 */
enum Permission {
    case ADMIN;
    case PUBLIC;

    public function get_callback(): \Closure|bool {
        return match ($this) {
            self::ADMIN => function () {
                return current_user_can('manage_options');
            },
            self::PUBLIC => function () {
                return true;
            },
        };
    }
}
