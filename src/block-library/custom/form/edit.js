import { __ } from "@wordpress/i18n";
import {
	useBlockProps,
} from "@wordpress/block-editor";
import classnames from 'classnames';

import { InnerBlocksAppender } from '@components/inspector';
import Inspector from "./components/Inspector.js";
import { getBlockStyles } from '@utils';

import './editor.css';

const Edit = (props) => {
	const {
		attributes: {
			ariaLabel,
			ariaLabelledBy,
			blockClass,
			template,
			templateLock,
			style,
		},
		clientId
	} = props;

	/**
	 * Set block props
	 */
	const blockProps = useBlockProps({
		className: classnames(blockClass),
		style: getBlockStyles({ style }),
		'aria-label': ariaLabel ? ariaLabel : null,
		'aria-labelledby': ariaLabelledBy ? ariaLabelledBy : null
	});

	const innerBlocksProps = InnerBlocksAppender({
		clientId,
		template,
		templateLock,
		blockProps
	});

	return (
		<>
			<Inspector {...props} />
			<section {...innerBlocksProps} />
		</>
	);
};

export default Edit;
