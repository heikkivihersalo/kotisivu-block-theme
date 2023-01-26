import { __ } from "@wordpress/i18n";
import { addModifiers } from '../../../utilities/modifiers';
import {
    PanelRow,
    ToggleControl
} from "@wordpress/components";


const BigHeading = (props) => {
    const {
        attributes: {
            cardModifiers,
            bigHeading,
        },
    } = props;

    return (
        <>
            <PanelRow>
                <ToggleControl
                    label={__("Big Heading", "kotisivu-theme-blocks")}
                    checked={bigHeading}
                    onChange={addModifiers(props, "bigHeading", bigHeading, "has-big-heading", "cardModifiers", cardModifiers)}
                />
            </PanelRow>
        </>
    )
}

export { BigHeading }
