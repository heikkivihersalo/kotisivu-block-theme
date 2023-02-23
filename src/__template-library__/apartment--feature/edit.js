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
				className: "apartment-feature__column",
				"templateLock": true,
				"template": [
					["core/heading", { "level": 3, "className": "apartment-feature__heading" }],
					["core/paragraph", { "className": "apartment-feature__paragraph" }],
					["core/buttons", { "className": "apartment-feature__button" }]
				]
			}
		],
		["ksd/inner-column",
			{
				className: "apartment-feature__column",
				"templateLock": true,
				"template": [
					["ksd/image-optimized", { "className": "apartment-feature__image" }],
					["ksd/image-optimized", { "className": "apartment-feature__decorative-image--arch" }]
				]
			}
		]
	]

	const blockProps = useBlockProps({
		className: "apartment-feature"
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
