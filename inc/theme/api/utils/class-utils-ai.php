<?php

namespace Kotisivu\BlockTheme\Api;

defined( 'ABSPATH' ) || die();

/**
 *
 * @package Kotisivu\BlockTheme
 */
final class UtilsAI {
	/**
	 * This utility class should never be instantiated.
	 */
	private function __construct() {
	}

	/**
	 * Get content from Open AI
	 * @param \WP_REST_Request $request Request object.
	 * @return Object
	 * @throws \Exception If failed to update contact information.
	 */
	public static function get_open_ai_content( \WP_REST_Request $request ): array {
		$body = json_decode( $request->get_body(), true );
		$api  = UtilsOptions::get_chatgpt_settings();
		$data = array(
			'model'    => $api['model'] ?? 'gpt-4o-mini',
			'messages' => array(
				(object) array(
					'role'    => 'system',
					'content' => 'You are a helpful assistant that returns text in markdown format. Return only the result.',
				),
				(object) array(
					'role'    => 'user',
					'content' => $body['prompt'],
				),
			),
		);

		$response = wp_remote_post(
			'https://api.openai.com/v1/chat/completions',
			array(
				'method'    => 'POST',
				'body'      => wp_json_encode( $data ),
				'headers'   => array(
					'Content-Type'  => 'application/json',
					'Authorization' => 'Bearer ' . $api['api_key'],
				),
				'sslverify' => false,
				'timeout'   => 60,
			),
		);

		if ( ! is_wp_error( $response ) ) {
			$body = json_decode( wp_remote_retrieve_body( $response ), true );
			return $body;
		} else {
			$error_message = $response->get_error_message();
			throw new \Exception( $error_message );
		}
	}
}
