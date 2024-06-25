/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import {
	useBlockProps,
	InnerBlocks,
	useInnerBlocksProps,
} from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import Inspector from './components/Inspector';
import ActionButtons from './components/ActionButtons';

/**
 * Styles
 */
import './editor.css';

/**
 * Block edit function
 * @param {Object} props - block props
 * @return {Object} - React component
 */
export default function Edit(props) {
	const {
		attributes: { panelId, allowedBlocks, template, templateLock },
		clientId,
	} = props;

	// const { selectBlock } = useDispatch('core/block-editor');

	const blockProps = useBlockProps({
		className: 'accessible-tabs__panel editor-accessible-tabs__panel',
	});

	/**
	 * Set block props
	 */
	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		template,
		templateLock,
		allowedBlocks,
		directInsert: true,
		renderAppender: () => <InnerBlocks.DefaultBlockAppender />,
	});

	/**
	 * Return block edit view
	 */
	return (
		<>
			<Inspector {...props} />
			<section
				id={`panel-${panelId}`}
				role="tabpanel"
				className={innerBlocksProps.className}
				style={null}
				aria-labelledby={`tab-${panelId}`}
				tabIndex="0"
				data-editor-name={
					// Translators: %s: Panel number (ID).
					sprintf(__('Panel %s', 'kotisivu-block-theme'), panelId)
				}
			>
				<ActionButtons clientId={clientId} />
				<div className="editor-accessible-tabs__panel-content">
					{innerBlocksProps.children}
				</div>
			</section>
		</>
	);
}
