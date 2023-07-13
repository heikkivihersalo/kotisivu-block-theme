import { __ } from "@wordpress/i18n";
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { convertVerticalBarSyntaxToCSS } from '@utils/modifiers';

const Save = (props) => {
	const {
		attributes: {
			wrapperClass,
			style,
			width
		}
	} = props;

	const innerBlocksProps = useInnerBlocksProps.save(useBlockProps.save({
		className: wrapperClass,
		style: {
			background: style.backgroundColor ? style.backgroundColor : undefined,
			marginTop: style?.spacing?.margin?.top ? convertVerticalBarSyntaxToCSS(style.spacing.margin.top) : undefined,
			marginBottom: style?.spacing?.margin?.bottom ? convertVerticalBarSyntaxToCSS(style.spacing.margin.bottom) : undefined,
			paddingTop: style?.spacing?.padding?.top ? convertVerticalBarSyntaxToCSS(style.spacing.padding.top) : undefined,
			paddingBottom: style?.spacing?.padding?.bottom ? convertVerticalBarSyntaxToCSS(style.spacing.padding.bottom) : undefined,
			paddingLeft: style?.spacing?.padding?.left ? convertVerticalBarSyntaxToCSS(style.spacing.padding.left) : undefined,
			paddingRight: style?.spacing?.padding?.right ? convertVerticalBarSyntaxToCSS(style.spacing.padding.right) : undefined,
			width: width === 'full' ? "var(--wp--style--global--wide-size)" : "var(--wp--style--global--content-size)"
		}
	}));

	return (
		<div {...innerBlocksProps} />
	)

};

export default Save;
