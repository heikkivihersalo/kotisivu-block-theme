import { __ } from "@wordpress/i18n";
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import classnames from 'classnames';
import { getBlockSyles, getIsReversedClass } from '@utils/index';

const Save = (props) => {
	const {
		attributes: {
			mapClass,
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
		className: classnames(mapClass, getIsReversedClass(isReversed)),
		style: getBlockSyles({ style, width, justifyItems, alignItems }),
		'aria-label': ariaLabel ? ariaLabel : null,
		'aria-labelledby': ariaLabelledBy ? ariaLabelledBy : null
	}));

	return (
		<section {...innerBlocksProps} />
	)

};

export default Save;
