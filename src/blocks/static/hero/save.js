import { __ } from "@wordpress/i18n";
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import classnames from 'classnames';
import { getBlockSyles } from '@utils';

const Save = (props) => {
	const {
		attributes: {
			blockClass,
			ariaLabel,
			ariaLabelledBy,
			style
		}
	} = props;

	const innerBlocksProps = useInnerBlocksProps.save(useBlockProps.save({
		className: classnames(blockClass),
		style: getBlockSyles({ style }),
		'aria-label': ariaLabel ? ariaLabel : null,
		'aria-labelledby': ariaLabelledBy ? ariaLabelledBy : null
	}));

	return (
		<section {...innerBlocksProps} />
	)

};

export default Save;
