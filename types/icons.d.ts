declare module '@icons' {
	import { ComponentType } from 'react';

	type SvgIcon = {
		className?: string;
		fill?: string;
	};

	export type { SvgIcon };

	const AlignContentCenter: ComponentType<SvgIcon>;
	const AlignContentSpaceAround: ComponentType<SvgIcon>;
	const AlignContentSpaceBetween: ComponentType<SvgIcon>;
	const AlignContentSpaceEvenly: ComponentType<SvgIcon>;
	const AlignContentStretch: ComponentType<SvgIcon>;
	const AlignItemsBaseline: ComponentType<SvgIcon>;
	const AlignItemsCenter: ComponentType<SvgIcon>;
	const AlignItemsEnd: ComponentType<SvgIcon>;
	const AlignItemsStart: ComponentType<SvgIcon>;
	const AlignItemsStretch: ComponentType<SvgIcon>;
	const JustifyContentCenter: ComponentType<SvgIcon>;
	const JustifyContentEnd: ComponentType<SvgIcon>;
	const JustifyContentSpaceAround: ComponentType<SvgIcon>;
	const JustifyContentSpaceBetween: ComponentType<SvgIcon>;
	const JustifyContentSpaceEvenly: ComponentType<SvgIcon>;
	const JustifyContentStart: ComponentType<SvgIcon>;
	const JustifyItemsCenter: ComponentType<SvgIcon>;
	const JustifyItemsEnd: ComponentType<SvgIcon>;
	const JustifyItemsStart: ComponentType<SvgIcon>;
	const JustifyItemsStretch: ComponentType<SvgIcon>;

	const WidthContent: ComponentType<SvgIcon>;
	const WidthFull: ComponentType<SvgIcon>;
	const WidthNarrow: ComponentType<SvgIcon>;

	export {
		AlignContentCenter,
		AlignContentSpaceAround,
		AlignContentSpaceBetween,
		AlignContentSpaceEvenly,
		AlignContentStretch,
		AlignItemsBaseline,
		AlignItemsCenter,
		AlignItemsEnd,
		AlignItemsStart,
		AlignItemsStretch,
		JustifyContentCenter,
		JustifyContentEnd,
		JustifyContentSpaceAround,
		JustifyContentSpaceBetween,
		JustifyContentSpaceEvenly,
		JustifyContentStart,
		JustifyItemsCenter,
		JustifyItemsEnd,
		JustifyItemsStart,
		JustifyItemsStretch,
		WidthContent,
		WidthFull,
		WidthNarrow,
	};
}
