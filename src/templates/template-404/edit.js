/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { useBlockProps } from "@wordpress/block-editor";
import ServerSideRender from '@wordpress/server-side-render';

/**
 * Styles
 */
import './editor.css';

/**
 * Block edit function
 * @param {Object} props - block props
 * @returns {Object} - React component
 */
export default function Edit(props) {
	const blockProps = useBlockProps();

	return (
		<div {...blockProps}>
			<ServerSideRender
				block="ksd/site-404"
				attributes={props.attributes}
			/>
		</div>
	);
};
