import { __ } from "@wordpress/i18n";
import { InnerBlocks, useBlockProps } from "@wordpress/block-editor";

const Save = (props) => {
	const blockProps = useBlockProps.save({
		className: "contact-list-item"
	})

	return (
		<address {...blockProps}>
			<InnerBlocks.Content />
		</address>
	);
};

export default Save;
