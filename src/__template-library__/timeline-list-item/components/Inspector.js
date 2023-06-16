import { __ } from "@wordpress/i18n";
import { InspectorControls } from "@wordpress/block-editor";
import { PanelBody, SelectControl } from "@wordpress/components";

const Inspector = (props) => {
    const {
        attributes: {
            timelineStatus
        },
        setAttributes
    } = props;

    return (
        <InspectorControls>
            <PanelBody title={__("Settings", "kotisivu-block-theme")} initialOpen={true}>
                <SelectControl
                    label={__('Timeline Status', 'kotisivu-block-theme')}
                    value={timelineStatus}
                    onChange={(content) => { setAttributes({ timelineStatus: content }) }}
                    options={[
                        { value: 'not-set', label: __('Not Set', 'kotisivu-block-theme')},
                        { value: 'coming', label: __('Coming', 'kotisivu-block-theme') },
                        { value: 'in-progress', label: __('In Progress', 'kotisivu-block-theme') },
                        { value: 'ready', label: __('Ready', 'kotisivu-block-theme') },
                    ]}
                />
            </PanelBody>
        </InspectorControls>
    )
}

export default Inspector
