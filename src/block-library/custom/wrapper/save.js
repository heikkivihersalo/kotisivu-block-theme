/**
 * WordPress dependencies
 */
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import { getBlockStyles, getIsReversedClass } from '@utils';

/**
 * Block save function
 * @param {Object} props Properties
 * @return {JSX.Element} Block innerBlocks markup
 */
export default function Save(props) {
	const {
		attributes: { blockClass, style, isReversed },
	} = props;

	const innerBlocksProps = useInnerBlocksProps.save(
		useBlockProps.save({
			className: classnames(blockClass, getIsReversedClass(isReversed)),
			style: getBlockStyles({ style }),
		})
	);

	return <div {...innerBlocksProps} />;
}
