declare module '@components/media' {
	import { ComponentType } from 'react';

	/**
	 * Set types for video and image attributes
	 */
	type MediaAttributes = {
		mediaId: number;
		mediaUrl: string;
		mediaAlt: string;
		mediaMime?: string;
		mediaWidth: number | undefined;
		mediaHeight: number | undefined;
	};

	type ImageAttributes = MediaAttributes & {
		mediaSrcSet?: string;
		mediaSrcSizes?: string;
		lazyLoad?: boolean;
	};

	type VideoAttributes = MediaAttributes & {
		mediaThumbnail: string;
	};

	export type { ImageAttributes, VideoAttributes };

	/**
	 * Set types for components
	 */
	const ImageMarkup: ComponentType<{
		attributes: ImageAttributes;
		img?: boolean;
		srcset?: boolean;
	}>;

	const ImageControls: ComponentType<{
		attributes: ImageAttributes;
		setAttributes: (attributes: ImageAttributes) => void;
	}>;

	const VideoMarkup: ComponentType<{
		attributes: Omit<VideoAttributes, 'mediaId'>;
	}>;

	const VideoControls: ComponentType<{
		attributes: VideoAttributes;
		setAttributes: (attributes: VideoAttributes) => void;
	}>;

	export { ImageMarkup, ImageControls, VideoMarkup, VideoControls };
}
