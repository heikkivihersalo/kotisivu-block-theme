<?php

declare(strict_types=1);

namespace Kotisivu\BlockTheme\Api\Test;

use PHPUnit\Framework\TestCase;
use GuzzleHttp\Client;
use GuzzleHttp\Psr7;
use GuzzleHttp\Exception\ClientException;

final class OptionsPublicEndpointTest extends TestCase {
    /**
     * GuzzleHttp Client instance.
     * @var Client
     */
    public $publicClient;

    /**
     * @inheritDoc
     */
    public function setUp(): void {
        
        // $this->publicClient = new \GuzzleHttp\Client([
        //     'base_uri' => SITE_URL,
        // ]);
    }

    /**
     * Test cases for public options endpoint.
     * - Get contact information. (Read)
     * - Set social information. This should fail. (Read)
     */

    #[Test]
    #[Group('api'), Group('options-public')]
    public function test_Success_GetContact(): void {
        // $response = $this->publicClient->request(
        //     'GET',
        //     '/index.php?rest_route=/kotisivu-block-theme/v1/options/contact',
        //     ['verify' => false]
        // );

        // $data = json_decode($response->getBody()->getContents(), true);

        $request = new \WP_REST_Request( 'GET', '/kotisivu-block-theme/v1/options/contact' );
        $response = rest_do_request( $request );
        $server = rest_get_server();
        $data = $server->response_to_data( $response, false );

        // Request
        $this->assertEquals('success', $data['status']);
        $this->assertEquals('fetch_success', $data['type']);
        $this->assertArrayHasKey('message', $data);
        $this->assertArrayHasKey('data', $data);

        // Data
        $this->assertArrayHasKey('name', $data['data']);
        $this->assertArrayHasKey('address', $data['data']);
        $this->assertArrayHasKey('zip', $data['data']);
        $this->assertArrayHasKey('city', $data['data']);
        $this->assertArrayHasKey('country', $data['data']);
        $this->assertArrayHasKey('vat', $data['data']);
        $this->assertArrayHasKey('business_id', $data['data']);
        $this->assertArrayHasKey('phone', $data['data']);
        $this->assertArrayHasKey('email', $data['data']);
    }

    /**
     * @inheritDoc
     */
    public function tearDown(): void {
        // $this->publicClient = null;
    }
}
