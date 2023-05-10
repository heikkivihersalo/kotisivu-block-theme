import { __ } from "@wordpress/i18n";
import {
    SelectControl,
    TextControl
} from "@wordpress/components";


const ContainerControls = (props) => {
    const {
        attributes: {
            id,
            name,
            container
        },
        setAttributes
    } = props;

    return (
        <>
            <SelectControl
                label={__('Container Tag', 'kotisivu-block-theme')}
                value={container}
                onChange={container => { setAttributes({ container }) }}
                options={[
                    { value: null, label: 'Select element', disabled: true },
                    { value: 'div', label: 'div' },
                    { value: 'section', label: 'section' },
                    { value: 'article', label: 'article' },
                    { value: 'aside', label: 'aside' },
                    { value: 'main', label: 'main' },
                ]}
            />
            <TextControl
                label={__('ID', 'kotisivu-block-theme')}
                placeholder={__('Sets ID attribute to an element', 'kotisivu-block-theme')}
                onChange={id => setAttributes({ id })}
                value={id}
            />
            <TextControl
                label={__('Name', 'kotisivu-block-theme')}
                placeholder={__('Sets name to an element', 'kotisivu-block-theme')}
                onChange={name => setAttributes({ name })}
                value={name}
            />
        </>
    )
}

export { ContainerControls }
