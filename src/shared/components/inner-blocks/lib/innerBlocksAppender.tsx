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

import { useSelect } from '@wordpress/data';

type Props = {
	clientId: string;
	template: Array<any> | undefined;
	templateLock?: false | 'contentOnly' | 'all' | 'insert' | undefined;
	allowedBlocks?: string[];
	blockProps: Object;
};

/**
 * InnerBlocksAppender Component
 * @param {Object} props Component properties
 * @param {string} props.clientId Block client ID
 * @param {Array<any>} props.template Template
 * @param {string[]} props.allowedBlocks Allowed blocks
 * @param {Object} props.blockProps Block properties
 * @return {InnerBlocksAppenderComponent} InnerBlocksAppender Component
 */
export const InnerBlocksAppender = ({
	clientId,
	template,
	templateLock,
	allowedBlocks,
	blockProps,
}: Props) => {
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

export type InnerBlocksAppenderReturnProps = ReturnType<
	typeof InnerBlocksAppender
>;
