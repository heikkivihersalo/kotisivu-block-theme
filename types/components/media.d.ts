declare module '@components/media' {
	import { ComponentType } from 'react';

	/**
	 * Set types for video and image attributes
	 */
	type BlockJSON_MediaAttributes = {
		mediaId: number;
		mediaUrl: string;
		mediaAlt?: string;
		mediaMime?: string;
		mediaWidth: number | undefined;
		mediaHeight: number | undefined;
	};

	type BlockJSON_ImageAttributes = BlockJSON_MediaAttributes & {
		mediaSrcSet?: string;
		mediaSrcSizes?: string;
		lazyLoad?: boolean;
	};

	type BlockJSON_VideoAttributes = BlockJSON_MediaAttributes;

	type MediaUploader_Image = {
		id: number;
		url: string;
		alt: string;
		mime: string;
		type: string;
		subtype: string;
		caption: string;
		link: string;
		sizes: {
			[key in string]: MediaUploader_ImageSize;
		};
	};

	type MediaUploader_ImageSize = {
		width: number;
		height: number;
		url: string;
		orientation: string;
	};

	export type { BlockJSON_ImageAttributes, BlockJSON_VideoAttributes, MediaUploader_Image };

	/**
	 * Set types for components
	 */
	const ImageMarkup: ComponentType<{
		attributes: BlockJSON_ImageAttributes;
		img?: boolean;
		srcset?: boolean;
	}>;

	const ImageControls: ComponentType<{
		attributes: BlockJSON_ImageAttributes;
		setAttributes: (attributes: BlockJSON_ImageAttributes) => void;
	}>;

	const VideoMarkup: ComponentType<{
		attributes: Omit<BlockJSON_VideoAttributes, 'mediaId' | 'mediaAlt'>;
		blockProps?: Record<string, any>;
	}>;

	const VideoControls: ComponentType<{
		attributes: BlockJSON_VideoAttributes;
		setAttributes: (attributes: BlockJSON_VideoAttributes) => void;
	}>;

	export { ImageMarkup, ImageControls, VideoMarkup, VideoControls };
}
