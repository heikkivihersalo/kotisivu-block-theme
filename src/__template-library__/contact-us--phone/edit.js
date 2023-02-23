import { __ } from "@wordpress/i18n"
import { useBlockProps, RichText} from "@wordpress/block-editor"
import { useRef } from '@wordpress/element';
import { LinkControls } from "@features/inspector";
import { ImageSelector } from "@features/image/index";

import './editor.css';


const Edit = (props) => {
	const {
		attributes: {
			content
		},
		setAttributes
	} = props;

	const ref = useRef();
	const richTextRef = useRef();
	const blockProps = useBlockProps({
		className: "contact-us--phone",
		ref: ref
	});

	return (
		<div {...blockProps}>
			<LinkControls {...props} />
			<ImageSelector {...props} img />
			<RichText
				ref={richTextRef}
				aria-label={__('Add phonenumber', 'kotisivu-block-theme')}
				placeholder={__('Add phonenumber', 'kotisivu-block-theme')}
				value={content}
				onChange={(content) => setAttributes({ content: content })}
				withoutInteractiveFormatting
			/>
		</div>
	);
};

export default Edit;
