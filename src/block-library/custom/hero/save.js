/**
 * WordPress dependencies
 */
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import { getBlockStyles } from '@utils';

/**
 * Block save function
 * @param {Object} props Properties
 * @return {JSX.Element} Block innerBlocks markup
 */
export default function Save(props) {
	const {
		attributes: { blockClass, ariaLabel, ariaLabelledBy, style },
	} = props;

	const innerBlocksProps = useInnerBlocksProps.save(
		useBlockProps.save({
			className: classnames(blockClass),
			style: getBlockStyles({ style }),
			'aria-label': ariaLabel ? ariaLabel : null,
			'aria-labelledby': ariaLabelledBy ? ariaLabelledBy : null,
		})
	);

	return <section {...innerBlocksProps} />;
}
