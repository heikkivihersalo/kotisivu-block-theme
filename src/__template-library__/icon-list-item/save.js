import { __ } from "@wordpress/i18n";
import { useBlockProps, RichText } from "@wordpress/block-editor";
import { ImageMarkup } from '@features/image';

const Save = (props) => {
	const {
		attributes: {
			textContent
		},
	} = props;

	const blockProps = useBlockProps.save({
		className: "icon-list__item"
	});

	return (
		<li {...blockProps}>
			<ImageMarkup {...props} img />
			<RichText.Content value={textContent} />
		</li>
	);
};

export default Save;
