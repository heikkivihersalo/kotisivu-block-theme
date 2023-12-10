import { __ } from "@wordpress/i18n";
import { useBlockProps } from "@wordpress/block-editor";
import ServerSideRender from '@wordpress/server-side-render';
import './editor.css';

const Edit = (props) => {
	const blockProps = useBlockProps();

	return (
		<div className="reference-slider__editor-wrapper">
			<p className="reference-slider__editor-text">{__('This is an reference slider. Your references will be rendered on the front-end.', 'kotisivu-block-theme')}</p>
		</div>
	);
};

export default Edit;