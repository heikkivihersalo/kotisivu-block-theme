import { __ } from "@wordpress/i18n";
import {
	useBlockProps,
	RichText
} from "@wordpress/block-editor";

const Save = (props) => {
	const {
		attributes: {
			name
		},
	} = props;

	const blockProps = useBlockProps.save({
		className: `contact-us__name`
	});

	return (
		<>
			<RichText.Content
				{...blockProps}
				value={name}
				tagName="h3"
			/>
		</>
	);
};

export default Save;
