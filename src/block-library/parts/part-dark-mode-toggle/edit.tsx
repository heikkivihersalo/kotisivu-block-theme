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
 * @param {Object} props Properties
 * @param {Object} props.attributes Block attributes
 * @param {string} props.className Block class name
 * @return {JSX.Element} React component
 */
export default function Edit({
	attributes,
	className,
}: {
	attributes: Record<string, any>;
	className: string;
}): JSX.Element {
	const blockProps = useBlockProps();

	return (
		<div {...blockProps}>
			<ServerSideRender
				block="ksd/part-dark-mode-toggle"
				attributes={attributes}
				className={className}
			/>
		</div>
	);
}
