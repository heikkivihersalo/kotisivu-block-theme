type MediaAttributes = {
	mediaId: number;
	mediaUrl: string;
	mediaAlt?: string;
	mediaMime?: string;
	mediaWidth: number | undefined;
	mediaHeight: number | undefined;
};

type MediaUploader_ImageSize = {
	width: number;
	height: number;
	url: string;
	orientation: string;
};

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

type BlockJSON_Image = MediaAttributes & {
	mediaSrcSet?: string;
	mediaSrcSizes?: string;
	lazyLoad?: boolean;
};

type BlockJSON_Video = MediaAttributes;
