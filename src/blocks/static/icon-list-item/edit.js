import { __ } from "@wordpress/i18n";
import { useBlockProps, RichText } from "@wordpress/block-editor";
import { ImageSelector } from '@common-components/image';
import './editor.css';

const Edit = (props) => {
	const {
		attributes: {
			textContent
		},
		setAttributes
	} = props;

	const blockProps = useBlockProps({
		className: "icon-list__item"
	});

	return (
		<li {...blockProps}>
			<ImageSelector {...props} img />
			<RichText
				aria-label={__('Add item name', 'kotisivu-block-theme')}
				placeholder={__('Add item name', 'kotisivu-block-theme')}
				value={textContent}
				onChange={(content) => setAttributes({ textContent: content })}
			/>
		</li>
	);
};

export default Edit;
