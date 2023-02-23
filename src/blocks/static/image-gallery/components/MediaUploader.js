import { __ } from "@wordpress/i18n";
import {
    MediaUpload,
    MediaUploadCheck
} from "@wordpress/block-editor";

import { Button } from '@wordpress/components';

const ALLOWED_MEDIA_TYPES = ['image'];

const MediaUploader = ({ mediaIDs, props }) => {
    const onSelect = (images) => {
        props.setAttributes({
            images: images.map(image => {
                return {
                    mediaID: image.id,
                    mediaURL: image.url,
                    mediaALT: image.alt,
                    mediaMime: image.mime,
                    mediaWidth: `${image.sizes.full.width}px`,
                    mediaHeight:`${image.sizes.full.height}px`,
                    lazyLoad: "lazy"
                };
            }),
        });
    };

    return (
        <MediaUploadCheck>
            <MediaUpload
                onSelect={onSelect}
                allowedTypes={ALLOWED_MEDIA_TYPES}
                value={mediaIDs}
                render={({ open }) => (
                    <Button
                        onClick={open}
                        className="button button-large"
                    >{mediaIDs.length < 1 ? 'Upload/Select Images' : 'Edit'}</Button>
                )}
                gallery
                multiple
            />
        </MediaUploadCheck>
    );
}

export default MediaUploader