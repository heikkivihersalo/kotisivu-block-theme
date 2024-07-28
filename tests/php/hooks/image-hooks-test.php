<?php

namespace Kotisivu\BlockTheme;

use PHPUnit\Framework\TestCase;

require_once SITE_PATH . '/inc/hooks/images.php';

/**
 * @group hooks
 * @group image-hooks
 */
final class ImageHooksTest extends TestCase {
	/**
	 * Image sizes
	 * @var array $sizes Image sizes
	 */
	public $sizes;

	/**
	 * Setup the test
	 */
	public function setUp(): void {
		$this->sizes = array(
			'retina'       => array(
				'slug'   => 'retina',
				'name'   => 'Retina',
				'width'  => 2880,
				'height' => 1800,
			),
			'huge'         => array(
				'slug'   => 'huge',
				'name'   => 'Huge',
				'width'  => 1920,
				'height' => 1440,
			),
			'large'        => array(
				'slug'   => 'large',
				'width'  => 1600,
				'height' => 1200,
			),
			'medium_large' => array(
				'slug'   => 'medium_large',
				'width'  => 1366,
				'height' => 1025,
			),
			'medium'       => array(
				'slug'   => 'medium',
				'width'  => 1024,
				'height' => 768,
			),
			'small'        => array(
				'slug'   => 'small',
				'name'   => 'Small',
				'width'  => 768,
				'height' => 576,
			),
			'extra_small'  => array(
				'slug'   => 'extra_small',
				'name'   => 'Extra Small',
				'width'  => 640,
				'height' => 480,
			),
			'thumbnail'    => array(
				'slug'   => 'thumbnail',
				'width'  => 300,
				'height' => 300,
			),
		);
	}

	/**
	 * @test
	 */
	public function test_RegisterImageSizes() {
		// Register image sizes
		register_image_sizes();

		// Check if the image sizes are set correctly
		$this->assertEquals( $this->sizes['thumbnail']['width'], get_option( 'thumbnail_size_w' ), 'Thumbnail width is not set correctly' );
		$this->assertEquals( $this->sizes['thumbnail']['height'], get_option( 'thumbnail_size_h' ), 'Thumbnail height is not set correctly' );
		$this->assertEquals( $this->sizes['medium']['width'], get_option( 'medium_size_w' ), 'Medium width is not set correctly' );
		$this->assertEquals( $this->sizes['medium']['height'], get_option( 'medium_size_h' ), 'Medium height is not set correctly' );
		$this->assertEquals( $this->sizes['medium_large']['width'], get_option( 'medium_large_size_w' ), 'Medium Large width is not set correctly' );
		$this->assertEquals( $this->sizes['medium_large']['height'], get_option( 'medium_large_size_h' ), 'Medium Large height is not set correctly' );
		$this->assertEquals( $this->sizes['large']['width'], get_option( 'large_size_w' ), 'Large width is not set correctly' );
		$this->assertEquals( $this->sizes['large']['height'], get_option( 'large_size_h' ), 'Large height is not set correctly' );
	}

	/**
	 * @test
	 * @depends test_RegisterImageSizes
	 */
	public function test_SiteImageSizesExists() {
		$image_sizes = get_intermediate_image_sizes();

		// Check if custom image sizes are added
		foreach ( $image_sizes as $key => $slug ) {
			if ( '2048x2048' === $slug ) {
				continue;
			}

			if ( '1536x1536' === $slug ) {
				continue;
			}

			$this->assertContains( $slug, array_column( $this->sizes, 'slug' ), sprintf( 'Image size %s is not added', $slug ) );
		}
	}

	/**
	 * Tear down the test
	 */
	public function tearDown(): void {
		$this->sizes = null;
	}
}
