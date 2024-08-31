/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';
import { createBlock } from '@wordpress/blocks';

declare const wp: any;

const { insertBlock } = wp.data.dispatch('core/editor');

/**
 * Internal dependencies
 */
import styles from './ImagePreviewItem.module.css';

type Attachment = {
	id: number;
	url: string;
};

type Props = {
	src: string;
};

/**
 * Image preview item component
 * @param {Object} props Component props
 * @param {string} props.src Image source
 * @return {JSX.Element} Image preview item
 */
const ImagePreviewItem = ({ src }: Props): JSX.Element | null => {
	if (!src) {
		return null;
	}

	const handleSave = async () => {
		const response = await apiFetch({
			method: 'POST',
			path: 'kotisivu-block-theme/v1/ai/image/save',
			data: {
				base64: src,
				title: 'AI generated image',
			},
		});

		const { id: imageId, url: imageUrl } = response as Attachment;

		// Add the block to the editor
		insertBlock(createBlock('core/image', { id: imageId, url: imageUrl }));
	};

	return (
		<div className={styles.container}>
			<img
				className={styles.image}
				src={src}
				alt={__('Image preview', 'kotisivu-block-theme')}
			/>
			<div className={styles.buttons}>
				<button
					type="button"
					className={`${styles.buttonPrimary} components-button is-primary`}
					onClick={() => {
						handleSave();
					}}
				>
					{__('Use', 'kotisivu-block-theme')}
				</button>
				<button
					type="button"
					className={`${styles.buttonSecondary} components-button is-destructive`}
				>
					{__('Discard', 'kotisivu-block-theme')}
				</button>
			</div>
		</div>
	);
};

export default ImagePreviewItem;
