/**
 * WordPress dependencies
 */
import {
	InnerBlocks,
	useInnerBlocksProps,
	store as blockEditorStore,
	EditorTemplateLock,
} from '@wordpress/block-editor';

/**
 * Types
 */
import {
	Merged,
	Reserved,
} from '@wordpress/block-editor/components/use-block-props';
import { TemplateArray } from '@wordpress/blocks';
import { useSelect } from '@wordpress/data';

/**
 * InnerBlocksAppender Component
 * @param {string} clientId Block client ID
 * @param {TemplateArray} template Block template
 * @param {EditorTemplateLock} templateLock Block template lock
 * @param {string[]} allowedBlocks Allowed blocks
 * @param {object} blockProps Block properties
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
	template: TemplateArray | undefined;
	templateLock: EditorTemplateLock | undefined;
	allowedBlocks: string[];
	blockProps: object;
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
