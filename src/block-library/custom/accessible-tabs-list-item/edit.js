/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	RichText,
	InspectorControls,
} from '@wordpress/block-editor';
import { PanelBody, PanelRow, TextControl } from '@wordpress/components';

/**
 * Internal dependencies
 */
import './editor.css';

/**
 * Block edit function
 * @param {Object} props Properties
 * @return {JSX.Element} React component
 */
export default function Edit(props) {
	const {
		attributes: { tabName, tabId },
		setAttributes,
	} = props;

	/**
	 * Set block props
	 */
	const blockProps = useBlockProps({
		className:
			'accessible-tabs__list-item editor-accessible-tabs__list-item',
		role: 'presentation',
		'data-tab-id': `tab-${tabId}`,
	});

	/**
	 * Return block edit view
	 */
	return (
		<>
			<InspectorControls>
				<PanelBody title="Tab Settings">
					<PanelRow>
						<TextControl
							label="ID"
							help={__(
								'Numeric ID of the tab. The tab ID must be unique and match panel ID.',
								'kotisivu-block-theme'
							)}
							value={tabId}
							/**
							 * Set tab ID attribute
							 * @param {string} id - tab ID
							 * @return {void}
							 */
							onChange={(id) => setAttributes({ tabId: id })}
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>
			<li {...blockProps}>
				<RichText
					id={`tab-${tabId}`}
					role="tab"
					tagName="button"
					href={`#panel-${tabId}`}
					aria-selected={tabId === 1 ? 'true' : 'false'}
					className="accessible-tabs__list-item__button"
					placeholder="Tab Name"
					value={tabName}
					/**
					 * Set tab name attribute
					 * @param {string} name - tab name
					 * @return {void}
					 */
					onChange={(name) => props.setAttributes({ tabName: name })}
				/>
			</li>
		</>
	);
}
