/**
 * Internal dependencies
 */
import {
	Template,
	TemplateLock,
	AllowedBlocks,
	BlockSave,
	BlockEdit,
	BlockConfig,
} from '@block-library/custom';

import { StyleAttributes } from '@utils';

/**
 * Block attributes and props
 */
type WrapperBlockAttributes = {
	blockClass: string;
	style: StyleAttributes;
	template: Template;
	templateLock: TemplateLock;
	allowedBlocks: AllowedBlocks;
	variationName: string;
	isReversed: boolean;
};

type WrapperBlockProps = {
	attributes: WrapperBlockAttributes;
	setAttributes: (newAttributes: Record<string, any>) => void;
	clientId: string;
};

/**
 * Export types
 */
type WrapperBlockEdit = BlockEdit<WrapperBlockAttributes, WrapperBlockProps>;
type WrapperBlockSave = BlockSave<WrapperBlockAttributes>;
type WrapperBlockConfig = BlockConfig<
	WrapperBlockAttributes,
	WrapperBlockProps
>;

export type {
	WrapperBlockAttributes,
	WrapperBlockProps,
	WrapperBlockEdit,
	WrapperBlockSave,
	WrapperBlockConfig,
};
