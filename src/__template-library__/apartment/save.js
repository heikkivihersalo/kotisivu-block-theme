import { __ } from "@wordpress/i18n";
import { useInnerBlocksProps, useBlockProps } from '@wordpress/block-editor';

const Save = (props) => {
	const blockProps = useBlockProps.save({
		className: "apartment",
	});

	const innerBlocksProps = useInnerBlocksProps.save(blockProps);

	return (
		<>
			<section {...innerBlocksProps} />
		</>
	)

};

export default Save;
