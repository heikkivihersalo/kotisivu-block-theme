import { __ } from "@wordpress/i18n";
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import classnames from 'classnames';
import { getBlockSyles } from '@utils/modifiers';

const Save = (props) => {
	const {
		attributes: {
			wrapperClass,
			style,
			width,
			justifyItems,
			alignItems,
			isReversed
		}
	} = props;

	const getIsReversedClass = (isReversed) => {
		if (isReversed) {
			return 'is-reversed';
		}
		return false;
	}

	const innerBlocksProps = useInnerBlocksProps.save(useBlockProps.save({
		className: classnames(wrapperClass, isReversed),
		style: getBlockSyles({ style, width, justifyItems, alignItems })
	}));

	return (
		<div {...innerBlocksProps} />
	)

};

export default Save;
