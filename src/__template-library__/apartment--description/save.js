import { __ } from "@wordpress/i18n";
import { InnerBlocks, useBlockProps } from "@wordpress/block-editor";

const Save = (props) => {
	const blockProps = useBlockProps.save({
		className: "apartment-description"
	})

	return (
		<div {...blockProps}>
			<InnerBlocks.Content {...blockProps} />
		</div>
	);
};

export default Save;
