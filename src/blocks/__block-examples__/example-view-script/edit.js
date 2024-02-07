import { __ } from "@wordpress/i18n";
import './editor.css';

const Edit = (props) => {
	return (
		<div className="example-view-script-block">
			<p className="placeholder-editor-text">{__('This is placeholder text for view script block. This will be rendered in the editor and basically be anything.', 'kotisivu-block-theme')}</p>
		</div>
	);
};

export default Edit;