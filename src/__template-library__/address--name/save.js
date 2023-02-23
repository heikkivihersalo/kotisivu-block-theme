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
            hasIcon
		},
	} = props;

	const blockProps = useBlockProps.save({
		className: `address__content address__content--address`
	});

    let newContent =
		hasIcon
		? `<i class="address__icon ${unicode}" aria-hidden="true"></i>${content}`
            : `${content}`

	return (
		<>
			<RichText.Content
				{...blockProps}
				value={newContent}
			/>
		</>
	);
};

export default Save;
