/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { InspectorControls } from "@wordpress/block-editor";

/**
 * Internal dependencies
 */
import {
    GridAlignControls
} from "@features/inspector";

const Inspector = (props) => {
    return (
        <>
            <InspectorControls group="styles">
                <GridAlignControls {...props} />
            </InspectorControls>
        </>
    );
};

export default Inspector;
