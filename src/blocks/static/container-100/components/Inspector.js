import { __ } from "@wordpress/i18n";
import { InspectorControls } from "@wordpress/block-editor";
import { PanelBody } from "@wordpress/components";
import { AlignmentReverse, BackgroundColor, ContainerControls } from "@features/inspector";

const Inspector = (props) => {
    return (
        <InspectorControls>
                <PanelBody title={__("Settings", "kotisivu-block-theme")} initialOpen={true}>
                    <AlignmentReverse {...props} />
                    <BackgroundColor {...props} />
                    <ContainerControls {...props} />
                </PanelBody>
        </InspectorControls>
    )
}

export default Inspector
