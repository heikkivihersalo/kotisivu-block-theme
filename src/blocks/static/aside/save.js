import { __ } from "@wordpress/i18n";
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import classnames from 'classnames';
import { getBlockSyles } from '@utils/modifiers';

const Save = (props) => {
	const {
		attributes: {
			asideClass,
			style,
			width,
			justifyItems,
			alignItems,
			isReversed
		}
	} = props;

	const innerBlocksProps = useInnerBlocksProps.save(useBlockProps.save({
		className: classnames(asideClass, isReversed),
		style: getBlockSyles({ style, width, justifyItems, alignItems })
	}));

	return (
		<aside {...innerBlocksProps} />
	)

};

export default Save;
