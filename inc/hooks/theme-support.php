<?php

namespace Kotisivu\BlockTheme;

defined('ABSPATH') or die();

/**
 * Add theme support
 * @return void
 */
function modify_theme_support(): void {
    add_theme_support('wp-block-styles');
    add_theme_support('align-wide');
    add_theme_support('custom-logo');
    add_theme_support('menus');
    add_theme_support('editor-styles');

    remove_theme_support('core-block-patterns');
}

/**
 * Add editor styles
 * @return void
 */
function add_editor_styles(): void {
    add_editor_style('theme.css');
    add_editor_style('admin.css');
    add_editor_style('core.css');
    add_editor_style('inline.css');
}

/**
 * Register navigation menus to theme
 * @return void
 */
function register_navigation_menus(): void {
    foreach (SITE_SETTINGS['menu_locations'] as $menu) :
        register_nav_menus([
            $menu['slug'] => $menu['name']
        ]);
    endforeach;
}
