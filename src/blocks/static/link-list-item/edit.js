import { __ } from "@wordpress/i18n"
import { useBlockProps, RichText} from "@wordpress/block-editor"
import { useRef } from '@wordpress/element';
import { LinkControls } from "@common-components/inspector";
import { ImageSelector } from "@common-components/image/index";

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
		className: "link-list-item",
		ref: ref
	});

	return (
		<div {...blockProps}>
			<LinkControls {...props} />
			<ImageSelector {...props} img />
			<RichText
				ref={richTextRef}
				aria-label={__('Add text', 'kotisivu-block-theme')}
				placeholder={__('Add text', 'kotisivu-block-theme')}
				value={content}
				onChange={(content) => setAttributes({ content: content })}
				withoutInteractiveFormatting
			/>
		</div>
	);
};

export default Edit;
