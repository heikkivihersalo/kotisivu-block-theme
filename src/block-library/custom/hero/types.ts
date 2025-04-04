/**
 * Internal dependencies
 */
import {
	Template,
	TemplateLock,
	AllowedBlocks,
	BlockSave as DefaultSave,
	BlockEdit as DefaultEdit,
	BlockConfig as DefaultConfig,
} from '@block-library/custom';

import { StyleAttributes } from '@utils';

/**
 * Block attributes and props
 */
export type BlockAttributes = {
	blockClass: string;
	style: StyleAttributes;
	ariaLabel: string;
	ariaLabelledBy: string;
	template: Template;
	templateLock: TemplateLock;
	allowedBlocks: AllowedBlocks;
	variationName: string;
};

export type BlockProps = {
	attributes: BlockAttributes;
	setAttributes: (newAttributes: Record<string, any>) => void;
	clientId: string;
};

export type BlockEdit = DefaultEdit<BlockAttributes, BlockProps>;
export type BlockSave = DefaultSave<BlockAttributes>;
export type BlockConfig = DefaultConfig<BlockAttributes, BlockProps>;
