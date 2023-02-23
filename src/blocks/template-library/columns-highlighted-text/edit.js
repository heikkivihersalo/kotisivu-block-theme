import { __ } from "@wordpress/i18n";
import { InnerBlocks, useBlockProps } from "@wordpress/block-editor";

import './editor.css';

const Edit = (props) => {
	const {
		attributes: {
			templateLock
		}
	} = props;

	const template = [
		["ksd/inner-column",
			{
				className: "columns-highlighted-text__column ",
				"templateLock": true,
				"template": [
					["core/heading", { "level": 2, "className": "columns-highlighted-text__heading" }],
					["core/separator", { "className": "columns-highlighted-text__separator" }]
				]
			}
		],
		["ksd/inner-column",
			{
				className: "columns-highlighted-text__column",
				"templateLock": true,
				"template": [
					["core/paragraph", { "className": "columns-highlighted-text__paragraph" }]
				]
			}
		]
	]

	const blockProps = useBlockProps({
		className: "columns-highlighted-text"
	});

	return (
		<section {...blockProps}>
			<InnerBlocks
				allowedBlocks={["ksd/inner-column"]}
				template={template}
				templateLock={templateLock}
			/>
		</section>
	);
};

export default Edit;
