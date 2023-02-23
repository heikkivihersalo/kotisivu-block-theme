import { __ } from "@wordpress/i18n";
import { useBlockProps } from '@wordpress/block-editor';
import { InnerBlocksAppender } from "@features/inspector";
import './editor.css';

const allowedBlocks = [
	"ksd/address--address",
	"ksd/address--email",
	"ksd/address--name",
	"ksd/address--phone"
];

const Edit = (props) => {
	const {
		attributes: {
			elementClass,
			template,
			templateLock,
		},
		clientId,
	} = props;


	const blockProps = useBlockProps({
		className: elementClass
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
			<address {...innerBlocksProps} />
		</>
	);
};

export default Edit;
