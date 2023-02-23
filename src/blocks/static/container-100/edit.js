import { __ } from "@wordpress/i18n";
import { useBlockProps } from '@wordpress/block-editor';
import { cleanSpaces } from "@utilities/modifiers";
import { InnerBlocksAppender } from "@common-components/inspector";
import { ContainerWrapper } from '@common-components/wrapper';
import Inspector from './components/Inspector';

import './editor.css';

const Edit = (props) => {
	const {
		attributes,
		attributes: {
			sectionName,
			template,
			templateLock,
			allowedBlocks,
			modifiers,
			backgroundColor
		},
		clientId,
	} = props;

	const blockProps = useBlockProps({
		className: cleanSpaces(`${sectionName} ${modifiers}`).toLowerCase(),
		style: {
			backgroundColor: backgroundColor
		}
	});

	const innerBlocksProps = InnerBlocksAppender({
		clientId: clientId,
		template: template,
		templateLock: templateLock,
		allowedBlocks: allowedBlocks,
		blockProps: blockProps
	});

	return (
		<>
			<Inspector {...props} />
			<ContainerWrapper 
				children={innerBlocksProps.children} 
				attributes={attributes} 
				classes={innerBlocksProps.className} 
				styles={innerBlocksProps.style}
			/>
		</>
	);
};

export default Edit;