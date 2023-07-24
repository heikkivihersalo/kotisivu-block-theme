import { __ } from "@wordpress/i18n";
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import classnames from 'classnames';
import { getBlockSyles } from '@utils';

const Save = (props) => {
	const {
		attributes: {
			blockClass,
			style
		}
	} = props;

	const innerBlocksProps = useInnerBlocksProps.save(useBlockProps.save({
		className: classnames(blockClass),
		style: getBlockSyles({ style })
	}));

	return (
		<div {...innerBlocksProps} />
	)

};

export default Save;
