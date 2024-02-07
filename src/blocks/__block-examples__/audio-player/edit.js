import { __ } from "@wordpress/i18n";
import { useBlockProps } from "@wordpress/block-editor";
import ServerSideRender from '@wordpress/server-side-render';
import './editor.css';

const Edit = (props) => {
	const blockProps = useBlockProps();

	return (
		<div className="audio-player__editor-wrapper">
			<p className="audio-player__editor-text">{__('This is an accessible audio player with playlist feature. Your audio playlist will be rendered on the front-end.', 'kotisivu-block-theme')}</p>
		</div>
	);
};

export default Edit;