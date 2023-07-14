import { __ } from "@wordpress/i18n";
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import classnames from 'classnames';
import { getBlockSyles } from '@utils/modifiers';

const Save = (props) => {
	const {
		attributes: {
			heroClass,
			ariaLabel,
			ariaLabelledBy,
			style,
			width,
			justifyItems,
			alignItems,
			isReversed
		}
	} = props;

	const innerBlocksProps = useInnerBlocksProps.save(useBlockProps.save({
		className: classnames(heroClass, isReversed),
		style: getBlockSyles({ style, width, justifyItems, alignItems }),
		'aria-label': ariaLabel ? ariaLabel : null,
		'aria-labelledby': ariaLabelledBy ? ariaLabelledBy : null
	}));

	return (
		<section {...innerBlocksProps} />
	)

};

export default Save;
