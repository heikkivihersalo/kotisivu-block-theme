import { __ } from "@wordpress/i18n";
import {
    SelectControl
} from "@wordpress/components";


const HTMLContainerControls = (props) => {
    const {
        attributes: {
            htmlContainer
        },
        setAttributes
    } = props;

    return (
        <>
            <SelectControl
                    label={__('Container Semantics', 'kotisivu-block-theme')}
                    value={htmlContainer}
                    onChange={(content) => { setAttributes({ htmlContainer: content }) }}
                    options={[
                        { value: null, label: 'Select element', disabled: true },
                        { value: 'div', label: 'div' },
                        { value: 'section', label: 'section' },
                        { value: 'article', label: 'article' },
                        { value: 'aside', label: 'aside' },
                        { value: 'main', label: 'main' },
                    ]}
            />
        </>
    )
}

export { HTMLContainerControls }
