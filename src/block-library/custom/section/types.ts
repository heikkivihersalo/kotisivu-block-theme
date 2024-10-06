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
type SectionBlockAttributes = {
	blockClass: string;
	style: StyleAttributes;
	ariaLabel: string;
	ariaLabelledBy: string;
	template: Template;
	templateLock: TemplateLock;
	allowedBlocks: AllowedBlocks;
	variationName: string;
	isReversed: boolean;
};

type SectionBlockProps = {
	attributes: SectionBlockAttributes;
	setAttributes: (newAttributes: Record<string, any>) => void;
	clientId: string;
};

/**
 * Export types
 */
type SectionBlockEdit = BlockEdit<SectionBlockAttributes, SectionBlockProps>;
type SectionBlockSave = BlockSave<SectionBlockAttributes>;
type SectionBlockConfig = BlockConfig<
	SectionBlockAttributes,
	SectionBlockProps
>;

export type {
	SectionBlockAttributes,
	SectionBlockProps,
	SectionBlockEdit,
	SectionBlockSave,
	SectionBlockConfig,
};
