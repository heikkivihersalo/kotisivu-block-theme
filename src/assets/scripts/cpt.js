/**
 * Image Uploader for Custom Post Type
 * TODO: Refactor this to more modern React component using WP API
 */
document.addEventListener('DOMContentLoaded', () => {
    const UPLOAD_IMAGE_BUTTON_CHOOSE = document.querySelector('.image-uploader__button--choose');
    const UPLOAD_IMAGE_INPUT = document.querySelector('.image-uploader__input-field');
    const UPLOAD_IMAGE_BUTTON_REMOVE = document.querySelector('.image-uploader__button--remove');
    const UPLOAD_IMAGE_PREVIEW = document.querySelector('.image-uploader__preview');

    /**
     * Save Image
     */
    UPLOAD_IMAGE_BUTTON_CHOOSE.addEventListener('click', (e) => {
        e.preventDefault();
        let frame; // eslint-disable-line prefer-const

        if (frame) {
            frame.open();
            return;
        }

        frame = wp.media.frames.customBackground = wp.media({
            title: 'Choose Image',
            library: {
                type: 'image'
            },
            button: {
                text: 'Choose Image'
            },
            multiple: false
        });

        frame.on('select', () => {
            const attachment = frame.state().get('selection').first();

            // Place ID to the input field
            UPLOAD_IMAGE_INPUT.value = attachment.id;

            // Show image preview
            UPLOAD_IMAGE_PREVIEW.setAttribute("src", attachment.attributes.url);
            UPLOAD_IMAGE_PREVIEW.classList.remove('is-visually-hidden--no-tag');

            // Show "Remove" button
            UPLOAD_IMAGE_BUTTON_REMOVE.classList.remove('is-visually-hidden--no-tag');

            // Hide "Choose" button
            UPLOAD_IMAGE_BUTTON_CHOOSE.classList.add('is-visually-hidden--no-tag');
        });

        frame.open();
    });

    /**
     * Remove Image
     */
    UPLOAD_IMAGE_BUTTON_REMOVE.addEventListener('click', (e) => {
        e.preventDefault();

        // Remove ID from the input field
        UPLOAD_IMAGE_INPUT.value = '';

        // Hide the preview image
        UPLOAD_IMAGE_PREVIEW.setAttribute("src", "");
        UPLOAD_IMAGE_PREVIEW.classList.add('is-visually-hidden--no-tag');

        // Show "Choose" button
        UPLOAD_IMAGE_BUTTON_CHOOSE.classList.remove('is-visually-hidden--no-tag');

        // Hide "Remove" button
        UPLOAD_IMAGE_BUTTON_REMOVE.classList.add('is-visually-hidden--no-tag');
    });
});