/**
 * WordPress dependencies
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import type { EditorTemplateLock } from '@wordpress/block-editor';
import type { Template } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import './editor.css';

/**
 * Block attributes
 */
type Props = {
	attributes: {
		template: Template[];
		templateLock: EditorTemplateLock;
		allowedBlocks: string[];
	};
	className: string;
};

/**
 * Block edit function
 * @param {Object} props Properties
 * @param {Object} props.attributes Block attributes
 * @param {string} props.className Block class name
 * @return {JSX.Element} React component
 */
export default function Edit(props: Props): JSX.Element {
	const {
		attributes: { template, templateLock, allowedBlocks },
	} = props;

	/**
	 * Set block props
	 */
	const blockProps = useBlockProps();

	return (
		<footer {...blockProps}>
			<InnerBlocks
				template={template}
				templateLock={templateLock}
				allowedBlocks={allowedBlocks}
			/>
		</footer>
	);
}
