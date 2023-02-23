import { __ } from "@wordpress/i18n";
import {
	useBlockProps,
	RichText
} from "@wordpress/block-editor";

const Save = (props) => {
	const {
		attributes: {
			tagContent
		},
	} = props;

	const blockProps = useBlockProps.save({
		className: `apartment-description__tag`
	});

	return (
		<>
			<RichText.Content tagName="span" value={tagContent} className="apartment-description__tag" />
		</>
	);
};

export default Save;
