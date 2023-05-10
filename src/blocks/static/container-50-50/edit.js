import { __ } from "@wordpress/i18n";
import { InnerBlocks, useBlockProps } from "@wordpress/block-editor";
import Inspector from './components/Inspector';
import { cleanSpaces } from "@utils/modifiers";
import { ContainerWrapper } from "@features/wrapper/index";

import './editor.css';

const Edit = (props) => {
	const {
		children,
		attributes,
		attributes: {
			name,
			template,
			templateLock,
			modifiers,
			backgroundColor
		}
	} = props;

	const blockProps = useBlockProps({
		className: cleanSpaces(`${name} ${modifiers}`).toLowerCase(),
		style: {
			backgroundColor: backgroundColor
		}
	});

	return (
		<div {...blockProps}>
			<Inspector {...props} />
			<ContainerWrapper children={children} attributes={attributes} classes={blockProps.className} styles={blockProps.style}>
				<InnerBlocks
					allowedBlocks={["ksd/inner-column"]}
					template={template}
					templateLock={templateLock}
				/>
			</ContainerWrapper>
		</div>
	);
};

export default Edit;
