/**
 * WordPress dependencies
 */
declare const wp: any;
const { create, insert, toHTMLString } = wp.richText;
const { updateBlock } = wp.data.dispatch('core/block-editor');

import type { BlockInstance } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
type Props = {
	selectedBlock: BlockInstance | null;
	newContent: string;
	start: number;
	end: number;
};

/**
 * Replace selected content from rich text element
 * @param {Object} props
 * @param {BlockInstance|null} props.selectedBlock Selected block
 * @param {string} props.newContent New content
 * @param {number} props.start Start index
 * @param {number} props.end End index
 * @return {void} void
 */
function replateSelectedText({
	selectedBlock,
	newContent,
	start,
	end,
}: Props): void {
	if (!selectedBlock) {
		return;
	}

	const blockContent = insert(
		selectedBlock.attributes.content,
		newContent,
		start,
		end
	);

	const richTextContent = create({
		text: blockContent.text,
	});

	const htmlContent = toHTMLString({
		value: richTextContent,
	});

	updateBlock(selectedBlock.clientId, {
		attributes: {
			content: htmlContent,
		},
	});
}

export { replateSelectedText };
