import { __ } from "@wordpress/i18n";
import {
	InnerBlocks,
	useBlockProps,
} from "@wordpress/block-editor";

import './editor.css';

const Edit = (props) => {
	const {
		attributes: { }
	} = props;

	const TEMPLATE = [
		['ksd/site-logo'],
		['ksd/navigation-header']
	]

	return (
		<>
			<InnerBlocks orientation="horizontal" template={TEMPLATE} />
		</>
	);
};

export default Edit;
