import { __ } from "@wordpress/i18n";
import { InnerBlocks, useBlockProps } from "@wordpress/block-editor";
import { cleanSpaces } from "@utilities/modifiers";
import { ContainerWrapper } from "@common-components/wrapper/index";

const Save = (props) => {
	const {
		children,
		attributes,
		attributes: {
			sectionName,
			modifiers,
			backgroundColor
		}
	} = props;

	const blockProps = useBlockProps.save({
		className: cleanSpaces(`container-50-50 ${sectionName} ${modifiers}`).toLowerCase(),
		style: {
			backgroundColor: backgroundColor
		}
	})

	return (
		<>
			<ContainerWrapper children={children} attributes={attributes} classes={blockProps.className} styles={blockProps.style}>
				<InnerBlocks.Content {...blockProps} />
			</ContainerWrapper>
		</>
	);
};

export default Save;
