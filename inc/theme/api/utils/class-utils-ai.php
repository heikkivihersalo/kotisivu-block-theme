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
	public static function get_open_ai_text_content( \WP_REST_Request $request ): array {
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

	/**
	 * Get content from Open AI
	 * @param \WP_REST_Request $request Request object.
	 * @return Object
	 * @throws \Exception If failed to update contact information.
	 */
	public static function get_open_ai_image_content( \WP_REST_Request $request ): array {
		$body = json_decode( $request->get_body(), true );
		$api  = UtilsOptions::get_chatgpt_settings();
		$data = array(
			'model'           => 'dall-e-3',
			'prompt'          => $body['prompt'],
			'n'               => 1,
			'response_format' => 'b64_json',
			'size'            => '1024x1024',
		);

		$response = wp_remote_post(
			'https://api.openai.com/v1/images/generations',
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

	/**
	 * Save image to media library
	 * - Original snippet from 'cyberwani'
	 * @see https://gist.github.com/cyberwani/ad5452b040001878d692c3165836ebff
	 * @param \WP_REST_Request $request Request object.
	 * @return Object
	 * @throws \Exception If failed to update contact information.
	 */
	public static function save_image_to_media_library( \WP_REST_Request $request ): array {
		require_once ABSPATH . 'wp-admin/includes/image.php';

		$body = json_decode( $request->get_body(), true );

		$base64 = $body['base64'];

		// Upload dir.
		$upload_dir  = wp_upload_dir();
		$upload_path = str_replace( '/', DIRECTORY_SEPARATOR, $upload_dir['path'] ) . DIRECTORY_SEPARATOR;

		$img             = str_replace( 'data:image/jpeg;base64,', '', $base64 );
		$img             = str_replace( ' ', '+', $img );
		$decoded         = base64_decode( $img );
		$extension       = '.jpeg';
		$file_type       = 'image/jpeg';
		$hashed_filename = md5( 'AI generated image' . microtime() ) . $extension;

		// Save the image in the uploads directory.
		$upload_file = file_put_contents( $upload_path . $hashed_filename, $decoded );

		$attachment = array(
			'post_mime_type' => $file_type,
			'post_title'     => preg_replace( '/\.[^.]+$/', '', basename( $hashed_filename ) ),
			'post_content'   => '',
			'post_status'    => 'inherit',
			'guid'           => $upload_dir['url'] . '/' . basename( $hashed_filename ),
		);

		$attach_id = wp_insert_attachment( $attachment, $upload_dir['path'] . '/' . $hashed_filename );

		// Generate metadata and update the database.
		$attach_data = wp_generate_attachment_metadata( $attach_id, $upload_dir['path'] . '/' . $hashed_filename );
		wp_update_attachment_metadata( $attach_id, $attach_data );

		// Return the attachment ID and URL.
		return array(
			'attachment_id' => $attach_id,
			'url'           => wp_get_attachment_url( $attach_id ),
		);
	}
}
