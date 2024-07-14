/**
 * WordPress dependencies
 */
import {
	InnerBlocks,
	useInnerBlocksProps,
	store as blockEditorStore,
} from '@wordpress/block-editor';

/**
 * Types
 */
import {
	InnerBlocksAppenderProps,
	InnerBlocksAppenderComponent,
} from '@components/inner-blocks';
import { useSelect } from '@wordpress/data';

/**
 * InnerBlocksAppender Component
 * @param {Object} props Component properties
 * @param {string} props.clientId Block client ID
 * @param {Array<any>} props.template Template
 * @param {string[]} props.allowedBlocks Allowed blocks
 * @param {Object} props.blockProps Block properties
 * @return {InnerBlocksAppenderComponent} InnerBlocksAppender Component
 */
const InnerBlocksAppender = ({
	clientId,
	template,
	templateLock,
	allowedBlocks,
	blockProps,
}: InnerBlocksAppenderProps): InnerBlocksAppenderComponent => {
	const { hasChildBlocks } = useSelect(
		(select: any) => {
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
				: InnerBlocks.ButtonBlockAppender,
		}
	);
};

export { InnerBlocksAppender };
