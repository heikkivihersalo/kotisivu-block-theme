/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
    PanelBody,
    RangeControl
} from "@wordpress/components";

/**
 * Internal dependencies
 */
const marks = [
    {
        value: 1,
        label: '20',
    },
    {
        value: 2,
        label: '30',
    },
    {
        value: 3,
        label: '40',
    },
    {
        value: 4,
        label: '50',
    },
    {
        value: 5,
        label: '60',
    },
    {
        value: 6,
        label: '70',
    },
    {
        value: 7,
        label: '80',
    },
    {
        value: 8,
        label: '90',
    },
];

/**
 * Convert value to WordPress variable
 * @param {string} val Spacing value
 * @return {string} WordPress spacing variable formatted string
 */
function convertValueToVariable(val) {
    if (!val) return undefined;
    return 'var(--wp--preset--spacing--' + marks.find(mark => mark.value === val)?.label + ')';
}

/**
 * Convert variable to value
 * @param {string} variable WordPress spacing variable formatted string
 * @return {string} Spacing value
 */
function convertVariableToValue(variable) {
    if (!variable) return undefined;
    return marks.find(mark => mark.label === parseInt(variable.split("--")[4]).toString())?.value;
}

/**
 * Controllers for gap
 *
 * @param {Object} props Block props
 * @param {Object} props.attributes Gutenberg block attributes
 * @param {Function} props.setAttributes Gutenberg setAttributes function
 * @return {JSX.Element} InspectorControl Element
 */
const GapControls = ({ attributes, setAttributes }) => {
    /**
     * Change block alignment attribute value to new one
     * @param  {Object} currentStyles block current styles
     * @param  {string} key style key to change (e.g. 'gap')
     * @param  {string} newValue new value to set
     * @return {void} 
     */
    const onStyleChange = (currentStyles, key, newValue) => {
        newValue = convertValueToVariable(newValue);
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
            <PanelBody title={__('Gap Controls', 'kotisivu-block-theme')}>
                <div className="editor-gap-controls">
                    <RangeControl
                        allowReset
                        withInputField={false}
                        label={__('Gap', 'kotisivu-block-theme')}
                        value={convertVariableToValue(attributes.style?.gap)}
                        marks={marks}
                        onChange={(newValue) => onStyleChange(attributes.style, 'gap', newValue)}
                        min={1}
                        max={8}
                    />
                </div>
            </PanelBody>
        </>
    )
}

export { GapControls }
