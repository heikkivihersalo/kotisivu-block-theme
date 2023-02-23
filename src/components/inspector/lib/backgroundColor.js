import { __ } from "@wordpress/i18n";
import { addModifiers } from '../../../utilities/modifiers';
import {
    PanelRow,
    ToggleControl,
    ColorPalette
} from "@wordpress/components";


const BackgroundColor = (props) => {
    const {
        attributes: {
            modifiers,
            backgroundColor,
            hasBackgroundColor
        },
        setAttributes
    } = props;

    const colors = [
        { name: 'primary-light', color: 'var(--wp--preset--color--primary-light)'},
        { name: 'primary', color: 'var(--wp--preset--color--primary)'},
        { name: 'primary-dark', color: 'var(--wp--preset--color--primary-dark)'},
        { name: 'secondary', color: 'var(--wp--preset--color--secondary)'},
        { name: 'background', color: 'var(--wp--preset--color--background)'},
        { name: 'foreground', color: 'var(--wp--preset--color--foreground)'},
        { name: 'grey-light', color: 'var(--wp--preset--color--grey-light)'},
        { name: 'grey', color: 'var(--wp--preset--color--grey)'},
        { name: 'grey-dark', color: 'var(--wp--preset--color--grey-dark)'}
    ]

    return (
        <>
            <PanelRow>
                <div class="editor__background-color-selector">
                    <ToggleControl
                        label={__("Use Background Color", "kotisivu-block-theme")}
                        checked={hasBackgroundColor}
                        onChange={addModifiers(props, "hasBackgroundColor", hasBackgroundColor, "has-bg-color", "modifiers", modifiers)}
                    />
                    {hasBackgroundColor && (
                        <ColorPalette
                            colors={colors}
                            value={backgroundColor}
                            onChange={(color) => { setAttributes({ backgroundColor: color }) }}
                        />
                    )}
                </div>
            </PanelRow>
        </>
    )
}

export { BackgroundColor }

ColorPalette