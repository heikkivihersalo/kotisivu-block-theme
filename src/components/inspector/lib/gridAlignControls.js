/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
    PanelBody,
    PanelRow,
    Button,
    ButtonGroup,
    ToggleControl
} from "@wordpress/components";

/**
 * Internal dependencies
 */
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
    from "@icons";

/**
 * Controllers for grid aligment
 *
 * @param {Object} props Block props
 * @return {JSX.Element} InspectorControl Element
 */
const GridAlignControls = (props) => {
    const {
        attributes: {
            style,
            isReversed
        },
        setAttributes
    } = props;

    /** @typedef {'alignContent' | 'alignItems' | 'justifyContent' | 'justifyItems'} GridAttribute */
    /** @typedef {'center' | 'space-between' | 'space-around' | 'space-evenly' | 'stretch'} AlignContent */
    /** @typedef {'center' | 'start' | 'end' | 'stretch' | 'baseline'} AlignItems */
    /** @typedef {'center' | 'start' | 'end' | 'space-between' | 'space-around' | 'space-evenly'} JustifyContent */
    /** @typedef {'center' | 'start' | 'end' | 'stretch'} JustifyItems */
    /**
     * Change block alignment attribute value to new one
     * @param {Object} currentStyles block current styles
     * @param {GridAttribute} key aligment style key
     * @param {AlignContent | AlignItems | JustifyContent | JustifyItems} newValue new aligment value based on selected key
     * @return {void}
     */
    const onStyleChange = (currentStyles, key, newValue) => {
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

    const currentStyleCSS = {
        opacity: 0.7,
        color: "var(--wp--preset--color--black)"
    }

    return (
        <>
            <PanelBody title={__('Alignment Controls', 'kotisivu-block-theme')}>
                <PanelRow>
                    <div className="editor-alignment-controls">
                        <div>
                            <p>align-content: <span style={currentStyleCSS}>{style?.alignContent}</span></p>
                            <ButtonGroup>
                                <Button
                                    label="Add align-content: center"
                                    showTooltip="true"
                                    icon={<AlignContentCenter />}
                                    isPressed={style?.alignContent === 'center'}
                                    onClick={() => onStyleChange(style, 'alignContent', 'center')}
                                />
                                <Button
                                    label="Add align-content: space-between"
                                    showTooltip="true"
                                    icon={<AlignContentSpaceBetween />}
                                    isPressed={style?.alignContent === 'space-between'}
                                    onClick={() => onStyleChange(style, 'alignContent', 'space-between')}
                                />
                                <Button
                                    label="Add align-content: space-around"
                                    showTooltip="true"
                                    icon={<AlignContentSpaceAround />}
                                    isPressed={style?.alignContent === 'space-around'}
                                    onClick={() => onStyleChange(style, 'alignContent', 'space-around')}
                                />
                                <Button
                                    label="Add align-content: space-evenly"
                                    showTooltip="true"
                                    icon={<AlignContentSpaceEvenly />}
                                    isPressed={style?.alignContent === 'space-evenly'}
                                    onClick={() => onStyleChange(style, 'alignContent', 'space-evenly')}
                                />
                                <Button
                                    label="Add align-content: stretch"
                                    showTooltip="true"
                                    icon={<AlignContentStretch />}
                                    isPressed={style?.alignContent === 'stretch'}
                                    onClick={() => onStyleChange(style, 'alignContent', 'stretch')}
                                />
                            </ButtonGroup>
                        </div>
                        <div>
                            <p>justify-content: <span style={currentStyleCSS}>{style?.justifyContent}</span></p>
                            <ButtonGroup>
                                <Button
                                    label="Add justify-content: center"
                                    showTooltip="true"
                                    icon={<JustifyContentCenter />}
                                    isPressed={style?.justifyContent === 'center'}
                                    onClick={() => onStyleChange(style, 'justifyContent', 'center')}
                                />
                                <Button
                                    label="Add justify-content: start"
                                    showTooltip="true"
                                    icon={<JustifyContentStart />}
                                    isPressed={style?.justifyContent === 'start'}
                                    onClick={() => onStyleChange(style, 'justifyContent', 'start')}
                                />
                                <Button
                                    label="Add justify-content: end"
                                    showTooltip="true"
                                    icon={<JustifyContentEnd />}
                                    isPressed={style?.justifyContent === 'end'}
                                    onClick={() => onStyleChange(style, 'justifyContent', 'end')}
                                />
                                <Button
                                    label="Add justify-content: space-between"
                                    showTooltip="true"
                                    icon={<JustifyContentSpaceBetween />}
                                    isPressed={style?.justifyContent === 'space-between'}
                                    onClick={() => onStyleChange(style, 'justifyContent', 'space-between')}
                                />
                                <Button
                                    label="Add justify-content: space-around"
                                    showTooltip="true"
                                    icon={<JustifyContentSpaceAround />}
                                    isPressed={style?.justifyContent === 'space-around'}
                                    onClick={() => onStyleChange(style, 'justifyContent', 'space-around')}
                                />
                                <Button
                                    label="Add justify-content: space-evenly"
                                    showTooltip="true"
                                    icon={<JustifyContentSpaceEvenly />}
                                    isPressed={style?.justifyContent === 'space-evenly'}
                                    onClick={() => onStyleChange(style, 'justifyContent', 'space-evenly')}
                                />
                            </ButtonGroup>
                        </div>
                        <div>
                            <p>align-items: <span style={currentStyleCSS}>{style?.alignItems}</span></p>
                            <ButtonGroup>
                                <Button
                                    label="Add align-items: center"
                                    showTooltip="true"
                                    icon={<AlignItemsCenter />}
                                    isPressed={style?.alignItems === 'center'}
                                    onClick={() => onStyleChange(style, 'alignItems', 'center')}
                                />
                                <Button
                                    label="Add align-items: start"
                                    showTooltip="true"
                                    icon={<AlignItemsStart />}
                                    isPressed={style?.alignItems === 'start'}
                                    onClick={() => onStyleChange(style, 'alignItems', 'start')}
                                />
                                <Button
                                    label="Add align-items: end"
                                    showTooltip="true"
                                    icon={<AlignItemsEnd />}
                                    isPressed={style?.alignItems === 'end'}
                                    onClick={() => onStyleChange(style, 'alignItems', 'end')}
                                />
                                <Button
                                    label="Add align-items: stretch"
                                    showTooltip="true"
                                    icon={<AlignItemsStretch />}
                                    isPressed={style?.alignItems === 'stretch'}
                                    onClick={() => onStyleChange(style, 'alignItems', 'stretch')}
                                />
                                <Button
                                    label="Add align-items: baseline"
                                    showTooltip="true"
                                    icon={<AlignItemsBaseline />}
                                    isPressed={style?.alignItems === 'baseline'}
                                    onClick={() => onStyleChange(style, 'alignItems', 'baseline')}
                                />
                            </ButtonGroup>
                        </div>
                        <div>
                            <p>justify-items: <span style={currentStyleCSS}>{style?.justifyItems}</span></p>
                            <ButtonGroup>
                                <Button
                                    label="Add justify-items: center"
                                    showTooltip="true"
                                    icon={<JustifyItemsCenter />}
                                    isPressed={style?.justifyItems === 'center'}
                                    onClick={() => onStyleChange(style, 'justifyItems', 'center')}
                                />
                                <Button
                                    label="Add justify-items: start"
                                    showTooltip="true"
                                    icon={<JustifyItemsStart />}
                                    isPressed={style?.justifyItems === 'start'}
                                    onClick={() => onStyleChange(style, 'justifyItems', 'start')}
                                />
                                <Button
                                    label="Add justify-items: end"
                                    showTooltip="true"
                                    icon={<JustifyItemsEnd />}
                                    isPressed={style?.justifyItems === 'end'}
                                    onClick={() => onStyleChange(style, 'justifyItems', 'end')}
                                />
                                <Button
                                    label="Add justify-items: stretch"
                                    showTooltip="true"
                                    icon={<JustifyItemsStretch />}
                                    isPressed={style?.justifyItems === 'stretch'}
                                    onClick={() => onStyleChange(style, 'justifyItems', 'stretch')}
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
