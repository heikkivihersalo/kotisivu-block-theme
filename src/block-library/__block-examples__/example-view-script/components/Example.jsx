/**
 * WordPress dependencies
 * @wordpress/i18n for translation functions
 * - https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 * - Should basically always be used for any text that is visible to the user
 *
 * @wordpress/element for React components
 * - https://developer.wordpress.org/block-editor/reference-guides/packages/packages-element/
 */
import { __ } from "@wordpress/i18n";
import { useContext, useEffect, useState } from "@wordpress/element";

/**
 * External dependencies
 */

/**
 * Context
 */

/**
 * Internal dependencies
 */

/**
 * Components
 */

/**
 * Example Component
 * @return {JSX.Element}
 */
function Example() {
	return (
		<>
			<h1>{__("Hello World!")}</h1>
		</>
	);
}

export default Example;
