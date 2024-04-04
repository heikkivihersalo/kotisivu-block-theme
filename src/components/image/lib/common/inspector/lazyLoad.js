/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
    PanelRow,
    ToggleControl
} from "@wordpress/components";

/**
 * Lazy load control component
 * @param {Object} props Component properties
 * @return {JSX.Element} Lazy load control component
 */
const Lazyload = (props) => {
    const {
        attributes: {
            lazyLoad
        },
        setAttributes
    } = props;

    return (
        <>
            <PanelRow className="image-block-buttons__lazy-load">
                <ToggleControl
                    label={__("Lazy Load", "kotisivu-theme-blocks")}
                    checked={lazyLoad}
                    onChange={() => setAttributes({ lazyLoad: !lazyLoad })}
                />
            </PanelRow>
        </>
    )
}

export default Lazyload
