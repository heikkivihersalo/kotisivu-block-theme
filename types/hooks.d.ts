declare module '@hooks' {
	import { ComponentType } from 'react';
	import { TemplateArray } from '@wordpress/blocks';

	type BlockVariation = {
		name: string;
		innerBlocks: TemplateArray | undefined;
		attributes: {
			childTemplate: TemplateArray | undefined;
			blockClass: string;
			style: Record<string, string>;
		};
	};

	interface BlockAttributes {
		variationName: string;
		template: TemplateArray | undefined;
		childTemplate: TemplateArray | undefined;
		blockClass: string;
		style: Record<string, string>;
	}

	export type { BlockVariation };

	const useBlockVariations: (blockName: string) => BlockVariation[];

	export { useBlockVariations, BlockAttributes };
}
