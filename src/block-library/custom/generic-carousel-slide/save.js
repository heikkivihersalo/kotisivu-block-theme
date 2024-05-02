/**
 * WordPress dependencies
 */
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

/**
 * Block save function
 * @param {Object} props Properties
 * @return {JSX.Element} Block innerBlocks markup
 */
export default function Save(props) {
	const {
		attributes: { blockClass },
	} = props;

	const innerBlocksProps = useInnerBlocksProps.save(
		useBlockProps.save({
			className: blockClass,
		})
	);

	return <li {...innerBlocksProps} />;
}
