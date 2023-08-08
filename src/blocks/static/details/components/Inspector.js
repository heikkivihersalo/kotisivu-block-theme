/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { InspectorControls } from "@wordpress/block-editor";
import { PanelBody, PanelRow, ToggleControl, TextControl } from "@wordpress/components";

/**
 * Internal dependencies
 */
import {
	BackgroundColorControl
} from "@features/inspector";

const Inspector = (props) => {
	const {
		attributes: {
			useSchema,
			containerSchemaProp,
			containerSchemaType,
			headingSchemaProp,
			contentSchemaProp,
			contentSchemaType,
			isOpenOnLoad
		},
		setAttributes,
	} = props;

	return (
		<>
			<InspectorControls group="styles">
				<BackgroundColorControl {...props} />
			</InspectorControls>
			<InspectorControls>
				<PanelBody title={__("Behaviour", "kotisivu-block-theme")} initialOpen={false}>
					<p>{__("Select the behaviour for this block.", "kotisivu-block-theme")}</p>
					<PanelRow>
						<ToggleControl
							label={__("Open on page load", "kotisivu-block-theme")}
							checked={isOpenOnLoad}
							onChange={() => setAttributes({ isOpenOnLoad: !isOpenOnLoad })}
						/>
					</PanelRow>
				</PanelBody>
				<PanelBody title={__("Schema", "kotisivu-block-theme")} initialOpen={false}>
					<p>{__("Select the schema type for this block.", "kotisivu-block-theme")}</p>
					<PanelRow>
						<ToggleControl
							label={__("Use schema", "kotisivu-block-theme")}
							checked={useSchema}
							onChange={() => setAttributes({ useSchema: !useSchema })}
						/>
					</PanelRow>
					{useSchema && (
						<>
							<TextControl
								label={__("Container (details) schema property", "kotisivu-block-theme")}
								value={containerSchemaProp}
								onChange={(containerSchemaProp) =>
									setAttributes({ containerSchemaProp })
								}
							/>
							<TextControl
								label={__("Container (details) schema type", "kotisivu-block-theme")}
								value={containerSchemaType}
								onChange={(containerSchemaType) =>
									setAttributes({ containerSchemaType })
								}
							/>
							<TextControl
								label={__("Heading (summary) schema property", "kotisivu-block-theme")}
								value={headingSchemaProp}
								onChange={(headingSchemaProp) =>
									setAttributes({ headingSchemaProp })
								}
							/>
							<TextControl
								label={__("Content (text) schema property", "kotisivu-block-theme")}
								value={contentSchemaProp}
								onChange={(contentSchemaProp) =>
									setAttributes({ contentSchemaProp })
								}
							/>
							<TextControl
								label={__("Content (text) schema type", "kotisivu-block-theme")}
								value={contentSchemaType}
								onChange={(contentSchemaType) =>
									setAttributes({ contentSchemaType })
								}
							/>
						</>
					)}
				</PanelBody>
			</InspectorControls>
		</>
	);
};

export default Inspector;
