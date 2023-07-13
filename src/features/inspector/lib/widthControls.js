import { __ } from "@wordpress/i18n";

import {
    PanelBody,
    PanelRow,
    Button,
    ButtonGroup
} from "@wordpress/components";

const WidthControls = (props) => {
    const {
        attributes: {
            width
        },
        setAttributes
    } = props;

    const handleWidthChange = (value) => {
        if (value === width) {
            setAttributes({ width: undefined });
            return;
        }

        setAttributes({ width: value });
    }

    return (
        <>
            <PanelBody title={__('Width Controls', 'kotisivu-block-theme')}>
                <PanelRow>
                    <div className="editor-width-controls">
                        <ButtonGroup>
                            <Button
                                icon="align-full-width"
                                isPressed={width === 'var(--wp--style--global--wide-size)'}
                                onClick={() => handleWidthChange('var(--wp--style--global--wide-size)')}
                            />
                            <Button
                                icon="align-wide"
                                isPressed={width === 'var(--wp--style--global--content-size)'}
                                onClick={() => handleWidthChange('var(--wp--style--global--content-size)')}
                            />
                        </ButtonGroup>
                    </div>
                </PanelRow>
            </PanelBody>
        </>
    )
}

export { WidthControls }
