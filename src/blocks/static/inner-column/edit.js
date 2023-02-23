import { __ } from "@wordpress/i18n";
import { useBlockProps } from '@wordpress/block-editor';
import { InnerBlocksAppender } from '@features/inspector';
import './editor.css';

const Edit = (props) => {
	const {
		attributes: {
			template,
			templateLock,
			allowedBlocks
		},
		clientId,
	} = props;

	const blockProps = useBlockProps();

	const innerBlocksProps = InnerBlocksAppender({
		clientId: clientId,
		template: template,
		templateLock: templateLock,
		allowedBlocks: allowedBlocks,
		blockProps: blockProps
	});

	return (
			<div {...innerBlocksProps} />
	);
};

export default Edit;
