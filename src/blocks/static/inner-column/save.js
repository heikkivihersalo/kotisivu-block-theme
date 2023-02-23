import { __ } from "@wordpress/i18n";
import { useInnerBlocksProps, useBlockProps } from '@wordpress/block-editor';

const Save = (props) => {
	const innerBlocksProps = useInnerBlocksProps.save(useBlockProps.save());

	return (
		<div {...innerBlocksProps} />
	)

};

export default Save;
