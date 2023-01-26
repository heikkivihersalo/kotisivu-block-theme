import { __ } from "@wordpress/i18n";
import { InnerBlocks } from "@wordpress/block-editor";

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
