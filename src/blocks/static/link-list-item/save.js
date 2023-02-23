import { __ } from "@wordpress/i18n";
import {
	useBlockProps,
	RichText
} from "@wordpress/block-editor";

const Save = (props) => {
	const {
		attributes: {
			content,
			url,
			title,
			target,
			rel,
			mediaUrl,
			mediaAlt
		},
	} = props;

	const blockProps = useBlockProps.save({
		className: "link-list-item"
	});

	return (
		<>
			<RichText.Content
				{...blockProps}
				tagName="a"
				href={url}
				title={title}
				value={`<img src=${mediaUrl} alt=${mediaAlt}/>${content}`}
				target={target}
				rel={rel}
			/>
		</>
	);
};

export default Save;
