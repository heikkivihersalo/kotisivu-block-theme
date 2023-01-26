import { __ } from "@wordpress/i18n"
import { useBlockProps, RichText } from "@wordpress/block-editor"
import './editor.css';

const Edit = (props) => {
	const {
		attributes: {
			tagContent
		},
		setAttributes
	} = props;

	const blockProps = useBlockProps({
		className: "apartment-description__tag"
	});

	return (
		<RichText
			aria-label={__('Add tag text', 'kotisivu-block-theme')}
			placeholder={__('Add tag text', 'kotisivu-block-theme')}
			tagName="span"
			value={tagContent}
			className="apartment-description__tag"
			onChange={(content) => setAttributes({ tagContent: content })}
		/>
	);
};

export default Edit;
