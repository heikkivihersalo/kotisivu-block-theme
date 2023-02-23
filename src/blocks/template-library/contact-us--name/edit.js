import { __ } from "@wordpress/i18n"
import { useBlockProps, RichText } from "@wordpress/block-editor"
import './editor.css';

const Edit = (props) => {
	const {
		attributes: {
			name
		},
		setAttributes
	} = props;

	const blockProps = useBlockProps({
		className: "contact-us__name"
	});

	return (
		<RichText
			{...blockProps}
			aria-label={__('Add contact person name', 'kotisivu-block-theme')}
			placeholder={__('Add contact person name', 'kotisivu-block-theme')}
			tagName="h3"
			value={name}
			onChange={(content) => setAttributes({ name: content })}
		/>
	);
};

export default Edit;
