import { __ } from "@wordpress/i18n";

import {
    PanelBody,
    PanelRow,
    Button,
    ButtonGroup
} from "@wordpress/components";

const WidthControls = ({ attributes, setAttributes }) => {
    const FULL_WIDTH = 'var(--wp--custom--wide-size)';
    const CONTENT_WIDTH = 'var(--wp--custom--content-size)';

    const onWidthChange = (currentStyles, newWidth) => {
        if (newWidth === currentStyles?.width) {
            setAttributes({
                style: {
                    ...currentStyles,
                    width: undefined
                }
            });

            return;
        }

        setAttributes({
            style: {
                ...currentStyles,
                width: newWidth
            }
        })
    }

    return (
        <>
            <PanelBody title={__('Width Controls', 'kotisivu-block-theme')}>
                <PanelRow>
                    <div className="editor-width-controls">
                        <ButtonGroup>
                            <Button
                                icon="align-full-width"
                                isPressed={attributes.style?.width === FULL_WIDTH}
                                onClick={() => onWidthChange(attributes.style, FULL_WIDTH)}
                            />
                            <Button
                                icon="align-wide"
                                isPressed={attributes.style?.width === CONTENT_WIDTH}
                                onClick={() => onWidthChange(attributes.style, CONTENT_WIDTH)}
                            />
                        </ButtonGroup>
                    </div>
                </PanelRow>
            </PanelBody>
        </>
    )
}

export { WidthControls }
