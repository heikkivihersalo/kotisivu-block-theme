declare module '@components/variations' {
	import { ComponentType } from 'react';

	/**
	 * Set types for component props
	 */
	type VariationPickerProps = {
		blockName: string;
		setAttributes: (newAttributes: Record<string, any>) => void;
	};

	type Variation = {
		name: string;
		title: string;
		icon: string | object;
		scope: string;
		innerBlocks: Array<Array<string | Record<string, any>>>;
		attributes: {
			blockClass: string;
			childTemplate?: Array<string | Record<string, any>>;
			style?: Record<string, any>;
			templateLock?: 'all';
			width?:
				| 'var(--wp--custom--content-size)'
				| 'var(--wp--custom--wide-size)';
		};
	};

	export type { VariationPickerProps, Variation };

	/**
	 * Set types for component
	 */
	const VariationPicker: ComponentType<VariationPickerProps>;

	export { VariationPicker };
}
