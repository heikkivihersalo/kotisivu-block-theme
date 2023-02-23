import { __ } from "@wordpress/i18n";
import { InnerBlocks, useBlockProps } from "@wordpress/block-editor";

const Save = (props) => {
	const blockProps = useBlockProps.save({
		className: `contact-us form-container`
	})

	return (
		<section {...blockProps} >
			<InnerBlocks.Content />
		</section>
	);
};

export default Save;
