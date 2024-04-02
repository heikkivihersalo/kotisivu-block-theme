import {
	InnerBlocks,
	useInnerBlocksProps,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';


const InnerBlocksAppender = ( { clientId, template, templateLock, allowedBlocks, blockProps } ) => {
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