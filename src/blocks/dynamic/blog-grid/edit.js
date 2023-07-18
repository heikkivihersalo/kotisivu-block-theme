/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { useBlockProps, InspectorControls } from "@wordpress/block-editor";
import ServerSideRender from '@wordpress/server-side-render';

/**
 * Styles
 */
import './editor.css';

/**
 * Internal dependencies
 */
import { usePosts } from '@hooks';

import {
	PanelBody,
	RangeControl
} from "@wordpress/components";

const Edit = (props) => {
	const {
		attributes: {
			maxPosts
		},
		setAttributes,
	} = props;

	const blockProps = useBlockProps();

	return (
		<div {...blockProps}>
			<ServerSideRender
				block="ksd/blog-grid"
			/>
		</div>
	);
};

export default Edit;