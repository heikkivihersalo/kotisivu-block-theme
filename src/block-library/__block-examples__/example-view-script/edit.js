/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";

/**
 * Internal dependencies
 */
import './editor.css';

/**
 * Block edit function
 * @param {Object} props Block props
 * @return {JSX.Element} React component
 */
export default function Edit(props) {
	return (
		<div className="example-view-script-block">
			<p className="placeholder-editor-text">{__('This is placeholder text for view script block. This will be rendered in the editor and basically be anything.', 'kotisivu-block-theme')}</p>
		</div>
	);
};
