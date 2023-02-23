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
				className: "columns-image-left__column",
				"templateLock": true,
				"template": [
					["ksd/image-optimized", { "className": "columns-image-left__image" }]
				]
			}
		],
		["ksd/inner-column",
			{
				className: "columns-image-left__column",
				"templateLock": true,
				"template": [
					["core/heading", { "level": 2, "className": "columns-image-left__heading" }],
					["core/separator", { "className": "columns-image-left__separator" }],
					["core/paragraph", { "className": "columns-image-left__paragraph" }],
					["ksd/image-optimized", { "className": "columns-image-left__decorative-image--arch" }]
				]
			}
		]
	]

	const blockProps = useBlockProps({
		className: "columns-image-left"
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
