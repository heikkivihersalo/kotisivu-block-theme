<?php

namespace Kotisivu\BlockTheme\Theme\CustomPostTypes\Traits;

defined( 'ABSPATH' ) || die();

trait CustomPermalink {
	/**
	 * Add permalink setting
	 * @param string $slug Slug of the post type
	 * @param string $name Name of the post type
	 * @return void
	 */
	public function add_permalink_setting( string $slug, string $name ): void {
		add_action(
			'admin_init',
			function () use ( $slug, $name ) {
				add_settings_field(
					'kotisivu_block_theme_' . $slug,
					sprintf(
						__( '%s Base', 'kotisivu-block-theme' ),
						$name
					),
					fn() => $this->generate_setting_output( $slug ),
					'permalink',
					'optional'
				);
			}
		);

		add_action(
			'admin_init',
			function () use ( $slug ) {
				if ( isset( $_POST['permalink_structure'] ) ) { // phpcs:ignore WordPress.Security.NonceVerification
					if ( ! isset( $_POST[ 'kotisivu_block_theme_' . $slug ] ) ) { // phpcs:ignore WordPress.Security.NonceVerification
						return;
					}

					update_option(
						'kotisivu_block_theme_' . $slug,
						trim( sanitize_title( wp_unslash( $_POST[ 'kotisivu_block_theme_' . $slug ] ) ) ) // phpcs:ignore WordPress.Security.NonceVerification
					);
				}
			}
		);
	}

	/**
	 * Generate setting output for permalink settings
	 * @param string $slug Slug of the post type
	 * @return void
	 */
	public function generate_setting_output( string $slug ): void {
		printf(
			'<input name="%s" type="text" class="regular-text code" value="%s" placeholder="%s" />',
			'kotisivu_block_theme_' . $slug,
			esc_attr( get_option( 'kotisivu_block_theme_' . $slug ) ),
			$slug
		);
	}
}
