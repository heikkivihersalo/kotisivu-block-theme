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
	Merged,
	Reserved,
} from '@wordpress/block-editor/components/use-block-props';
import { useSelect } from '@wordpress/data';

/**
 * InnerBlocksAppender Component
 * @param {Object} props Component properties
 * @param {string} props.clientId Block client ID
 * @param {Array<any>} props.template Template
 * @param {string[]} props.allowedBlocks Allowed blocks
 * @param {Object} props.blockProps Block properties
 * @return {Omit<{}, 'ref'> & Merged & Reserved & {children: React.ReactElement}} InnerBlocksAppender Component
 */
const InnerBlocksAppender = ({
	clientId,
	template,
	templateLock,
	allowedBlocks,
	blockProps,
}: {
	clientId: string;
	template: Array<any> | undefined;
	templateLock: false | 'contentOnly' | 'all' | 'insert' | undefined;
	allowedBlocks: string[];
	blockProps: Object;
}): Omit<{}, 'ref'> &
	Merged &
	Reserved & {
		children: React.ReactElement;
	} => {
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
