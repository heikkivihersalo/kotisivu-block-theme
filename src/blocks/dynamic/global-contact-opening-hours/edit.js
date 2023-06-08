import { __ } from "@wordpress/i18n";
import { useBlockProps } from "@wordpress/block-editor";
import ServerSideRender from '@wordpress/server-side-render';
import './editor.css';

const Edit = (props) => {
	const blockProps = useBlockProps();

	return (
		<div {...blockProps}>
			<ServerSideRender
				block="ksd/global-contact-opening-hours"
			/>
		</div>
	);
};

export default Edit;