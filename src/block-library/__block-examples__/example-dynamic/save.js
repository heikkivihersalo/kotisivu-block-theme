/**
 * WordPress dependencies
 */
import { InnerBlocks } from '@wordpress/block-editor'

/**
 * Block save function
 * @returns {JSX.Element} - Block inner blocks markup
 */
export default function Save() {
	return <InnerBlocks.Content />
};
