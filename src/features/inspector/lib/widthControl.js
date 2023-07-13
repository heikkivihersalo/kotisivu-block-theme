import { __ } from "@wordpress/i18n";
import { PanelBody, PanelRow, ToggleControl } from '@wordpress/components';

/**
 * Controls the width of the section
 * TODO: Add new width options and change to button group in the future
 *
 * @param { object } { attributes, setAttributes }
 * @return { JSX.Element } WidthControl 
 */
const WidthControl = ({ attributes, setAttributes }) => {
    const {
        width
    } = attributes;

    const setFullWidth = (newWidth) => {
        if (width === newWidth) {
            setAttributes({
                width: 'none'
            });
            return;
        }

        setAttributes({
            width: newWidth
        });
    }

    return (
        <PanelBody title={__('Width Controls', 'kotisivu-block-theme')}>
            <PanelRow>
                <ToggleControl
                    label={__('Set to full width', 'kotisivu-block-theme')}
                    checked={width === 'full'}
                    onChange={() => setFullWidth('full')}
                />
            </PanelRow>
        </PanelBody>
    )
}

export { WidthControl }
