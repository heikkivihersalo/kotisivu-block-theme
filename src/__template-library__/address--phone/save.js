import { __ } from "@wordpress/i18n";
import {
	useBlockProps,
	RichText
} from "@wordpress/block-editor";

const Save = (props) => {
	const {
		attributes: {
			content,
			unicode,
            hasIcon,
			url,
			title,
			target,
			rel,
			hasTracking,
			trackingIdentifier
		},
	} = props;

	const blockProps = useBlockProps.save({
		className: `address__content address__content--phone`
	});

    let newContent =
		hasIcon
            ? `<i class="address__icon ${unicode}" aria-hidden="true"></i>${content}`
            : `${content}`

	return (
		<>
			<RichText.Content
				{...blockProps}
				tagName="a"
				href={url}
				title={title}
				value={newContent}
				target={target}
				rel={rel}
				data-track={`${hasTracking ? "1" : "0"}`}
				data-identifier={trackingIdentifier}
			/>
		</>
	);
};

export default Save;
