import { __ } from "@wordpress/i18n";
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import classnames from 'classnames';
import { getBlockSyles, getIsReversedClass } from '@utils/modifiers';

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
		style: getBlockSyles({ style })
	}));

	return (
		<div {...innerBlocksProps} />
	)
};

export default Save;
