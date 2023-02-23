import { __ } from "@wordpress/i18n";
import { addModifiers } from '../../../utils/modifiers';
import {
    PanelRow,
    ToggleControl
} from "@wordpress/components";


const TransparentBackground = (props) => {
    const {
        attributes: {
            cardModifiers,
            transparentBackground,
        },
    } = props;

    return (
        <>
            <PanelRow>
                <ToggleControl
                    label={__("Transparent Background", "kotisivu-theme-blocks")}
                    checked={transparentBackground}
                    onChange={addModifiers(props, "transparentBackground", transparentBackground, "is-transparent", "cardModifiers", cardModifiers)}
                />
            </PanelRow>
        </>
    )
}

export { TransparentBackground }
