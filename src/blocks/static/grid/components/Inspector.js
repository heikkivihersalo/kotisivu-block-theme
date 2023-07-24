/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { InspectorControls } from "@wordpress/block-editor";

/**
 * Internal dependencies
 */
import {
    BackgroundColorControl,
    GridAlignControls
} from "@features/inspector";

const Inspector = (props) => {
    return (
        <>
            <InspectorControls group="styles">
                <BackgroundColorControl {...props} />
                <GridAlignControls {...props} />
            </InspectorControls>
        </>
    );
};

export default Inspector;
