declare module '@utils' {
	interface BlockStyles {
		background?: string | undefined;
		marginTop?: string | undefined;
		marginBottom?: string | undefined;
		paddingTop?: string | undefined;
		paddingBottom?: string | undefined;
		paddingLeft?: string | undefined;
		paddingRight?: string | undefined;
		width?: string | undefined;
		height?: string | undefined;
		display?: string | undefined;
		justifyItems?: string | undefined;
		alignItems?: string | undefined;
		alignContent?: string | undefined;
		gap?: string | undefined;
	}

	interface StyleAttributes {
		backgroundColor?: string;
		spacing?: {
			margin?: {
				top?: string;
				bottom?: string;
			};
			padding?: {
				top?: string;
				bottom?: string;
				left?: string;
				right?: string;
			};
		};
		width?: string;
		height?: string;
		justifyContent?: string;
		justifyItems?: string;
		alignItems?: string;
		alignContent?: string;
		gap?: string;
	}

	export { BlockStyles, StyleAttributes };

	const addModifiers: (
		setAttributes: Function,
		attributeKey: string,
		attributeValue: boolean,
		modifier: string,
		elementName: string,
		elementVal: string
	) => void;

	const getBlockStyles: (style: StyleAttributes) => BlockStyles;

	const getImageAlignmentClass: (align: string) => string | null;

	const getImageSizeClass: (sizeSlug: string) => string;

	const getIsReversedClass: (isReversed: boolean) => string;

	export {
		addModifiers,
		getBlockStyles,
		getImageAlignmentClass,
		getImageSizeClass,
		getIsReversedClass,
	};
}
