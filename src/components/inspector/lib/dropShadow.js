import { __ } from "@wordpress/i18n";
import { addModifiers } from '../../../utilities/modifiers';
import {
    PanelRow,
    ToggleControl
} from "@wordpress/components";


const DropShadow = (props) => {
    const {
        attributes: {
            cardModifiers,
            shadow,
        },
    } = props;

    return (
        <>
            <PanelRow>
                <ToggleControl
                    label={__("Drop Shadow", "kotisivu-theme-blocks")}
                    checked={shadow}
                    onChange={addModifiers(props, "shadow", shadow, "has-shadow", "cardModifiers", cardModifiers)}
                />
            </PanelRow>
        </>
    )
}

export { DropShadow }
