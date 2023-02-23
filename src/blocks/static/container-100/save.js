import { __ } from "@wordpress/i18n";
import { useInnerBlocksProps, useBlockProps } from '@wordpress/block-editor';
import { cleanSpaces } from "@utils/modifiers";
import { ContainerWrapper } from '@features/wrapper';

const Save = (props) => {
	const {
		attributes,
		attributes: {
			sectionName,
			modifiers,
			backgroundColor
		}
	} = props;

	const blockProps = useBlockProps.save({
		className: cleanSpaces(`${sectionName} ${modifiers}`).toLowerCase(),
		style: {
			backgroundColor: backgroundColor
		}
	});

	const innerBlocksProps = useInnerBlocksProps.save(blockProps);

	return (
		<ContainerWrapper 
			children={innerBlocksProps.children} 
			attributes={attributes} 
			classes={innerBlocksProps.className} 
			styles={innerBlocksProps.style}
		/>
	)

};

export default Save;
