import { __ } from "@wordpress/i18n";
import {
    PanelRow,
    ToggleControl
} from "@wordpress/components";

import { addModifiers } from '../../@utils';

const FullWidth = (props) => {
    const {
        attributes: {
            isFullWidth,
            className
        }
    } = props;

    return (
        <>
            <PanelRow>
                <ToggleControl
                    label={__("Full Width", "kotisivu-theme-blocks")}
                    checked={isFullWidth}
                    onChange={addModifiers(props, "isFullWidth", isFullWidth, "is-full-width", "className", className)}
                />
            </PanelRow>
        </>
    )
}

export default FullWidth
