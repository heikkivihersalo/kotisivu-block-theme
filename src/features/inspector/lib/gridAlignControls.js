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
            style,
            isReversed
        },
        setAttributes
    } = props;

    const onAlignItems = (currentStyles, newAligment) => {
        if (newAligment === currentStyles?.alignItems) {
            setAttributes({
                style: {
                    ...currentStyles,
                    alignItems: undefined
                }
            })

            return;
        }

        setAttributes({
            style: {
                ...currentStyles,
                alignItems: newAligment
            }
        })
    }

    const onJustifyItems = (currentStyles, newJustify) => {
        if (newJustify === currentStyles?.justifyItems) {
            setAttributes({
                style: {
                    ...currentStyles,
                    justifyItems: undefined
                }
            });

            return;
        }

        setAttributes({
            style: {
                ...currentStyles,
                justifyItems: newJustify
            }
        })
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
                                    isPressed={style?.alignItems === 'center'}
                                    onClick={() => onAlignItems(style, 'center')}
                                />
                                <Button
                                    icon={<AlignItemsStart />}
                                    isPressed={style?.alignItems === 'start'}
                                    onClick={() => onAlignItems(style, 'start')}
                                />
                                <Button
                                    icon={<AlignItemsEnd />}
                                    isPressed={style?.alignItems === 'end'}
                                    onClick={() => onAlignItems(style, 'end')}
                                />
                                <Button
                                    icon={<AlignItemsStretch />}
                                    isPressed={style?.alignItems === 'stretch'}
                                    onClick={() => onAlignItems(style, 'stretch')}
                                />
                                <Button
                                    icon={<AlignItemsBaseline />}
                                    isPressed={style?.alignItems === 'baseline'}
                                    onClick={() => onAlignItems(style, 'baseline')}
                                />
                            </ButtonGroup>
                        </div>
                        <div>
                            <p>Justify-Items</p>
                            <ButtonGroup>
                                <Button
                                    icon={<JustifyItemsCenter />}
                                    isPressed={style?.justifyItems === 'center'}
                                    onClick={() => onJustifyItems(style, 'center')}
                                />
                                <Button
                                    icon={<JustifyItemsStart />}
                                    isPressed={style?.justifyItems === 'start'}
                                    onClick={() => onJustifyItems(style, 'start')}
                                />
                                <Button
                                    icon={<JustifyItemsEnd />}
                                    isPressed={style?.justifyItems === 'end'}
                                    onClick={() => onJustifyItems(style, 'end')}
                                />
                                <Button
                                    icon={<JustifyItemsStretch />}
                                    isPressed={style?.justifyItems === 'stretch'}
                                    onClick={() => onJustifyItems(style, 'stretch')}
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
