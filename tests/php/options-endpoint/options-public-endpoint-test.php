<?php

declare(strict_types=1);

namespace Kotisivu\BlockTheme;

use PHPUnit\Framework\TestCase;
use GuzzleHttp\Client;
use GuzzleHttp\Psr7;
use GuzzleHttp\Exception\ClientException;

/**
 * @group api-routes
 * @group options-public
 */
final class OptionsPublicEndpointTest extends TestCase {
	/**
	 * GuzzleHttp Client instance.
	 * @var Client
	 */
	public $public_client;

	/**
	 * @inheritDoc
	 */
	public function setUp(): void {
		$this->public_client = new \GuzzleHttp\Client(
			array(
				'base_uri' => TESTS_API_BASE,
			)
		);
	}

	/**
	 * @test
	 */
	public function test_Success_GetContact(): void {
		$response = $this->public_client->request(
			'GET',
			'/index.php?rest_route=/kotisivu-block-theme/v1/options/contact',
			array( 'verify' => false )
		);

		$data = json_decode( $response->getBody()->getContents(), true );

		// Request
		$this->assertEquals( 'success', $data['status'] );
		$this->assertEquals( 'fetch_success', $data['type'] );
		$this->assertArrayHasKey( 'message', $data );
		$this->assertArrayHasKey( 'data', $data );

		// Data
		$this->assertArrayHasKey( 'name', $data['data'] );
		$this->assertArrayHasKey( 'address', $data['data'] );
		$this->assertArrayHasKey( 'zip', $data['data'] );
		$this->assertArrayHasKey( 'city', $data['data'] );
		$this->assertArrayHasKey( 'country', $data['data'] );
		$this->assertArrayHasKey( 'vat', $data['data'] );
		$this->assertArrayHasKey( 'business_id', $data['data'] );
		$this->assertArrayHasKey( 'phone', $data['data'] );
		$this->assertArrayHasKey( 'email', $data['data'] );
	}

	/**
	 * @test
	 */
	public function test_Error_SetContact(): void {
		try {
			$response = $this->public_client->request(
				'POST',
				'/index.php?rest_route=/kotisivu-block-theme/v1/options/contact',
				array(
					'verify' => false,
					'json'   => array(),
				)
			);
		} catch ( ClientException $e ) {
			$data        = json_decode( $e->getResponse()->getBody()->getContents(), true );
			$status_code = $e->getResponse()->getStatusCode();
			$this->assertEquals( 'rest_forbidden', $data['code'] );
			$this->assertEquals( 401, $status_code );
		}
	}

	/**
	 * @test
	 */
	public function test_Success_GetSocial(): void {
		$response = $this->public_client->request(
			'GET',
			'/index.php?rest_route=/kotisivu-block-theme/v1/options/social',
			array( 'verify' => false )
		);

		$data = json_decode( $response->getBody()->getContents(), true );

		// Request
		$this->assertEquals( 'success', $data['status'] );
		$this->assertEquals( 'fetch_success', $data['type'] );
		$this->assertArrayHasKey( 'message', $data );
		$this->assertArrayHasKey( 'data', $data );

		// Data
		$this->assertArrayHasKey( 'facebook', $data['data'] );
		$this->assertArrayHasKey( 'twitter', $data['data'] );
		$this->assertArrayHasKey( 'instagram', $data['data'] );
		$this->assertArrayHasKey( 'linkedin', $data['data'] );
		$this->assertArrayHasKey( 'youtube', $data['data'] );
		$this->assertArrayHasKey( 'pinterest', $data['data'] );
		$this->assertArrayHasKey( 'snapchat', $data['data'] );
		$this->assertArrayHasKey( 'tiktok', $data['data'] );
		$this->assertArrayHasKey( 'twitch', $data['data'] );
		$this->assertArrayHasKey( 'reddit', $data['data'] );
		$this->assertArrayHasKey( 'discord', $data['data'] );
		$this->assertArrayHasKey( 'whatsapp', $data['data'] );
	}

	/**
	 * @test
	 */
	public function test_Error_SetSocial(): void {
		try {
			$response = $this->public_client->request(
				'POST',
				'/index.php?rest_route=/kotisivu-block-theme/v1/options/social',
				array(
					'verify' => false,
					'json'   => array(),
				)
			);
		} catch ( ClientException $e ) {
			$data        = json_decode( $e->getResponse()->getBody()->getContents(), true );
			$status_code = $e->getResponse()->getStatusCode();
			$this->assertEquals( 'rest_forbidden', $data['code'] );
			$this->assertEquals( 401, $status_code );
		}
	}

	/**
	 * @test
	 */
	public function test_Success_GetAnalytics(): void {
		$response = $this->public_client->request(
			'GET',
			'/index.php?rest_route=/kotisivu-block-theme/v1/options/analytics',
			array( 'verify' => false )
		);

		$data = json_decode( $response->getBody()->getContents(), true );

		// Request
		$this->assertEquals( 'success', $data['status'] );
		$this->assertEquals( 'fetch_success', $data['type'] );
		$this->assertArrayHasKey( 'message', $data );
		$this->assertArrayHasKey( 'data', $data );

		// Data
		$this->assertArrayHasKey( 'active', $data['data'] );
		$this->assertArrayHasKey( 'id', $data['data'] );
		$this->assertArrayHasKey( 'url', $data['data'] );
		$this->assertArrayHasKey( 'timeout', $data['data'] );
	}

	/**
	 * @test
	 */
	public function test_Error_SetAnalytics(): void {
		try {
			$response = $this->public_client->request(
				'POST',
				'/index.php?rest_route=/kotisivu-block-theme/v1/options/analytics',
				array(
					'verify' => false,
					'json'   => array(),
				)
			);
		} catch ( ClientException $e ) {
			$data        = json_decode( $e->getResponse()->getBody()->getContents(), true );
			$status_code = $e->getResponse()->getStatusCode();
			$this->assertEquals( 'rest_forbidden', $data['code'] );
			$this->assertEquals( 401, $status_code );
		}
	}

	/**
	 * @inheritDoc
	 */
	public function tearDown(): void {
		$this->public_client = null;
	}
}
