/**
 * WordPress dependencies
 */
import {
	useBlockProps,
} from "@wordpress/block-editor";
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import { InnerBlocksAppender } from '@components/inspector';
import Inspector from "./components/Inspector.jsx";
import { getBlockStyles } from '@utils';
import './editor.css';

/**
 * Block edit function
 * @param {Object} props Properties
 * @return {JSX.Element} React component
 */
export default function Edit(props) {
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
