import { __ } from "@wordpress/i18n";
import { InnerBlocks, useBlockProps } from "@wordpress/block-editor";

const Save = (props) => {
	const blockProps = useBlockProps.save({
		className: `social-icon-list`
	})

	return (
		<div {...blockProps} >
			<InnerBlocks.Content />
		</div>
	);
};

export default Save;
