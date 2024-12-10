<?php

namespace Kotisivu\BlockTheme\Theme\Api\Interfaces;

defined( 'ABSPATH' ) || die();

interface ExceptionInterface {
	/**
	 * Get exception type
	 *
	 * @return string
	 */
	public function get_type(): string;

	/**
	 * Get HTTP status code
	 *
	 * @return int
	 */
	public function get_http_status(): int;
}

interface ParametersInvalidExceptionInterface extends ExceptionInterface {
	/**
	 * Constructor
	 *
	 * @param string $message Exception message (optional)
	 * @return void
	 */
	public function __construct( $message = null, HTTP_Error_Parameters_Invalid $error = HTTP_Error_Parameters_Invalid::GENERIC );
}

interface ParametersMissingExceptionInterface extends ExceptionInterface {
	/**
	 * Constructor
	 *
	 * @param string $message Exception message (optional)
	 * @return void
	 */
	public function __construct( $message = null, HTTP_Error_Parameters_Missing $error = HTTP_Error_Parameters_Missing::GENERIC );
}

interface ParametersEmptyExceptionInterface extends ExceptionInterface {
	/**
	 * Constructor
	 *
	 * @param string $message Exception message (optional)
	 * @return void
	 */
	public function __construct( $message = null, HTTP_Error_Parameters_Empty $error = HTTP_Error_Parameters_Empty::GENERIC );
}

interface PaginationInvalidParametersExceptionInterface extends ExceptionInterface {
	/**
	 * Constructor
	 *
	 * @param string $message Exception message (optional)
	 * @return void
	 */
	public function __construct( $message = null, HTTP_Error_Pagination_Invalid_Parameters $error = HTTP_Error_Pagination_Invalid_Parameters::GENERIC );
}

interface PaginationOutOfRangeExceptionInterface extends ExceptionInterface {
	/**
	 * Constructor
	 *
	 * @param string $message Exception message (optional)
	 * @return void
	 */
	public function __construct( $message = null, HTTP_Error_Pagination_Out_Of_Range $error = HTTP_Error_Pagination_Out_Of_Range::GENERIC );
}

interface NotFoundExceptionInterface extends ExceptionInterface {
	/**
	 * Constructor
	 *
	 * @param string $message Exception message (optional)
	 * @return void
	 */
	public function __construct( $message = null, HTTP_Error_Not_Found $error = HTTP_Error_Not_Found::GENERIC );
}

interface AlreadyExistsExceptionInterface extends ExceptionInterface {
	/**
	 * Constructor
	 *
	 * @param string $message Exception message (optional)
	 * @return void
	 */
	public function __construct( $message = null, HTTP_Error_Already_Exists $error = HTTP_Error_Already_Exists::GENERIC_400 );
}

interface FetchFailedExceptionInterface extends ExceptionInterface {
	/**
	 * Constructor
	 *
	 * @param string $message Exception message (optional)
	 * @return void
	 */
	public function __construct( $message = null, HTTP_Error_Fetch_Failed $error = HTTP_Error_Fetch_Failed::GENERIC );
}

interface CreationFailedExceptionInterface extends ExceptionInterface {
	/**
	 * Constructor
	 *
	 * @param string $message Exception message (optional)
	 * @return void
	 */
	public function __construct( $message = null, HTTP_Error_Creation_Failed $error = HTTP_Error_Creation_Failed::GENERIC );
}

interface UpdateFailedExceptionInterface extends ExceptionInterface {
	/**
	 * Constructor
	 *
	 * @param string $message Exception message (optional)
	 * @return void
	 */
	public function __construct( $message = null, HTTP_Error_Update_Failed $error = HTTP_Error_Update_Failed::GENERIC );
}

interface DeleteFailedExceptionInterface extends ExceptionInterface {
	/**
	 * Constructor
	 *
	 * @param string $message Exception message (optional)
	 * @return void
	 */
	public function __construct( $message = null, HTTP_Error_Delete_Failed $error = HTTP_Error_Delete_Failed::GENERIC );
}

interface DeleteFailedDependencyExceptionInterface extends ExceptionInterface {
	/**
	 * Constructor
	 *
	 * @param string                              $message Exception message (optional)
	 * @param HTTP_Error_Delete_Failed_Dependency $error Error code (optional)
	 * @return void
	 */
	public function __construct( $message = null, HTTP_Error_Delete_Failed_Dependency $error = HTTP_Error_Delete_Failed_Dependency::GENERIC );
}

interface NotImplementedExceptionInterface extends ExceptionInterface {
	/**
	 * Constructor
	 *
	 * @param string                     $message Exception message (optional)
	 * @param HTTP_Error_Not_Implemented $error Error code (optional)
	 * @return void
	 */
	public function __construct( $message = null, HTTP_Error_Not_Implemented $error = HTTP_Error_Not_Implemented::GENERIC );
}
