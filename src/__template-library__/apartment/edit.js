import { __ } from "@wordpress/i18n";
import { useBlockProps } from '@wordpress/block-editor';
import { InnerBlocksAppender } from "@common-components/inspector";

import './editor.css';

const Edit = (props) => {
	const {
		attributes: {
			templateLock,
		},
		clientId,
	} = props;

	const template = [
		["ksd/apartment--description"],
		["ksd/image-optimized", { "className": "apartment__image" }],
		["ksd/apartment--feature"]
	]

	const allowedBlocks = [
		["ksd/apartment--description"],
		["ksd/image-optimized", { "className": "apartment__image" }],
		["ksd/apartment--feature"]
	]

	const blockProps = useBlockProps({
		className: "apartment",
	});

	const innerBlocksProps = InnerBlocksAppender({
		clientId: clientId,
		template: template,
		templateLock: templateLock,
		allowedBlocks: allowedBlocks,
		blockProps: blockProps
	});

	return (
		<>
			<section {...innerBlocksProps} />
		</>
	);
};

export default Edit;