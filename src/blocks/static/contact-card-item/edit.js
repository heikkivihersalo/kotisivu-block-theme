/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
	useBlockProps
} from "@wordpress/block-editor";

/**
 * Internal dependencies
 */
import { InnerBlocksAppender } from '@features/inspector';
import { Wrapper } from './wrapper.js';

/**
 * Styles
 */
import './editor.css';

const Edit = (props) => {
	const {
		attributes: {
			blockClass,
			blockWrapper,
			template,
			templateLock,
		},
		clientId
	} = props;

	/**
	 * Set block props
	 */
	const blockProps = useBlockProps({
		className: blockClass
	});

	const innerBlocksProps = InnerBlocksAppender({
		clientId: clientId,
		template: template,
		templateLock: templateLock,
		blockProps: blockProps
	});

	let wrapperProps = {
		children: innerBlocksProps.children,
		blockWrapper: blockWrapper,
		classes: innerBlocksProps.className,
		styles: innerBlocksProps.style
	}

	return (
		<>	
			<Wrapper  {...wrapperProps} />
		</>
	);
};

export default Edit;