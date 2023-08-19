import { __ } from "@wordpress/i18n";
import { InspectorControls } from "@wordpress/block-editor";
import {
    PanelBody,
    PanelRow,
    ToggleControl
} from "@wordpress/components";

const Inspector = (props) => {
    const {
        attributes: {
            isLink
        },
        setAttributes
    } = props

    return (
        <InspectorControls>
            <PanelBody title={__("Site logo settings", "kotisivu-block-theme")} initialOpen={true}>
                <PanelRow>
                    <ToggleControl
                        label={__('Enable home link', 'kotisivu-block-theme')}
                        checked={isLink}
                        onChange={() => { setAttributes({ isLink: !isLink }) }}
                    />
                </PanelRow>
            </PanelBody>
        </InspectorControls>
    )
}

export default Inspector
