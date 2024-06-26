/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import ServerSideRender from '@wordpress/server-side-render';

/**
 * Internal dependencies
 */
import Inspector from './components/Inspector';
import './editor.css';

/**
 * Block edit function
 * @param {Object} props Properties
 * @return {JSX.Element} React component
 */
export default function Edit(props) {
	const blockProps = useBlockProps({
		className: 'site-logo-editor-wrapper',
	});

	return (
		<div {...blockProps}>
			<Inspector {...props} />
			<ServerSideRender
				block="ksd/part-logo-dynamic"
				attributes={props.attributes}
				className={props.className}
			/>
		</div>
	);
}
