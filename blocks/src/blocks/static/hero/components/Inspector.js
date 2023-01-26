import { __ } from "@wordpress/i18n";
import { InspectorControls } from "@wordpress/block-editor";
import { ImageSelectorSidebar } from '@common-components/image';
import { BackgroundImage } from '@common-components/inspector';
import {
    PanelBody
} from "@wordpress/components";

const Inspector = (props) => {
    const {
        attributes: {
            hasBackgroundImage
        }
    } = props;

    return (
        <InspectorControls>
            <PanelBody title={__("Hero Settings", "kotisivu-block-theme")} initialOpen={true}>
                <BackgroundImage {...props} />
            </PanelBody>
            {hasBackgroundImage && (
                <ImageSelectorSidebar {...props} />
                )}
        </InspectorControls>
    )
}

export default Inspector
