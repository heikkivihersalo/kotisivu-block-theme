/**
 * WordPress dependencies
 */
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import classnames from 'classnames';

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
			className: classnames('splide__list', blockClass),
		})
	);

	return <ul {...innerBlocksProps} />;
}
