import { __ } from "@wordpress/i18n";
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import classnames from 'classnames';
import { getBlockStyles, getIsReversedClass } from '@utils';

const Save = (props) => {
	const {
		attributes: {
			ariaLabel,
			ariaLabelledBy,
			blockClass,
			style,
			isReversed
		}
	} = props;

	const innerBlocksProps = useInnerBlocksProps.save(useBlockProps.save({
		className: classnames(blockClass, getIsReversedClass(isReversed)),
		style: getBlockStyles({ style }),
		'aria-label': ariaLabel ? ariaLabel : null,
		'aria-labelledby': ariaLabelledBy ? ariaLabelledBy : null
	}));

	return (
		<aside {...innerBlocksProps} />
	)
};

export default Save;
