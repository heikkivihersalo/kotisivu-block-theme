import { __ } from "@wordpress/i18n"
import { IconSelector } from '@features/inspector';
import { useBlockProps, RichText, InspectorControls } from "@wordpress/block-editor"
import { PanelBody, ToggleControl } from "@wordpress/components";
import EditorWrapper from "../address/components/editorWrapper";
import './editor.css';

const icons = [
	{ label: 'Home', value: 'fas fa-home' }
];

const Edit = (props) => {
	const {
		attributes: {
			content,
			hasIcon
		},
		setAttributes
	} = props;

	const blockProps = useBlockProps();

	return (
		<div {...blockProps}>
			<IconSelector props={props} icons={icons} />
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
					aria-label={__('Add street address', 'kotisivu-block-theme')}
					placeholder={__('Add street address', 'kotisivu-block-theme')}
					className="address__content address__content--address"
					multiline
					value={content}
					onChange={(content) => setAttributes({ content: content })}
				/>
			</EditorWrapper>
		</div>
	);
};

export default Edit;
