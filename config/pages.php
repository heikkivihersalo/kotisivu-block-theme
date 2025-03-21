<?php

declare(strict_types=1);

use Vihersalo\BlockThemeCore\Support\Assets\Script;
use Vihersalo\BlockThemeCore\Support\Assets\Style;
use Vihersalo\BlockThemeCore\Support\Assets\Localize;
use Vihersalo\BlockThemeCore\Support\Collections\AssetCollection;
use Vihersalo\BlockThemeCore\Support\Collections\MenuCollection;
use Vihersalo\BlockThemeCore\Support\Pages\SettingsMenu;
use Vihersalo\BlockThemeCore\Support\Pages\Submenu;
use Vihersalo\BlockThemeCore\Support\Utils\Pages as Utils;

return [
	SettingsMenu::configure(
		slug: 'ksd-settings-general',
		page_title: __( 'Kotisivu Theme Options', 'kotisivu-block-theme' ),
		menu_title: __( 'Kotisivu Theme', 'kotisivu-block-theme' ),
		path: 'build/options/render.php',
		capability: 'manage_options',
		icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMTUyIDE3NSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgeG1sbnM6c2VyaWY9Imh0dHA6Ly93d3cuc2VyaWYuY29tLyIgc3R5bGU9ImZpbGwtcnVsZTpldmVub2RkO2NsaXAtcnVsZTpldmVub2RkO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDoyOyI+CiAgICA8ZyB0cmFuc2Zvcm09Im1hdHJpeCgwLjk1NjIyNywwLDAsMC45NTYyMjcsLTgxMi42NDgsLTI2MjguNzgpIj4KICAgICAgICA8cGF0aCBmaWxsPSJibGFjayIgZD0iTTkyOC44NzQsMjc0OS4xMUwxMDA3LjksMjc5NC43NEwxMDA3LjksMjg4NS45OUw5MjguODc0LDI5MzEuNjFMODQ5Ljg0OCwyODg1Ljk5TDg0OS44NDgsMjc5NC43NEw5MjguODc0LDI3NDkuMTFaTTk4OS4wMTEsMjg0OC4xM0w5ODkuMDExLDI4MzIuNTlMOTUyLjEzNSwyODAwLjk5TDk1Mi4xMzUsMjgxOC43M0w5NzUuODYzLDI4MzkuMzdMOTc1Ljg2MywyODQxLjM2TDk1Mi4xMzUsMjg2MS45OUw5NTIuMTM1LDI4NzkuNzNMOTg5LjAxMSwyODQ4LjEzWk04NjguNzM3LDI4MzIuNTlMODY4LjczNywyODQ4LjEzTDkwNS42MTMsMjg3OS43M0w5MDUuNjEzLDI4NjEuOTlMODgxLjg4NSwyODQxLjM2TDg4MS44ODUsMjgzOS4zN0w5MDUuNjEzLDI4MTguNzNMOTA1LjYxMywyODAwLjk5TDg2OC43MzcsMjgzMi41OVpNOTI0LjM4MywyODk5LjMzTDk1MS4xMjQsMjc4MS4zOUw5MzQuMjIxLDI3ODEuMzlMOTA3LjQ4LDI4OTkuMzNMOTI0LjM4MywyODk5LjMzWiIgLz4KICAgIDwvZz4KPC9zdmc+Cg==',
		position: 50
	)
	->with_submenu(
		function ( MenuCollection $menu ) {
			$menu->add(
				Submenu::create(
					slug: 'ksd-settings-general',
					page_title: __( 'General', 'kotisivu-block-theme' ),
					menu_title: __( 'General', 'kotisivu-block-theme' ),
					capability: 'manage_options'
				)
			);

			$menu->add(
				Submenu::create(
					slug: 'ksd-settings-analytics',
					page_title: __( 'Analytics', 'kotisivu-block-theme' ),
					menu_title: __( 'Analytics', 'kotisivu-block-theme' ),
					capability: 'manage_options'
				)
			);
		}
	)
	->with_assets(
		function ( AssetCollection $assets ) {
			$assets->add(
				[
					Script::create( 'ksd-options-index', 'build/options/index.js', 'build/options/index.asset.php', 10, true ),
					Style::create( 'ksd-options-index', 'build/options/index.css', 'build/options/index.asset.php', 10, true ),
					Style::create( 'ksd-options-style-index', 'build/options/style-index.css', 'build/options/index.asset.php', 10, true ),
				]
			);
		}
	)
	->with_localize(
		handle: 'ksd-options-index', // This is the script handle we enqueued earlier
		object_name: 'kotisivuSettings',
		l10n: [
			'nonce' => wp_create_nonce( 'wp_rest' ), // Nonce for REST API authentication (must be used in all REST API requests)
		]
	)
	->create(),
];
