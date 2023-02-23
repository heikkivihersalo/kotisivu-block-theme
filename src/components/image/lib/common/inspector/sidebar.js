import { __ } from "@wordpress/i18n";
import {
    MediaUpload,
    MediaUploadCheck
} from "@wordpress/block-editor";

import {
    PanelRow,
    TextControl
} from "@wordpress/components";

import { setImage, getImage } from '../../utilities/index';

const Sidebar = (props) => {
    const {
        attributes: {
            mediaId
        },
    } = props;

    return (
        <div className="editor-post-featured-image">
            <MediaUploadCheck>
                <MediaUpload
                    onSelect={(media) => setImage(media, props)}
                    allowedTypes="image"
                    value={mediaId}
                    render={({ open }) => getImage(props, open)}
                />
            </MediaUploadCheck>
        </div>
    )
}

export default Sidebar
