import { TemplateArray } from '@wordpress/blocks';

type BlockVariation = {
	name: string;
	title: string;
	icon: string | object;
	scope: string;
	innerBlocks: TemplateArray | undefined;
	attributes: {
		blockClass: string;
		childTemplate?: TemplateArray | undefined;
		style?: Record<string, any>;
		templateLock?: 'all';
		width?:
			| 'var(--wp--custom--content-size)'
			| 'var(--wp--custom--wide-size)';
	};
};

type BlockStyleVariation = {
	name: string;
	label: string;
	isDefault: boolean;
};
