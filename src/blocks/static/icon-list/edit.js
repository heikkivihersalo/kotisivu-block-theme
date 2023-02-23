import { __ } from "@wordpress/i18n";
import { InnerBlocks, useBlockProps } from "@wordpress/block-editor";
import { InnerBlocksAppender } from '@features/inspector';
import './editor.css';

const Edit = (props) => {
	const {
		attributes: {
			template,
			allowedBlocks,
			templateLock
		},
		clientId
	} = props;

	const blockProps = useBlockProps({
		className: `icon-list`
	});

	const innerBlocksProps = InnerBlocksAppender({
		clientId: clientId,
		template: template,
		templateLock: templateLock,
		allowedBlocks: allowedBlocks,
		blockProps: blockProps
	});

	return (
		<ul {...innerBlocksProps} />
	);
};

export default Edit;
