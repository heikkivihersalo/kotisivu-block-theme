/**
 * WordPress dependencies
 */
import {
    MediaUpload,
    MediaUploadCheck
} from "@wordpress/block-editor";

/**
 * Internal dependencies
 */
import { setImage, getImage } from '../../utilities/index';

/**
 * Sidebar component for image block
 * @param {Object} props Component properties
 * @return {JSX.Element} Sidebar component
 */
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
