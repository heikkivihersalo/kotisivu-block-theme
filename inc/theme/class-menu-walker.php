<?php

namespace Kotisivu\BlockTheme;

use \Walker_Nav_Menu;

defined('ABSPATH') or die();

/**
 * Add custom walker to header menu
 * 
 * @package Kotisivu\BlockTheme 
 */
class HeaderMenuWalker extends Walker_Nav_Menu {
    function start_el(&$output, $item, $depth = 0, $args = [], $id = 0) {

        $isLink = $item->url && $item->url != '#';

        $output .= sprintf(
            "<li class='%s'><%s href='%s'%s%s>%s</%s></li>",
            'site-header__menu-item ' . $item->classes[0],
            $isLink ? 'a' : 'span',
            $item->url,
            $item->current ? ' aria-current="page"' : '',
            $isLink ? '' : ' tabindex="0"',
            $item->title,
            $isLink ? 'a' : 'span',
        );
    }
}
