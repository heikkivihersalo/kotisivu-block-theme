import { __ } from "@wordpress/i18n";
import { useInnerBlocksProps, useBlockProps } from '@wordpress/block-editor';

const Save = (props) => {
	const {
		attributes: {
			elementClass
		},
	} = props;

	const blockProps = useBlockProps.save({
		className: elementClass
	});

	const innerBlocksProps = useInnerBlocksProps.save(blockProps);

	return (
		<>
			<address {...innerBlocksProps} />
		</>
	)
};

export default Save;
