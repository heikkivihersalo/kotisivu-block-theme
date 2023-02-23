import { __ } from "@wordpress/i18n";
import { InnerBlocks, useBlockProps } from "@wordpress/block-editor";

import './editor.css';

const Edit = (props) => {
	const {
		attributes: {
			template
		},
	} = props;

	const blockProps = useBlockProps({
		className: "contact-list-item"
	});

	return (
			<address {...blockProps}>
				<InnerBlocks
					allowedBlocks="ksd/contact-list-item"
					template={template}
					templateLock="all"
				/>
			</address>
	);
};

export default Edit;
