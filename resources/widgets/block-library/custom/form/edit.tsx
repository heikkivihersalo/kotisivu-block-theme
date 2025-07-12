/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { InnerBlocksAppender } from '@/shared/components/inner-blocks/index.ts';
import Inspector from './components/Inspector.tsx';
import { getBlockStyles, classnames } from '@/shared/utils/index.ts';
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
}: {
	attributes: Record<string, any>;
	setAttributes: (newAttributes: Record<string, any>) => void;
	clientId: string;
}): JSX.Element {
	const {
		ariaLabel,
		ariaLabelledBy,
		blockClass,
		template,
		templateLock,
		style,
	} = attributes;

	/**
	 * Set block props
	 */
	const blockProps = useBlockProps({
		className: classnames(blockClass),
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

	return (
		<>
			<Inspector attributes={attributes} setAttributes={setAttributes} />
			<section {...innerBlocksProps} />
		</>
	);
}
