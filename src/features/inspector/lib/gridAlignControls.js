import { __ } from "@wordpress/i18n";

import {
    PanelBody,
    PanelRow,
    Button,
    ButtonGroup,
    ToggleControl
} from "@wordpress/components";

import {
    AlignContentCenter,
    AlignContentSpaceAround,
    AlignContentSpaceBetween,
    AlignContentSpaceEvenly,
    AlignContentStretch,
    AlignItemsBaseline,
    AlignItemsCenter,
    AlignItemsEnd,
    AlignItemsStart,
    AlignItemsStretch,
    JustifyContentCenter,
    JustifyContentEnd,
    JustifyContentSpaceAround,
    JustifyContentSpaceBetween,
    JustifyContentSpaceEvenly,
    JustifyContentStart,
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

    /**
     * Change block alignment attribute value to new one
     * @param currentStyles block current styles
     * @param key aligment style key (alignContent, alignItems, justifyContent, justifyItems)
     * @param newValue new aligment value based on selected key
     * @return { void } 
     */
    const onAlignChange = (currentStyles, key, newValue) => {
        if (newValue === currentStyles?.[key]) {
            setAttributes({
                style: {
                    ...currentStyles,
                    [key]: undefined
                }
            });

            return;
        }

        setAttributes({
            style: {
                ...currentStyles,
                [key]: newValue
            }
        });
    }

    return (
        <>
            <PanelBody title={__('Alignment Controls', 'kotisivu-block-theme')}>
                <PanelRow>
                    <div className="editor-alignment-controls">
                        <div>
                            <p>Align-Content</p>
                            <ButtonGroup>
                                <Button
                                    icon={<AlignContentCenter />}
                                    isPressed={style?.alignContent === 'center'}
                                    onClick={() => onAlignChange(style, 'alignContent', 'center')}
                                />
                                <Button
                                    icon={<AlignContentSpaceBetween />}
                                    isPressed={style?.alignContent === 'space-between'}
                                    onClick={() => onAlignChange(style, 'alignContent', 'space-between')}
                                />
                                <Button
                                    icon={<AlignContentSpaceAround />}
                                    isPressed={style?.alignContent === 'space-around'}
                                    onClick={() => onAlignChange(style, 'alignContent', 'space-around')}
                                />
                                <Button
                                    icon={<AlignContentSpaceEvenly />}
                                    isPressed={style?.alignContent === 'space-evenly'}
                                    onClick={() => onAlignChange(style, 'alignContent', 'space-evenly')}
                                />
                                <Button
                                    icon={<AlignContentStretch />}
                                    isPressed={style?.alignContent === 'stretch'}
                                    onClick={() => onAlignChange(style, 'alignContent', 'stretch')}
                                />
                            </ButtonGroup>
                        </div>
                        <div>
                            <p>Justify-Content</p>
                            <ButtonGroup>
                                <Button
                                    icon={<JustifyContentCenter />}
                                    isPressed={style?.justifyContent === 'center'}
                                    onClick={() => onAlignChange(style, 'justifyContent', 'center')}
                                />
                                <Button
                                    icon={<JustifyContentStart />}
                                    isPressed={style?.justifyContent === 'start'}
                                    onClick={() => onAlignChange(style, 'justifyContent', 'start')}
                                />
                                <Button
                                    icon={<JustifyContentEnd />}
                                    isPressed={style?.justifyContent === 'end'}
                                    onClick={() => onAlignChange(style, 'justifyContent', 'end')}
                                />
                                <Button
                                    icon={<JustifyContentSpaceBetween />}
                                    isPressed={style?.justifyContent === 'space-between'}
                                    onClick={() => onAlignChange(style, 'justifyContent', 'space-between')}
                                />
                                <Button
                                    icon={<JustifyContentSpaceAround />}
                                    isPressed={style?.justifyContent === 'space-around'}
                                    onClick={() => onAlignChange(style, 'justifyContent', 'space-around')}
                                />
                                <Button
                                    icon={<JustifyContentSpaceEvenly />}
                                    isPressed={style?.justifyContent === 'space-evenly'}
                                    onClick={() => onAlignChange(style, 'justifyContent', 'space-evenly')}
                                />
                            </ButtonGroup>
                        </div>
                        <div>
                            <p>Align-Items</p>
                            <ButtonGroup>
                                <Button
                                    icon={<AlignItemsCenter />}
                                    isPressed={style?.alignItems === 'center'}
                                    onClick={() => onAlignChange(style, 'alignItems', 'center')}
                                />
                                <Button
                                    icon={<AlignItemsStart />}
                                    isPressed={style?.alignItems === 'start'}
                                    onClick={() => onAlignChange(style, 'alignItems', 'start')}
                                />
                                <Button
                                    icon={<AlignItemsEnd />}
                                    isPressed={style?.alignItems === 'end'}
                                    onClick={() => onAlignChange(style, 'alignItems', 'end')}
                                />
                                <Button
                                    icon={<AlignItemsStretch />}
                                    isPressed={style?.alignItems === 'stretch'}
                                    onClick={() => onAlignChange(style, 'alignItems', 'stretch')}
                                />
                                <Button
                                    icon={<AlignItemsBaseline />}
                                    isPressed={style?.alignItems === 'baseline'}
                                    onClick={() => onAlignChange(style, 'alignItems', 'baseline')}
                                />
                            </ButtonGroup>
                        </div>
                        <div>
                            <p>Justify-Items</p>
                            <ButtonGroup>
                                <Button
                                    icon={<JustifyItemsCenter />}
                                    isPressed={style?.justifyItems === 'center'}
                                    onClick={() => onAlignChange(style, 'justifyItems', 'center')}
                                />
                                <Button
                                    icon={<JustifyItemsStart />}
                                    isPressed={style?.justifyItems === 'start'}
                                    onClick={() => onAlignChange(style, 'justifyItems', 'start')}
                                />
                                <Button
                                    icon={<JustifyItemsEnd />}
                                    isPressed={style?.justifyItems === 'end'}
                                    onClick={() => onAlignChange(style, 'justifyItems', 'end')}
                                />
                                <Button
                                    icon={<JustifyItemsStretch />}
                                    isPressed={style?.justifyItems === 'stretch'}
                                    onClick={() => onAlignChange(style, 'justifyItems', 'stretch')}
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
