<?php

namespace Kotisivu\BlockTheme;

defined('ABSPATH') or die();

/**
 * Set blocks configuration
 */
return array(
	"templates" => [
		"ksd/template-404",
		"ksd/template-archive",
		"ksd/template-home",
		"ksd/template-page",
		"ksd/template-privacy-policy",
		"ksd/template-search",
		"ksd/template-single"
	],
	"parts" => ["ksd/part-dark-mode-toggle", "ksd/part-header", "ksd/part-footer"],
	"custom" => [
		"ksd/aside",
		"ksd/details",
		"ksd/form",
		"ksd/hero",
		"ksd/logo",
		"ksd/section",
		"ksd/social-icons",
		"ksd/wrapper"
	],
	"core" => [
		"core/paragraph",
		"core/image",
		"core/heading",
		"core/list",
		"core/list-item",
		"core/html",
		"core/button",
		"core/buttons",
		"core/separator",
		"core/shortcode",
		"core/block"
	]
);