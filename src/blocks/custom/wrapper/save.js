import { __ } from "@wordpress/i18n";
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import classnames from 'classnames';
import { getBlockStyles, getIsReversedClass } from '@utils';

const Save = (props) => {
	const {
		attributes: {
			blockClass,
			style,
			isReversed
		}
	} = props;

	const innerBlocksProps = useInnerBlocksProps.save(useBlockProps.save({
		className: classnames(blockClass, getIsReversedClass(isReversed)),
		style: getBlockStyles({ style })
	}));

	return (
		<div {...innerBlocksProps} />
	)
};

export default Save;
