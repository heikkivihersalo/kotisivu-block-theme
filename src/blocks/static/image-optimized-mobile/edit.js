import { __ } from "@wordpress/i18n";
import { useEffect, useState } from "@wordpress/element";
import { InnerBlocks, useBlockProps } from "@wordpress/block-editor";
import { withDispatch } from '@wordpress/data';
import { setActiveState, setDeviceClass, setDeviceAttributes } from './utils';
import './editor.css';

export function ImageEdit({ attributes, handleTabClick, init }) {
	const {
		allowedBlocks,
		templateLock,
		template
	} = attributes;

	const [activeTab, setActiveTab] = useState("desktop");
	const blockProps = useBlockProps();

	useEffect(() => {
		init();
	}, []);

	return (
		<>
			<div {...blockProps} data-device={activeTab}>
				<div className="image-optimized-mobile__selector">
					<button
						className={`selector-tab selector-tab--desktop ${activeTab == "desktop" ? "active" : ""}`}
						onClick={(e) => {
							handleTabClick("desktop", activeTab);
							setActiveTab("desktop");
						}}
					>{__('Desktop', 'kotisivu-block-theme')}</button>
					<button
						className={`selector-tab selector-tab--mobile ${activeTab == "mobile" ? "active" : ""}`}
						onClick={(e) => {
							handleTabClick("mobile", activeTab);
							setActiveTab("mobile");
						}}
					>{__('Mobile', 'kotisivu-block-theme')}</button>
				</div>
				<InnerBlocks
					template={template}
					templateLock={templateLock}
					allowedBlocks={allowedBlocks}
				/>
			</div>
		</>
	);
};

export default withDispatch((dispatch, ownProps, registry) => ({
	/**
	 * Handle tab click
	 *
	 * @param {*} type
	 * @param {*} activeTab
	 * @return {*} 
	 */
	handleTabClick(type, activeTab) {
		const { clientId } = ownProps;
		const { getBlocks } = registry.select('core/block-editor');
		const innerBlocks = getBlocks(clientId);

		/**
		 * If clicked tab is already active, return
		 */
		if (type == activeTab) {
			return;
		}

		/**
		 * Loop through inner blocks and set isSelected attribute to true if block is active tab
		 */
		innerBlocks.forEach((block, index) => {
			let isSelected = block.attributes.isSelected;
			dispatch('core/block-editor').updateBlockAttributes(block.clientId, { isSelected: !isSelected });
			setDeviceClass(block, index == 0 ? 'desktop' : 'mobile');
			setDeviceAttributes(block, index == 0 ? 'desktop' : 'mobile');
			setActiveState(block);
		});
	},
	/**
	 * Init
	 */
	async init() {
		const { clientId } = ownProps;
		const { getBlocks } = registry.select('core/block-editor');
		const innerBlocks = getBlocks(clientId);

		/**
		 * Loop through inner blocks and set device class and attributes
		 */
		innerBlocks.forEach((block, index) => {
			// Desktop
			if (index == 0) {
				setDeviceAttributes(block, 'desktop');
				setDeviceClass(block, 'desktop');
			} 

			// Mobile
			if (index == 1) {
				setDeviceAttributes(block, 'mobile');
				setDeviceClass(block, 'mobile');
			}

			setActiveState(block);
		});
	}
}))(ImageEdit);
