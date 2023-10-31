import { __ } from "@wordpress/i18n";
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

const Save = (props) => {
	const innerBlocksProps = useInnerBlocksProps.save(useBlockProps.save({
		className: props.attributes?.blockClass
	}));

	return (
		<ul {...innerBlocksProps} />
	)
};

export default Save;
