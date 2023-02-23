import { __ } from "@wordpress/i18n";
import {
	useBlockProps,
	RichText
} from "@wordpress/block-editor";

const Save = (props) => {
	const {
		attributes: {
			title
		},
	} = props;

	const blockProps = useBlockProps.save({
		className: `contact-us__title`
	});

	return (
		<>
			<RichText.Content
				{...blockProps}
				value={title}
				tagName="p"
			/>
		</>
	);
};

export default Save;
