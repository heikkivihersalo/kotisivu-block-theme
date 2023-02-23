import { __ } from "@wordpress/i18n";
import { InnerBlocks, useBlockProps } from "@wordpress/block-editor";

const Save = (props) => {
	const {
		attributes: { }
	} = props;

	return (
		<>
			<InnerBlocks.Content />
		</>
	);
};

export default Save;
