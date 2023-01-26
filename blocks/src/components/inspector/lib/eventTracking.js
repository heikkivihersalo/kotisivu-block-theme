import { __ } from "@wordpress/i18n";
import {
    PanelBody,
    ToggleControl,
    TextControl
} from "@wordpress/components";


const EventTracking = (props) => {
    const {
        attributes: {
            hasTracking,
            trackingIdentifier,
        },
        setAttributes
    } = props;

    return (
        <>
            <PanelBody title={__('Analytics', 'kotisivu-block-theme')} initialOpen={true}>
                <ToggleControl
                    label={__('Track Events', 'kotisivu-block-theme')}
                    checked={hasTracking}
                    onChange={() => setAttributes({ hasTracking: !hasTracking })}
                />
                <TextControl
                    label={__('Identifier', 'kotisivu-block-theme')}
                    placeholder={__('ex. name for this button', 'kotisivu-block-theme')}
                    onChange={(content) => setAttributes({ trackingIdentifier: content })}
                    value={trackingIdentifier}
                />
            </PanelBody>
        </>
    )
}

export { EventTracking }
