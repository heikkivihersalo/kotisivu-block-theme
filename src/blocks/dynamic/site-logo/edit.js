import { __ } from "@wordpress/i18n";
import { useBlockProps } from "@wordpress/block-editor";
import ServerSideRender from '@wordpress/server-side-render';
import Inspector from "./components/Inspector";
import './editor.css';

const Edit = (props) => {
	const blockProps = useBlockProps({
		className: "site-logo-editor-wrapper"
	});

	return (
		<div {...blockProps}>
			<Inspector {...props} />
			<ServerSideRender
				block="ksd/site-logo"
				attributes={props.attributes}
				className={props.className}
			/>
		</div>
	);
};

export default Edit;