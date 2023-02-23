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
		className: "link-list"
	});

	return (
			<address {...blockProps}>
				<InnerBlocks
					allowedBlocks="ksd/link-list-item"
					template={template}
					templateLock="all"
				/>
			</address>
	);
};

export default Edit;
