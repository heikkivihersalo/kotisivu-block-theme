import { __ } from "@wordpress/i18n";

import {
    InspectorControls,
} from "@wordpress/block-editor";

import {
    PanelBody,
    TextControl,
    ToggleControl,
    SelectControl
} from "@wordpress/components";

const Inspector = (props, icons) => {
    const {
        attributes: {
            unicode,
            url,
            title,
            isLink,
            isCustomIcon,
            isImage
        },
        setAttributes,
    } = props;

    const setIconCode = (content) => {
        if (content == 'custom-icon') {
            setAttributes({ isCustomIcon: true })
            return;
        }

        setAttributes({ isCustomIcon: false })
        setAttributes({ unicode: content })
    }



    return (
        <InspectorControls>
            <PanelBody title={__('Settings', 'kotisivu-block-theme')} initialOpen={true}>
                <SelectControl
                    label="Select icon"
                    value={icons.some(icon => icon.value === unicode) ? unicode : 'custom-icon'}
                    options={icons}
                    onChange={setIconCode}
                />
                {isCustomIcon &&
                    <TextControl
                        label={__('Unicode', 'kotisivu-block-theme')}
                        placeholder={__('For example fas fa-user', 'kotisivu-block-theme')}
                        onChange={(content) => setAttributes({ unicode: content })}
                        value={unicode}
                    />
                }
                <ToggleControl
                    label="Use custom image"
                    help={
                        isImage
                            ? 'Block is using image insted of icon.'
                            : 'Block is using icon insted of image'
                    }
                    checked={isImage}
                    onChange={() => setAttributes({ isImage: !isImage })}
                />
            </PanelBody>
            <PanelBody title={__('Link Settings', 'kotisivu-block-theme')} initialOpen={true}>
                <TextControl
                    label={__('URL', 'kotisivu-block-theme')}
                    onChange={(content) => setAttributes({ url: content })}
                    value={url}
                />
                <TextControl
                    label={__('Title', 'kotisivu-block-theme')}
                    onChange={(content) => setAttributes({ title: content })}
                    value={title}
                />
                <ToggleControl
                    label={__('Set icon as link', 'kotisivu-block-theme')}
                    checked={isLink}
                    onChange={() => setAttributes({ isLink: !isLink })}
                />
            </PanelBody>
        </InspectorControls>
    )
}

export default Inspector
