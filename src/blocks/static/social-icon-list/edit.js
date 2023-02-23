import { __ } from "@wordpress/i18n";
import { InnerBlocks, useBlockProps } from "@wordpress/block-editor";
import ColumnInserterButton from './components/ColumnInserterButton';
import './editor.css';

const Edit = (props) => {
	const {
		attributes: {
			template,
		},
		clientId
	} = props;

	const blockProps = useBlockProps({
		className: `social-icon-list`
	});

	return (
		<div {...blockProps}>
			<InnerBlocks
				allowedBlocks="ksd/social-icon-list-item"
				template={template}
				renderAppender={() => <ColumnInserterButton clientId={clientId} />}
			/>
		</div>
	);
};

export default Edit;
