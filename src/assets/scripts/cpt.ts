/**
 * This script handles the image uploader for custom post types.
 * TODO: Refactor this to more modern React component using WP API if possible. Needs to be investigated.
 */

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
declare const wp: any;

const imageUploaderElements = {
	uploadImage: document.querySelector(
		'.image-uploader__button--choose'
	) as HTMLButtonElement,
	imageInput: document.querySelector(
		'.image-uploader__input'
	) as HTMLInputElement,
	removeImage: document.querySelector(
		'.image-uploader__button--remove'
	) as HTMLButtonElement,
	imagePreview: document.querySelector(
		'.image-uploader__preview'
	) as HTMLImageElement,
} as const;

type ImageUploaderElements = typeof imageUploaderElements;

const isHiddenSelector = 'hide-image-uploader' as const;

/**
 * Handle the image uploader
 */
document.addEventListener('DOMContentLoaded', () => {
	/**
	 * Check if elements exist on the page (in other words, if the page has the image uploader)
	 */
	const elementsExist = Object.values(imageUploaderElements).every(
		(element) => element !== null
	);

	if (!elementsExist) {
		return;
	}

	/**
	 * Handle Select Image
	 */
	imageUploaderElements.uploadImage.addEventListener('click', (e) => {
		handleSelectImage(e);
	});

	/**
	 * Handle Remove Image
	 */
	imageUploaderElements.removeImage.addEventListener('click', (e) => {
		handleRemoveImage(e);
	});
});

/**
 * Handle select image
 * @param {MouseEvent} e Current click event
 * @return {void}
 */
function handleSelectImage(e: MouseEvent): void {
	e.preventDefault();
	try {
		let frame: any; // eslint-disable-line

		if (frame) {
			frame.open();
			return;
		}

		frame = wp.media({
			title: __('Select or Upload Media', 'kotisivu-block-theme'),
			button: {
				text: __('Use this media', 'kotisivu-block-theme'),
			},
			multiple: false,
		});

		frame.on('select', () => {
			const attachment = frame.state().get('selection').first();

			/* Place ID to the input field */
			imageUploaderElements.imageInput.value = attachment.id;

			/* Show image preview */
			imageUploaderElements.imagePreview.setAttribute(
				'src',
				attachment.attributes.url
			);
			imageUploaderElements.imagePreview.classList.remove(
				isHiddenSelector
			);

			/* Show "Remove" button */
			imageUploaderElements.removeImage.classList.remove(
				isHiddenSelector
			);

			/* Hide "Choose" button */
			imageUploaderElements.uploadImage.classList.add(isHiddenSelector);
		});

		frame.open();
	} catch (error) {
		console.error(error);
	}
}

/**
 * Handle remove image
 * @param {MouseEvent} e Current click event
 * @return {void}
 */
function handleRemoveImage(e: MouseEvent): void {
	e.preventDefault();

	/* Remove ID from the input field */
	imageUploaderElements.imageInput.value = '';

	/* Hide the preview image */
	imageUploaderElements.imagePreview.setAttribute('src', '');
	imageUploaderElements.imagePreview.classList.add(isHiddenSelector);

	/* Show "Choose" button */
	imageUploaderElements.uploadImage.classList.remove(isHiddenSelector);

	/* Hide "Remove" button */
	imageUploaderElements.removeImage.classList.add(isHiddenSelector);
}
