import { __ } from "@wordpress/i18n";
import { addModifiers } from '../../../utils/modifiers';
import {
    PanelRow,
    ToggleControl
} from "@wordpress/components";


const BackgroundImage = (props) => {
    const {
        attributes: {
            modifiers,
            hasBackgroundImage,
        },
    } = props;

    return (
        <>
            <PanelRow>
                <ToggleControl
                    label={__("Use Background Image", "kotisivu-theme-blocks")}
                    checked={hasBackgroundImage}
                    onChange={addModifiers(props, "hasBackgroundImage", hasBackgroundImage, "has-image", "modifiers", modifiers)}
                />
            </PanelRow>
        </>
    )
}

export { BackgroundImage }
