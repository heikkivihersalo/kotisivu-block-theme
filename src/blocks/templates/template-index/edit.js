import { __ } from "@wordpress/i18n";
import { useBlockProps } from "@wordpress/block-editor";
import './editor.css';

const Edit = (props) => {
	const blockProps = useBlockProps({
		className: 'editor-site-content'
	});

	return (
		<div {...blockProps}>
			{__('Site Content', 'kotisivu-theme-blocks')}
		</div>
	);
};

export default Edit;