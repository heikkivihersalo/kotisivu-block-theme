import { __ } from "@wordpress/i18n"
import { useBlockProps, RichText } from "@wordpress/block-editor"
import './editor.css';

const Edit = (props) => {
	const {
		attributes: {
			title
		},
		setAttributes
	} = props;

	const blockProps = useBlockProps({
		className: "contact-us__title"
	});

	return (
		<RichText
			{...blockProps}
			aria-label={__('Add contact person title', 'kotisivu-block-theme')}
			placeholder={__('Add contact person title', 'kotisivu-block-theme')}
			className="contact-us__title"
			tagName="p"
			value={title}
			onChange={(content) => setAttributes({ title: content })}
		/>
	);
};

export default Edit;
