/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
	useBlockProps
} from "@wordpress/block-editor";
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import { InnerBlocksAppender } from '@features/inspector';
import Inspector from "./components/Inspector.js";
import { getBlockSyles } from '@utils';

/**
 * Styles
 */
import './editor.css';

const Edit = (props) => {
	const {
		attributes: {
			blockClass,
			templateLock,
			style
		},
		clientId,
		context
	} = props;

	/**
	 * Set block props
	 */
	const blockProps = useBlockProps({
		className: classnames(blockClass),
		style: getBlockSyles({ style })
	});

	const innerBlocksProps = InnerBlocksAppender({
		clientId: clientId,
		template: context['ksd/childTemplate'],
		templateLock: templateLock,
		blockProps: blockProps
	});

	/**
	 * Return block edit view
	 */
	return (
		<>
			<Inspector {...props} />
			<div {...innerBlocksProps} />
		</>
	);
};

export default Edit;