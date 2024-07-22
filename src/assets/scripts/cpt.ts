/**
 * This script handles the image uploader for custom post types.
 *
 * @package kotisivu-block-theme
 * @since 1.0.0
 *
 * TODO: Refactor this to more modern React component using WP API if possible. Needs to be investigated.
 *
 */

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
declare const wp: any;

const ImageUploaderElements = {
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

type ImageUploaderElements = typeof ImageUploaderElements;

const isHiddenSelector = 'hide-image-uploader' as const;

/**
 * Handle the image uploader
 */
document.addEventListener('DOMContentLoaded', () => {
	/**
	 * Check if elements exist on the page (in other words, if the page has the image uploader)
	 */
	const elementsExist = Object.values(ImageUploaderElements).every(
		(element) => element != null
	);

	if (!elementsExist) {
		return;
	}

	/**
	 * Handle Select Image
	 */
	ImageUploaderElements.uploadImage.addEventListener('click', (e) => {
		handleSelectImage(ImageUploaderElements, e, isHiddenSelector);
	});

	/**
	 * Handle Remove Image
	 */
	ImageUploaderElements.removeImage.addEventListener('click', (e) => {
		handleRemoveImage(ImageUploaderElements, e, isHiddenSelector);
	});
});

/**
 * Handle select image
 * @param {ImageUploaderElements} elements Image uploader elements
 * @param {MouseEvent} e Current click event
 * @return {void}
 */
function handleSelectImage(
	elements: ImageUploaderElements,
	e: MouseEvent,
	isHiddenSelector: string
): void {
	e.preventDefault();
	try {
		var frame: any;

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
			elements.imageInput.value = attachment.id;

			/* Show image preview */
			elements.imagePreview.setAttribute(
				'src',
				attachment.attributes.url
			);
			elements.imagePreview.classList.remove(isHiddenSelector);

			/* Show "Remove" button */
			elements.removeImage.classList.remove(isHiddenSelector);

			/* Hide "Choose" button */
			elements.uploadImage.classList.add(isHiddenSelector);
		});

		frame.open();
	} catch (error) {
		console.error(error);
	}
}

/**
 * Handle remove image
 * @param {ImageUploaderElements} elements Image uploader elements
 * @param {MouseEvent} e Current click event
 * @return {void}
 */
function handleRemoveImage(
	elements: ImageUploaderElements,
	e: MouseEvent,
	isHiddenSelector: string
): void {
	e.preventDefault();

	/* Remove ID from the input field */
	elements.imageInput.value = '';

	/* Hide the preview image */
	elements.imagePreview.setAttribute('src', '');
	elements.imagePreview.classList.add(isHiddenSelector);

	/* Show "Choose" button */
	elements.uploadImage.classList.remove(isHiddenSelector);

	/* Hide "Remove" button */
	elements.removeImage.classList.add(isHiddenSelector);
}
