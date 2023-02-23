import { __ } from "@wordpress/i18n";
import { InnerBlocks, useBlockProps } from "@wordpress/block-editor";

const Save = (props) => {

	const blockProps = useBlockProps.save({
		className: "columns-form"
	})

	return (
		<section {...blockProps}>
			<InnerBlocks.Content {...blockProps} />
		</section>
	);
};

export default Save;
