/**
 * Internal dependencies
 */
import type {
	AllowedBlocks,
	BlockStyleAttributes,
	BlockConfig as DefaultConfig,
	BlockEdit as DefaultEdit,
	BlockSave as DefaultSave,
	Template,
	TemplateLock,
} from '@/shared/types/block-editor';

/**
 * Block attributes and props
 */
export type BlockAttributes = {
	cn: string[];
	style: BlockStyleAttributes;
	template: Template;
	templateLock: TemplateLock;
	allowedBlocks: AllowedBlocks;
};

export type BlockProps = {
	attributes: BlockAttributes;
	setAttributes: (newAttributes: Record<string, any>) => void;
	clientId: string;
};

export type BlockEdit = DefaultEdit<BlockAttributes, BlockProps>;
export type BlockSave = DefaultSave<BlockAttributes>;
export type BlockConfig = DefaultConfig<BlockAttributes, BlockProps>;
