/**
 * WordPress dependencies
 */
import type { BlockConfiguration } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import type { BlockJSON_ImageAttributes } from '@components/media';

/**
 * Lets define the BlockAttributes here
 * These will reflect the attributes that you have defined in your block.json file
 */
type BlockAttributes = {
	blockClass: string;
	images: BlockJSON_ImageAttributes[];
};

type BlockSetAttributes = (attributes: {
	images: BlockJSON_ImageAttributes[];
}) => void;

/**
 * Lets define the BlockEdit, BlockSave and BlockConfig types
 * In most cases you don't need to touch these types
 */
type BlockEdit = ({
	attributes,
	setAttributes,
}: {
	attributes: BlockAttributes;
	setAttributes: BlockSetAttributes;
}) => JSX.Element;

type BlockSave = ({
	attributes,
}: {
	attributes: BlockAttributes;
}) => JSX.Element | null;

type BlockConfig = BlockConfiguration & {
	save: BlockSave;
	edit: BlockEdit;
};

/**
 * Export the types so that other components can use them
 */
export type {
	BlockAttributes,
	BlockSetAttributes,
	BlockEdit,
	BlockSave,
	BlockConfig,
};
