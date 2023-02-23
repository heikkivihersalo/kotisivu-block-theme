import { __ } from "@wordpress/i18n";
import { InnerBlocks, useBlockProps, RichText } from "@wordpress/block-editor";
import { ImageMarkup } from '@features/image';
import { cleanSpaces } from "@utils/modifiers";

const Save = (props) => {
	const {
		attributes: {
			textContent,
			modifiers
		},
	} = props;

	const blockProps = useBlockProps.save({
		className: cleanSpaces(`contact-us ${modifiers}`)
	})

	return (
		<section {...blockProps}>
			<RichText.Content tagName="h2" value={textContent} className="contact-us__heading" />
			<ImageMarkup {...props} img />
			<hr className="contact-us__separator" />
			<address className="contact-us__address-container">
				<InnerBlocks.Content />
			</address>
		</section>
	);
};

export default Save;
