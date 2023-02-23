import { __ } from "@wordpress/i18n";
import { useBlockProps } from "@wordpress/block-editor";
import { ImageSelector } from '@common-components/image';

import './editor.css';

const Edit = (props) => {
	const blockProps = useBlockProps();
	return (
		<div {...blockProps}>
			<ImageSelector {...props} srcset />
		</div>
	);
};

export default Edit;
