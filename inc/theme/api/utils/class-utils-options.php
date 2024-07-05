<?php

namespace Kotisivu\BlockTheme\Api;

defined( 'ABSPATH' ) || die();

/**
 *
 * @package Kotisivu\BlockTheme
 */
final class UtilsOptions {
	/**
	 * This utility class should never be instantiated.
	 */
	private function __construct() {
	}

	/**
	 * Get site contact information from the database
	 * @return array
	 */
	public static function get_contact_information(): array {
		$contact = get_option(
			'kotisivu_block_theme_contact',
			array(
				'name'        => '',
				'address'     => '',
				'zip'         => '',
				'city'        => '',
				'country'     => '',
				'vat'         => '',
				'business_id' => '',
				'phone'       => '',
				'email'       => '',
			)
		);

		return $contact;
	}

	/**
	 * Update site contact information in the database
	 * @param \WP_REST_Request $request Request object.
	 * @return array
	 * @throws \Exception If failed to update contact information.
	 */
	public static function update_contact_information( \WP_REST_Request $request ): array {
		$body = json_decode( $request->get_body(), true );

		$current = get_option( 'kotisivu_block_theme_contact' );

		if ( $body === $current ) {
			return $current;
		}

		$update = update_option(
			'kotisivu_block_theme_contact',
			array(
				'name'        => $body['name'] ?? $current['name'],
				'address'     => $body['address'] ?? $current['address'],
				'zip'         => $body['zip'] ?? $current['zip'],
				'city'        => $body['city'] ?? $current['city'],
				'country'     => $body['country'] ?? $current['country'],
				'vat'         => $body['vat'] ?? $current['vat'],
				'business_id' => $body['business_id'] ?? $current['business_id'],
				'phone'       => $body['phone'] ?? $current['phone'],
				'email'       => $body['email'] ?? $current['email'],
			),
			true
		);

		if ( ! $update ) {
			throw new \Exception( 'Failed to update contact information.', 500 );
		}

		return array(
			'name'        => $body['name'] ?? $current['name'],
			'address'     => $body['address'] ?? $current['address'],
			'zip'         => $body['zip'] ?? $current['zip'],
			'city'        => $body['city'] ?? $current['city'],
			'country'     => $body['country'] ?? $current['country'],
			'vat'         => $body['vat'] ?? $current['vat'],
			'business_id' => $body['business_id'] ?? $current['business_id'],
			'phone'       => $body['phone'] ?? $current['phone'],
			'email'       => $body['email'] ?? $current['email'],
		);
	}

	/**
	 * Get site social media links from the database
	 * @return array
	 */
	public static function get_social_media_links(): array {
		$social = get_option(
			'kotisivu_block_theme_social',
			array(
				'facebook'  => '',
				'twitter'   => '',
				'instagram' => '',
				'linkedin'  => '',
				'youtube'   => '',
				'pinterest' => '',
				'snapchat'  => '',
				'tiktok'    => '',
				'twitch'    => '',
				'reddit'    => '',
				'discord'   => '',
				'whatsapp'  => '',
			)
		);

		return $social;
	}

	/**
	 * Update site social media links in the database
	 * @param \WP_REST_Request $request Request object.
	 * @return array
	 * @throws \Exception If failed to update social media links.
	 */
	public static function update_social_media_links( \WP_REST_Request $request ): array {
		$body = json_decode( $request->get_body(), true );

		$current = get_option( 'kotisivu_block_theme_social' );

		if ( $body === $current ) {
			return $current;
		}

		$update = update_option(
			'kotisivu_block_theme_social',
			array(
				'facebook'  => $body['facebook'] ?? $current['facebook'],
				'twitter'   => $body['twitter'] ?? $current['twitter'],
				'instagram' => $body['instagram'] ?? $current['instagram'],
				'linkedin'  => $body['linkedin'] ?? $current['linkedin'],
				'youtube'   => $body['youtube'] ?? $current['youtube'],
				'pinterest' => $body['pinterest'] ?? $current['pinterest'],
				'snapchat'  => $body['snapchat'] ?? $current['snapchat'],
				'tiktok'    => $body['tiktok'] ?? $current['tiktok'],
				'twitch'    => $body['twitch'] ?? $current['twitch'],
				'reddit'    => $body['reddit'] ?? $current['reddit'],
				'discord'   => $body['discord'] ?? $current['discord'],
				'whatsapp'  => $body['whatsapp'] ?? $current['whatsapp'],
			),
			true
		);

		if ( ! $update ) {
			throw new \Exception( 'Failed to update social media links.', 500 );
		}

		return array(
			'facebook'  => $body['facebook'] ?? $current['facebook'],
			'twitter'   => $body['twitter'] ?? $current['twitter'],
			'instagram' => $body['instagram'] ?? $current['instagram'],
			'linkedin'  => $body['linkedin'] ?? $current['linkedin'],
			'youtube'   => $body['youtube'] ?? $current['youtube'],
			'pinterest' => $body['pinterest'] ?? $current['pinterest'],
			'snapchat'  => $body['snapchat'] ?? $current['snapchat'],
			'tiktok'    => $body['tiktok'] ?? $current['tiktok'],
			'twitch'    => $body['twitch'] ?? $current['twitch'],
			'reddit'    => $body['reddit'] ?? $current['reddit'],
			'discord'   => $body['discord'] ?? $current['discord'],
			'whatsapp'  => $body['whatsapp'] ?? $current['whatsapp'],
		);
	}

	/**
	 * Get analytics settings from the database
	 * @return array
	 */
	public static function get_analytics_settings(): array {
		$settings = get_option(
			'kotisivu_block_theme_tagmanager',
			array(
				'active'  => false,
				'id'      => '',
				'url'     => 'www.googletagmanager.com',
				'timeout' => 1500,
			)
		);

		return $settings;
	}

	/**
	 * Update analytics settings in the database
	 * @param \WP_REST_Request $request Request object.
	 * @return array
	 * @throws \Exception If failed to update analytics settings.
	 */
	public static function update_analytics_settings( \WP_REST_Request $request ): array {
		$body = json_decode( $request->get_body(), true );

		$current = get_option( 'kotisivu_block_theme_tagmanager' );

		if ( $body === $current ) {
			return $current;
		}

		$update = update_option(
			'kotisivu_block_theme_tagmanager',
			array(
				'active'  => $body['active'] ?? $current['active'] ?? false,
				'id'      => $body['id'] ?? $current['id'] ?? '',
				'url'     => $body['url'] ?? $current['url'] ?? 'www.googletagmanager.com',
				'timeout' => $body['timeout'] ?? $current['timeout'] ?? 1500,
			),
			true
		);

		if ( ! $update ) {
			throw new \Exception( 'Failed to update analytics settings.', 500 );
		}

		return array(
			'active'  => $body['active'] ?? $current['active'] ?? false,
			'id'      => $body['id'] ?? $current['id'] ?? '',
			'url'     => $body['url'] ?? $current['url'] ?? 'www.googletagmanager.com',
			'timeout' => $body['timeout'] ?? $current['timeout'] ?? 1500,
		);
	}
}
