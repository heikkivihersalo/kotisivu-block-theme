<?php
/**
 * Exception for failed updates
 *
 * @link       https://www.kotisivu.dev
 * @since      2.0.0
 *
 * @package    Kotisivu\BlockTheme\Theme\Api\Responses\UpdateFailedException
 */

namespace Kotisivu\BlockTheme\Theme\Api\Responses;

defined( 'ABSPATH' ) || die();

use Kotisivu\BlockTheme\Theme\Api\Interfaces\ExceptionInterface;
use Kotisivu\BlockTheme\Theme\Api\Enums\HTTP_Error_Update_Failed;

/**
 * Exception for failed updates
 *
 * @since      2.0.0
 * @package    Kotisivu\BlockTheme\Theme\Api\Responses\UpdateFailedException
 * @author     Heikki Vihersalo <heikki@vihersalo.fi>
 */
class UpdateFailedException extends \Exception implements ExceptionInterface {
	/**
	 * @var string|null
	 */
	protected $message;

	/**
	 * @var HTTP_Error_Pagination_Invalid_Parameters
	 */
	protected $error;

	/**
	 * @inheritDoc
	 */
	public function __construct( $message = null, HTTP_Error_Update_Failed $error = HTTP_Error_Update_Failed::GENERIC ) {
		parent::__construct(
			$message ? $message : $error->get_message(),
			$error->get_code()
		);

		$this->error = $error;
	}

	/**
	 * @inheritDoc
	 */
	public function get_type(): string {
		return $this->error->get_type();
	}

	/**
	 * @inheritDoc
	 */
	public function get_http_status(): int {
		return $this->error->get_http_status();
	}
}
