/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import ServerSideRender from '@wordpress/server-side-render';

/**
 * Internal dependencies
 */
import './editor.css';

/**
 * Block edit function
 * @return {JSX.Element} React component
 */
export default function Edit() {
	const blockProps = useBlockProps();

	return (
		<div {...blockProps}>
			<ServerSideRender block="ksd/part-nav-header" />
		</div>
	);
}
