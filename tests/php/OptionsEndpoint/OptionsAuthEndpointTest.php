<?php

declare(strict_types=1);

namespace Kotisivu\BlockTheme\Api\Test;

use PHPUnit\Framework\TestCase;
use GuzzleHttp\Client;
use GuzzleHttp\Psr7;
use GuzzleHttp\Exception\ClientException;

final class OptionsAuthEndpointTest extends TestCase {
    /**
     * GuzzleHttp Client instance.
     * @var Client
     */
    public $authClient;

    /**
     * @inheritDoc
     */
    public function setUp(): void {        
        $this->authClient = new \GuzzleHttp\Client([
            'base_uri' => SITE_URL,
            'auth' => [APP_USER, APP_PASS],
        ]);
    }

    /**
     * @inheritDoc
     */
    public function tearDown(): void {
        $this->authClient = null;
    }

    /**
     * Test cases for admin authenticated options endpoint.
     * - Get contact information. (Read)
     * - Set contact information. (Update)
     */

    #[Test]
    #[Group('api'), Group('options-auth')]
    public function test_Success_GetContact(): void {
        // Set current user to admin.
        $response = $this->authClient->request(
            'GET',
            '/index.php?rest_route=/kotisivu-block-theme/v1/options/contact',
            ['verify' => false]
        );

        $data = json_decode($response->getBody()->getContents(), true);

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

    #[Test]
    #[Group('api'), Group('options-auth')]
    public function test_Success_SetContact(): void {
        $random_name = $this->generate_random_string() . ' ' . $this->generate_random_string();
        $random_address = $this->generate_random_string() . ' ' . rand(10, 99);
        $random_zip = rand(10000, 99999);
        $random_city = $this->generate_random_string();
        $random_country = $this->generate_random_string();
        $random_vat = $this->generate_random_string();
        $random_business_id = $this->generate_random_string();
        $random_phone = '+' . rand(000, 999) . rand(100000000, 999999999);
        $random_email = $random_name . '@test.com';

        $response = $this->authClient->request(
            'POST',
            '/index.php?rest_route=/kotisivu-block-theme/v1/options/contact',
            array(
                'verify' => false,
                'json' => [
                    'name' => $random_name,
                    'address' => $random_address,
                    'zip' => $random_zip,
                    'city' => $random_city,
                    'country' => $random_country,
                    'vat' => $random_vat,
                    'business_id' => $random_business_id,
                    'phone' => $random_phone,
                    'email' => $random_email
                ]
            )
        );

        $data = json_decode($response->getBody()->getContents(), true);

        // Request
        $this->assertEquals('success', $data['status']);
        $this->assertEquals('update_success', $data['type']);
        $this->assertArrayHasKey('message', $data);
        $this->assertArrayHasKey('data', $data);

        // Data
        $this->assertEquals($random_name, $data['data']['name']);
        $this->assertEquals($random_address, $data['data']['address']);
        $this->assertEquals($random_zip, $data['data']['zip']);
        $this->assertEquals($random_city, $data['data']['city']);
        $this->assertEquals($random_country, $data['data']['country']);
        $this->assertEquals($random_vat, $data['data']['vat']);
        $this->assertEquals($random_business_id, $data['data']['business_id']);
        $this->assertEquals($random_phone, $data['data']['phone']);
        $this->assertEquals($random_email, $data['data']['email']);
    }

    /**
     * Test cases for admin authenticated options endpoint.
     * - Get social account information. (Read)
     * - Set social account information. (Update)
     */

    #[Test]
    #[Group('api'), Group('options-auth')]
    public function test_Success_GetSocial(): void {
        $response = $this->authClient->request(
            'GET',
            '/index.php?rest_route=/kotisivu-block-theme/v1/options/social',
            ['verify' => false]
        );

        $data = json_decode($response->getBody()->getContents(), true);

        // Request
        $this->assertEquals('success', $data['status']);
        $this->assertEquals('fetch_success', $data['type']);
        $this->assertArrayHasKey('message', $data);
        $this->assertArrayHasKey('data', $data);

        // Data
        $this->assertArrayHasKey('facebook', $data['data']);
        $this->assertArrayHasKey('twitter', $data['data']);
        $this->assertArrayHasKey('instagram', $data['data']);
        $this->assertArrayHasKey('linkedin', $data['data']);
        $this->assertArrayHasKey('youtube', $data['data']);
        $this->assertArrayHasKey('pinterest', $data['data']);
        $this->assertArrayHasKey('snapchat', $data['data']);
        $this->assertArrayHasKey('tiktok', $data['data']);
        $this->assertArrayHasKey('twitch', $data['data']);
        $this->assertArrayHasKey('reddit', $data['data']);
        $this->assertArrayHasKey('discord', $data['data']);
        $this->assertArrayHasKey('whatsapp', $data['data']);
    }

    #[Test]
    #[Group('api'), Group('options-auth')]
    public function test_Success_SetSocial(): void {
        $random_url = $this->generate_random_string() . '.test';

        $response = $this->authClient->request(
            'POST',
            '/index.php?rest_route=/kotisivu-block-theme/v1/options/social',
            array(
                'verify' => false,
                'json' => [
                    'facebook' => $random_url,
                    'twitter' => $random_url,
                    'instagram' => $random_url,
                    'linkedin' => $random_url,
                    'youtube' => $random_url,
                    'pinterest' => $random_url,
                    'snapchat' => $random_url,
                    'tiktok' => $random_url,
                    'twitch' => $random_url,
                    'reddit' => $random_url,
                    'discord' => $random_url,
                    'whatsapp' => $random_url
                ]
            )
        );

        $data = json_decode($response->getBody()->getContents(), true);

        // Request
        $this->assertEquals('success', $data['status']);
        $this->assertEquals('update_success', $data['type']);
        $this->assertArrayHasKey('message', $data);
        $this->assertArrayHasKey('data', $data);

        // Data
        $this->assertEquals($random_url, $data['data']['facebook']);
        $this->assertEquals($random_url, $data['data']['twitter']);
        $this->assertEquals($random_url, $data['data']['instagram']);
        $this->assertEquals($random_url, $data['data']['linkedin']);
        $this->assertEquals($random_url, $data['data']['youtube']);
        $this->assertEquals($random_url, $data['data']['pinterest']);
        $this->assertEquals($random_url, $data['data']['snapchat']);
        $this->assertEquals($random_url, $data['data']['tiktok']);
        $this->assertEquals($random_url, $data['data']['twitch']);
        $this->assertEquals($random_url, $data['data']['reddit']);
        $this->assertEquals($random_url, $data['data']['discord']);
        $this->assertEquals($random_url, $data['data']['whatsapp']);
    }

    /**
     * Test cases for admin authenticated options endpoint.
     * - Get analytics information. (Read)
     * - Set analytics information. (Update)
     */

    #[Test]
    #[Group('api'), Group('options-auth')]
    public function test_Success_GetAnalytics(): void {
        $response = $this->authClient->request(
            'GET',
            '/index.php?rest_route=/kotisivu-block-theme/v1/options/analytics',
            ['verify' => false]
        );

        $data = json_decode($response->getBody()->getContents(), true);

        // Request
        $this->assertEquals('success', $data['status']);
        $this->assertEquals('fetch_success', $data['type']);
        $this->assertArrayHasKey('message', $data);
        $this->assertArrayHasKey('data', $data);

        // Data
        $this->assertArrayHasKey('active', $data['data']);
        $this->assertArrayHasKey('id', $data['data']);
        $this->assertArrayHasKey('url', $data['data']);
        $this->assertArrayHasKey('timeout', $data['data']);
    }

    #[Test]
    #[Group('api'), Group('options-auth')]
    public function test_Success_SetAnalytics(): void {
        $random_bool = (bool)rand(0, 1);
        $random_id = $this->generate_random_string();
        $random_url = $this->generate_random_string() . '.test';
        $random_timeout = rand(1, 100);

        $response = $this->authClient->request(
            'POST',
            '/index.php?rest_route=/kotisivu-block-theme/v1/options/analytics',
            array(
                'verify' => false,
                'json' => [
                    'active' => $random_bool,
                    'id' => $random_id,
                    'url' => $random_url,
                    'timeout' => $random_timeout
                ]
            )
        );

        $data = json_decode($response->getBody()->getContents(), true);

        // Request
        $this->assertEquals('success', $data['status']);
        $this->assertEquals('update_success', $data['type']);
        $this->assertArrayHasKey('message', $data);
        $this->assertArrayHasKey('data', $data);

        // Data
        $this->assertEquals($random_bool, $data['data']['active']);
        $this->assertEquals($random_id, $data['data']['id']);
        $this->assertEquals($random_url, $data['data']['url']);
        $this->assertEquals($random_timeout, $data['data']['timeout']);
    }

    /**
     * Generate random string
     * @return string
     */
    private function generate_random_string(): string {
        $length = rand(5, 10);
        return substr(str_shuffle(implode(range('a', 'z'))), 0, $length);
    }
}
