import { __ } from "@wordpress/i18n"
import { useBlockProps, RichText, InspectorControls } from "@wordpress/block-editor"
import { useRef } from '@wordpress/element';
import { PanelBody, ToggleControl } from "@wordpress/components";
import { IconSelector, LinkControls } from "@features/inspector";
import EditorWrapper from "../address/components/editorWrapper";

import './editor.css';

const icons = [
	{ label: 'Phone', value: 'fas fa-phone' },
	{ label: 'Phone square', value: 'fas fa-phone-square' },
	{ label: 'Phone square (alt)', value: 'fas fa-phone-square-alt' }
];

const Edit = (props) => {
	const {
		attributes: {
			content,
			hasIcon
		},
		setAttributes
	} = props;

	const ref = useRef();
	const richTextRef = useRef();
	const blockProps = useBlockProps(ref);

	return (
		<div {...blockProps}>
			<IconSelector props={props} icons={icons} />
			<LinkControls {...props} />
			<InspectorControls>
				<PanelBody title={__('Settings', 'kotisivu-block-theme')} initialOpen={true}>
					<ToggleControl
						label={__('Use icon', 'kotisivu-block-theme')}
						onChange={(hasIcon) => setAttributes({ hasIcon: !hasIcon })}
						value={hasIcon}
					/>
				</PanelBody>
			</InspectorControls>
			<EditorWrapper children={props.children} attributes={props.attributes}>
				<RichText
					ref={richTextRef}
					aria-label={__('Add phone number', 'kotisivu-block-theme')}
					placeholder={__('Add phone number', 'kotisivu-block-theme')}
					className="address__content address__content--phone"
					value={content}
					onChange={(content) => setAttributes({ content: content })}
					withoutInteractiveFormatting
				/>
			</EditorWrapper>
		</div>
	);
};

export default Edit;
