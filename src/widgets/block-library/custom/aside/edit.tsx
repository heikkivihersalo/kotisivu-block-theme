/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { InnerBlocksAppender } from '@/shared/components/inner-blocks';
import { getBlockStyles, classnames } from '@/shared/utils';

import Inspector from './components/Inspector';

import type { BlockProps } from './types';

import './editor.css';

/**
 * Block edit function
 * @param {Object} props Properties
 * @param {Record<string, any>} props.attributes Block attributes
 * @param {Function} props.setAttributes Block attributes setter
 * @param {string} props.clientId Block client ID
 * @return {JSX.Element} React component
 */
export default function Edit({
	attributes,
	setAttributes,
	clientId,
}: BlockProps): JSX.Element {
	const { ariaLabel, ariaLabelledBy, template, templateLock, style, cn } =
		attributes;

	/**
	 * Set block props
	 */
	const blockProps = useBlockProps({
		className: classnames(...cn),
		style: getBlockStyles(style),
		'aria-label': ariaLabel ? ariaLabel : undefined,
		'aria-labelledby': ariaLabelledBy ? ariaLabelledBy : undefined,
	} as Record<string, any>);

	const innerBlocksProps = InnerBlocksAppender({
		clientId,
		template,
		templateLock,
		blockProps,
	});

	/**
	 * Return block edit view
	 */
	return (
		<>
			<Inspector attributes={attributes} setAttributes={setAttributes} />
			<section {...innerBlocksProps} />
		</>
	);
}
