/**
 * WordPress dependencies
 */
import {
	InnerBlocks,
	useInnerBlocksProps,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';

/**
 * InnerBlocksAppender Component
 *
 * @param {Object} props Component props
 * @param {string} props.clientId Block client ID
 * @param {object[]} props.template InnerBlocks template
 * @param {boolean | string} props.templateLock TemplateLock Attribute
 * @param {string[]} props.allowedBlocks Allowed blocks
 * @param {Object} props.blockProps Block props
 * @return {JSX.Element} InspectorControl Element
 */
const InnerBlocksAppender = ({ clientId, template, templateLock, allowedBlocks, blockProps }) => {
	const { hasChildBlocks } = useSelect(
		(select) => {
			const { getBlockOrder } = select(blockEditorStore);
			return {
				hasChildBlocks: getBlockOrder(clientId).length > 0,
			};
		},
		[clientId]
	);

	return useInnerBlocksProps(
		{ ...blockProps },
		{
			template,
			templateLock,
			allowedBlocks,
			renderAppender: hasChildBlocks
				? undefined
				: InnerBlocks.ButtonBlockAppender
		}
	);
};

export { InnerBlocksAppender };