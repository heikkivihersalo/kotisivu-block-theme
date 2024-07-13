declare module '@components/inspector' {
	import { ComponentType } from 'react';

	/**
	 * Set types for component props
	 */
	type AriaLabelControlsProps = {
		attributes: Record<string, any>;
		setAttributes: (newAttributes: Record<string, any>) => void;
	};

	type BackgroundColorControlsProps = {
		style: Record<string, any>;
		setAttributes: (newAttributes: Record<string, any>) => void;
	};

	type BackgroundImageControlsProps = {
		attributes: Record<string, any>;
		setAttributes: (newAttributes: Record<string, any>) => void;
	};

	type GapControlsProps = {
		attributes: Record<string, any>;
		setAttributes: (newAttributes: Record<string, any>) => void;
	};

	type GridAlignControlsProps = {
		attributes: Record<string, any>;
		setAttributes: (newAttributes: Record<string, any>) => void;
	};

	type WidthControlsProps = {
		style: Record<string, any>;
		setAttributes: (newAttributes: Record<string, any>) => void;
	};

	export type {
		AriaLabelControlsProps,
		BackgroundColorControlsProps,
		BackgroundImageControlsProps,
		GapControlsProps,
		GridAlignControlsProps,
		WidthControlsProps,
	};

	/**
	 * Set types for component
	 */
	const AriaLabelControls: ComponentType<AriaLabelControlsProps>;
	const BackgroundColorControls: ComponentType<BackgroundColorControlsProps>;
	const BackgroundImageControls: ComponentType<BackgroundImageControlsProps>;
	const GapControls: ComponentType<GapControlsProps>;
	const GridAlignControls: ComponentType<GridAlignControlsProps>;
	const WidthControls: ComponentType<WidthControlsProps>;

	export {
		AriaLabelControls,
		BackgroundColorControls,
		BackgroundImageControls,
		GapControls,
		GridAlignControls,
		WidthControls,
	};
}
