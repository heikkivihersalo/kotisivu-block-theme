import { InnerBlocks } from '@wordpress/block-editor';

/**
 * Block save function
 * @param {Object} props Properties
 * @param {Object} props.attributes Block attributes
 * @return {JSX.Element} Block innerBlocks markup
 */
export default function Save() {
	return <InnerBlocks.Content />;
}
