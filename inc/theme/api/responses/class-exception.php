<?php

namespace Kotisivu\BlockTheme\Api;

defined( 'ABSPATH' ) or die();
/**
 * Used when parameters are invalid (e.g. wrong type or spelled wrong)
 *
 * @since 1.0.0
 */
class ParametersInvalidException extends \Exception implements ParametersInvalidExceptionInterface {
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
	public function __construct( $message = null, HTTP_Error_Parameters_Invalid $error = HTTP_Error_Parameters_Invalid::GENERIC ) {
		parent::__construct(
			$message ? $message : $error->get_message(),
			$error->get_code()
		);

		$this->error = $error;
	}

	/**
	 * @inheritDoc
	 */
	public function getType(): string {
		return $this->error->get_type();
	}

	/**
	 * @inheritDoc
	 */
	public function getHttpStatus(): int {
		return $this->error->get_http_status();
	}
}

/**
 * Used when parameters are missing (required parameters missing)
 *
 * @since 1.0.0
 */
class ParametersMissingException extends \Exception implements ParametersMissingExceptionInterface {
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
	public function __construct( $message = null, HTTP_Error_Parameters_Missing $error = HTTP_Error_Parameters_Missing::GENERIC ) {
		parent::__construct(
			$message ? $message : $error->get_message(),
			$error->get_code()
		);

		$this->error = $error;
	}

	/**
	 * @inheritDoc
	 */
	public function getType(): string {
		return $this->error->get_type();
	}

	/**
	 * @inheritDoc
	 */
	public function getHttpStatus(): int {
		return $this->error->get_http_status();
	}
}

/**
 * Used when parameters are missing (required parameters missing)
 *
 * @since 1.0.0
 */
class ParametersEmptyException extends \Exception implements ParametersEmptyExceptionInterface {
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
	public function __construct( $message = null, HTTP_Error_Parameters_Empty $error = HTTP_Error_Parameters_Empty::GENERIC ) {
		parent::__construct(
			$message ? $message : $error->get_message(),
			$error->get_code()
		);

		$this->error = $error;
	}

	/**
	 * @inheritDoc
	 */
	public function getType(): string {
		return $this->error->get_type();
	}

	/**
	 * @inheritDoc
	 */
	public function getHttpStatus(): int {
		return $this->error->get_http_status();
	}
}

/**
 * Used when pagination parameters are invalid
 *
 * @since 1.0.0
 */
class PaginationInvalidParametersException extends \Exception implements PaginationInvalidParametersExceptionInterface {
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
	public function __construct( $message = null, HTTP_Error_Pagination_Invalid_Parameters $error = HTTP_Error_Pagination_Invalid_Parameters::GENERIC ) {
		parent::__construct(
			$message ? $message : $error->get_message(),
			$error->get_code()
		);

		$this->error = $error;
	}

	/**
	 * @inheritDoc
	 */
	public function getType(): string {
		return $this->error->get_type();
	}

	/**
	 * @inheritDoc
	 */
	public function getHttpStatus(): int {
		return $this->error->get_http_status();
	}
}

/**
 * Used when pagination is out of range (e.g. page 3 of 2)
 *
 * @since 1.0.0
 */
class PaginationOutOfRangeException extends \Exception implements PaginationOutOfRangeExceptionInterface {
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
	public function __construct( $message = null, HTTP_Error_Pagination_Out_Of_Range $error = HTTP_Error_Pagination_Out_Of_Range::GENERIC ) {
		parent::__construct(
			$message ? $message : $error->get_message(),
			$error->get_code()
		);

		$this->error = $error;
	}

	/**
	 * @inheritDoc
	 */
	public function getType(): string {
		return $this->error->get_type();
	}

	/**
	 * @inheritDoc
	 */
	public function getHttpStatus(): int {
		return $this->error->get_http_status();
	}
}

/**
 * Resource not found exception
 *
 * @since 1.0.0
 */
class NotFoundException extends \Exception implements NotFoundExceptionInterface {
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
	public function __construct( $message = null, HTTP_Error_Not_Found $error = HTTP_Error_Not_Found::GENERIC ) {
		parent::__construct(
			$message ? $message : $error->get_message(),
			$error->get_code()
		);

		$this->error = $error;
	}

	/**
	 * @inheritDoc
	 */
	public function getType(): string {
		return $this->error->get_type();
	}

	/**
	 * @inheritDoc
	 */
	public function getHttpStatus(): int {
		return $this->error->get_http_status();
	}
}

/**
 * Resource already exists exception
 *
 * @since 1.0.0
 */
class AlreadyExistsException extends \Exception implements AlreadyExistsExceptionInterface {
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
	public function __construct( $message = null, HTTP_Error_Already_Exists $error = HTTP_Error_Already_Exists::GENERIC_400 ) {
		parent::__construct(
			$message ? $message : $error->get_message(),
			$error->get_code()
		);

		$this->error = $error;
	}

	/**
	 * @inheritDoc
	 */
	public function getType(): string {
		return $this->error->get_type();
	}

	/**
	 * @inheritDoc
	 */
	public function getHttpStatus(): int {
		return $this->error->get_http_status();
	}
}

/**
 * Resource fetch failed exception
 *
 * @since 1.0.0
 */
class FetchFailedException extends \Exception implements FetchFailedExceptionInterface {
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
	public function __construct( $message = null, HTTP_Error_Fetch_Failed $error = HTTP_Error_Fetch_Failed::GENERIC ) {
		parent::__construct(
			$message ? $message : $error->get_message(),
			$error->get_code()
		);

		$this->error = $error;
	}

	/**
	 * @inheritDoc
	 */
	public function getType(): string {
		return $this->error->get_type();
	}

	/**
	 * @inheritDoc
	 */
	public function getHttpStatus(): int {
		return $this->error->get_http_status();
	}
}

/**
 * Creation failed exception
 *
 * @since 1.0.0
 */
class CreationFailedException extends \Exception implements CreationFailedExceptionInterface {
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
	public function __construct( $message = null, HTTP_Error_Creation_Failed $error = HTTP_Error_Creation_Failed::GENERIC ) {
		parent::__construct(
			$message ? $message : $error->get_message(),
			$error->get_code()
		);

		$this->error = $error;
	}

	/**
	 * @inheritDoc
	 */
	public function getType(): string {
		return $this->error->get_type();
	}

	/**
	 * @inheritDoc
	 */
	public function getHttpStatus(): int {
		return $this->error->get_http_status();
	}
}

/**
 * Update failed exception
 *
 * @since 1.0.0
 */
class UpdateFailedException extends \Exception implements UpdateFailedExceptionInterface {
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
	public function getType(): string {
		return $this->error->get_type();
	}

	/**
	 * @inheritDoc
	 */
	public function getHttpStatus(): int {
		return $this->error->get_http_status();
	}
}

/**
 * Delete failed exception
 *
 * @since 1.0.0
 */
class DeleteFailedException extends \Exception implements DeleteFailedExceptionInterface {
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
	public function __construct( $message = null, HTTP_Error_Delete_Failed $error = HTTP_Error_Delete_Failed::GENERIC ) {
		parent::__construct(
			$message ? $message : $error->get_message(),
			$error->get_code()
		);

		$this->error = $error;
	}

	/**
	 * @inheritDoc
	 */
	public function getType(): string {
		return $this->error->get_type();
	}

	/**
	 * @inheritDoc
	 */
	public function getHttpStatus(): int {
		return $this->error->get_http_status();
	}
}

/**
 * Delete failed exception
 *
 * @since 1.0.0
 */
class DeleteFailedDependencyException extends \Exception implements DeleteFailedDependencyExceptionInterface {
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
	public function __construct( $message = null, HTTP_Error_Delete_Failed_Dependency $error = HTTP_Error_Delete_Failed_Dependency::GENERIC ) {
		parent::__construct(
			$message ? $message : $error->get_message(),
			$error->get_code()
		);

		$this->error = $error;
	}

	/**
	 * @inheritDoc
	 */
	public function getType(): string {
		return $this->error->get_type();
	}

	/**
	 * @inheritDoc
	 */
	public function getHttpStatus(): int {
		return $this->error->get_http_status();
	}
}

/**
 * Used when pagination parameters are invalid
 *
 * @since 1.0.0
 */
class NotImplementedException extends \Exception implements NotImplementedExceptionInterface {
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
	public function __construct( $message = null, HTTP_Error_Not_Implemented $error = HTTP_Error_Not_Implemented::GENERIC ) {
		parent::__construct(
			$message ? $message : $error->get_message(),
			$error->get_code()
		);

		$this->error = $error;
	}

	/**
	 * @inheritDoc
	 */
	public function getType(): string {
		return $this->error->get_type();
	}

	/**
	 * @inheritDoc
	 */
	public function getHttpStatus(): int {
		return $this->error->get_http_status();
	}
}
