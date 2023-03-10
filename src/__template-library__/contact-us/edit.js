import { __ } from "@wordpress/i18n";
import { InnerBlocks, useBlockProps, RichText, InspectorControls } from "@wordpress/block-editor";
import { PanelBody, ToggleControl } from "@wordpress/components";
import { ImageSelector } from '@common-components/image';
import { addModifiers, cleanSpaces } from "@utilities/modifiers";

import './editor.css';

const Edit = (props) => {
	const {
		attributes: {
			templateLock,
			textContent,
			isWide,
			modifiers
		},
		setAttributes
	} = props;

	const allowedBlocks= [
		"ksd/contact-us--name", 
		"ksd/contact-us--title", 
		"ksd/contact-us--phone",
		"ksd/contact-us--email"
	]

	const template = [
		["ksd/contact-us--name", {"className": "contact-us__address contact-us__address--name"}],
		["ksd/contact-us--title", {"className": "contact-us__address contact-us__address--title"}],
		["ksd/contact-us--phone", {"className": "contact-us__address contact-us__address--phone"}],
		["ksd/contact-us--email", {"className": "contact-us__address contact-us__address--email"}]
	]

	const blockProps = useBlockProps({
		className: cleanSpaces(`contact-us ${modifiers}`)
	});

	return (
		<section {...blockProps}>
			<InspectorControls>
				<PanelBody title={__('Settings', 'kotisivu-block-theme')} initialOpen={true}>
					<ToggleControl
						label={__('Set as wide', 'kotisivu-block-theme')}
						checked={isWide}
						onChange={addModifiers(props, "isWide", isWide, "is-wide", "modifiers", modifiers)}
					/>
				</PanelBody>
			</InspectorControls>
			<RichText
				aria-label={__('Add section heading', 'kotisivu-block-theme')}
				placeholder={__('Add section heading', 'kotisivu-block-theme')}
				tagName="h2"
				value={textContent}
				className="contact-us__heading"
				onChange={(content) => setAttributes({ textContent: content })}
			/>
			<ImageSelector {...props} img />
			<hr className="contact-us__separator" />
			<address className="contact-us__address-container">
				<InnerBlocks
					allowedBlocks={allowedBlocks}
					template={template}
					templateLock={templateLock}
				/>
			</address>
		</section>
	);
};

export default Edit;
