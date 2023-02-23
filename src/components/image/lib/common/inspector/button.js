import { __ } from "@wordpress/i18n";
import {
    MediaUpload,
    MediaUploadCheck
} from "@wordpress/block-editor";
import { getImage, setImage } from '../../utilities/index';

const Button = (props) => {
    const {
        attributes: {
            mediaId
        },
    } = props;

    return (
        <>
            <MediaUploadCheck>
                <MediaUpload
                    onSelect={(media) => setImage(media, props)}
                    allowedTypes="image"
                    value={mediaId}
                    render={({ open }) => getImage(props, open)}
                />
            </MediaUploadCheck>
        </>
    )
}

export default Button
