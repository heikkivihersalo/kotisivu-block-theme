import { __ } from "@wordpress/i18n";
import { InnerBlocks, useBlockProps } from "@wordpress/block-editor";

import './editor.css';

const Edit = (props) => {
	const {
		attributes: {
			templateLock,
		}
	} = props;

	const template = [
		["ksd/inner-column",
			{
				className: "apartment-description__column",
				"templateLock": true,
				"template": [
					["ksd/apartment--tag", { "className": "apartment-description__tag" }],
					["core/heading", { "level": 2, "className": "apartment-description__heading" }],
					["core/separator", { "className": "apartment-description__separator" }],
					["core/paragraph", { "className": "apartment-description__paragraph" }],
					["ksd/image-optimized", { "className": "apartment-description__decorative-image--arch" }]
				]
			}
		],
		["ksd/inner-column",
			{
				className: "apartment-description__column",
				"templateLock": true,
				"template": [
					["ksd/image-optimized", { "className": "apartment-description__image" }]
				]
			}
		]
	]

	const blockProps = useBlockProps({
		className: "apartment-description"
	});

	return (
		<div {...blockProps}>
			<InnerBlocks
				allowedBlocks={["ksd/inner-column"]}
				template={template}
				templateLock={templateLock}
			/>
		</div>
	);
};

export default Edit;
