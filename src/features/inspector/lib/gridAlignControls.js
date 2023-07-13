import { __ } from "@wordpress/i18n";

import {
    PanelBody,
    PanelRow,
    Button,
    ButtonGroup,
    ToggleControl
} from "@wordpress/components";

import {
    AlignItemsBaseline,
    AlignItemsCenter,
    AlignItemsEnd,
    AlignItemsStart,
    AlignItemsStretch,
    JustifyItemsCenter,
    JustifyItemsEnd,
    JustifyItemsStart,
    JustifyItemsStretch
}
    from "../icons.js";

const GridAlignControls = (props) => {
    const {
        attributes: {
            alignItems,
            justifyItems,
            isReversed
        },
        setAttributes
    } = props;

    const handleAlignItems = (value) => {
        if (value === alignItems) {
            setAttributes({ alignItems: undefined });
            return;
        }

        setAttributes({ alignItems: value });
    }

    const handleJustifyItems = (value) => {
        if (value === justifyItems) {
            setAttributes({ justifyItems: undefined });
            return;
        }

        setAttributes({ justifyItems: value });
    }

    return (
        <>
            <PanelBody title={__('Alignment Controls', 'kotisivu-block-theme')}>
                <PanelRow>
                    <div className="editor-alignment-controls">
                        <div>
                            <p>Align-Items</p>
                            <ButtonGroup>
                                <Button
                                    icon={<AlignItemsCenter />}
                                    isPressed={alignItems === 'center'}
                                    onClick={() => handleAlignItems('center')}
                                />
                                <Button
                                    icon={<AlignItemsStart />}
                                    isPressed={alignItems === 'start'}
                                    onClick={() => handleAlignItems('start')}
                                />
                                <Button
                                    icon={<AlignItemsEnd />}
                                    isPressed={alignItems === 'end'}
                                    onClick={() => handleAlignItems('end')}
                                />
                                <Button
                                    icon={<AlignItemsStretch />}
                                    isPressed={alignItems === 'stretch'}
                                    onClick={() => handleAlignItems('stretch')}
                                />
                                <Button
                                    icon={<AlignItemsBaseline />}
                                    isPressed={alignItems === 'baseline'}
                                    onClick={() => handleAlignItems('baseline')}
                                />
                            </ButtonGroup>
                        </div>
                        <div>
                            <p>Justify-Items</p>
                            <ButtonGroup>
                                <Button
                                    icon={<JustifyItemsCenter />}
                                    isPressed={justifyItems === 'center'}
                                    onClick={() => handleJustifyItems('center')}
                                />
                                <Button
                                    icon={<JustifyItemsStart />}
                                    isPressed={justifyItems === 'start'}
                                    onClick={() => handleJustifyItems('start')}
                                />
                                <Button
                                    icon={<JustifyItemsEnd />}
                                    isPressed={justifyItems === 'end'}
                                    onClick={() => handleJustifyItems('end')}
                                />
                                <Button
                                    icon={<JustifyItemsStretch />}
                                    isPressed={justifyItems === 'stretch'}
                                    onClick={() => handleJustifyItems('stretch')}
                                />
                            </ButtonGroup>
                        </div>
                    </div>
                </PanelRow>
                <PanelRow>
                    <ToggleControl
                        label={__('Reverse Order', 'kotisivu-block-theme')}
                        checked={isReversed}
                        onChange={() => setAttributes({ isReversed: !isReversed })}
                    />
                </PanelRow>
            </PanelBody>
        </>
    )
}

export { GridAlignControls }
