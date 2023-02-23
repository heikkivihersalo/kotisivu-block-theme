import { __ } from "@wordpress/i18n";
import {
    TextControl
} from "@wordpress/components";


const SectionNameControls = (props) => {
    const {
        attributes: {
            sectionId,
            sectionName,
        },
        setAttributes
    } = props;

    return (
        <>
            <TextControl
                label={__('Name', 'kotisivu-block-theme')}
                placeholder={__('Sets name to an element. Can be used to differentiate sections on a page (ex. with css ids and class selectors)', 'kotisivu-block-theme')}
                onChange={(content) => setAttributes({ sectionName: content })}
                value={sectionName}
            />
            <TextControl
                label={__('ID', 'kotisivu-block-theme')}
                placeholder={__('Sets ID value to an element. Can be used to differentiate sections on a page (ex. with css ids and class selectors)', 'kotisivu-block-theme')}
                onChange={(content) => setAttributes({ sectionId: content })}
                value={sectionId}
            />
        </>
    )
}

export { SectionNameControls }
