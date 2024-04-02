/**
 * WordPress dependencies
 */
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { getBlockStyles } from '@utils';

/**
 * Block save function
 * @param {Object} props Block props
 * @return {JSX.Element} React component
 */
export default function Save(props) {
	const {
		attributes: {
			blockClass,
			ariaLabel,
			ariaLabelledBy,
			style
		}
	} = props;

	const innerBlocksProps = useInnerBlocksProps.save(useBlockProps.save({
		className: blockClass,
		style: getBlockStyles({ style }),
		'aria-label': ariaLabel ? ariaLabel : null,
		'aria-labelledby': ariaLabelledBy ? ariaLabelledBy : null
	}));

	return (
		<section {...innerBlocksProps} />
	)

};
