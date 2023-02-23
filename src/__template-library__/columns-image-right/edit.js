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
				className: "columns-image-right__column",
				"templateLock": true,
				"template": [
					["core/heading", { "level": 2, "className": "columns-image-right__heading" }],
					["core/paragraph", { "className": "columns-image-right__paragraph" }],
				]
			}
		],
		["ksd/inner-column",
			{
				className: "columns-image-right__column",
				"templateLock": true,
				"template": [
					["ksd/image-optimized", { "className": "columns-image-right__image" }],
					["ksd/image-optimized", { "className": "columns-image-right__decorative-image--arch" }]
				]
			}
		]
	]

	const blockProps = useBlockProps({
		className: "columns-image-right"
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
