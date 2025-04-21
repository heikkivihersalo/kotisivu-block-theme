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
 * Types and interfaces
 */
interface EditProps {
	attributes: Record<string, any>;
	className: string;
}

/**
 * Block edit function
 * @param {EditProps} props Properties
 * @return {JSX.Element} React component
 */
export default function Edit(props: EditProps): JSX.Element {
	const blockProps = useBlockProps();

	return (
		<div {...blockProps}>
			<ServerSideRender
				block="ksd/part-logo"
				attributes={props.attributes}
				className={props.className}
			/>
		</div>
	);
}
