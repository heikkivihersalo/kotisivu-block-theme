/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { Ring180 } from '@icons';

/**
 * Inspector controls
 * @param {Record<string, any>} props Component properties
 * @return {JSX.Element} Inspector controls
 */
const Inspector = ({
	handleContentCallback,
	status,
}: {
	handleContentCallback: React.FormEventHandler<HTMLFormElement>;
	status: boolean;
}): JSX.Element => {
	return (
		<>
			<InspectorControls>
				<form
					className="ai-content-assistant-controls"
					onSubmit={handleContentCallback}
				>
					<div className="components-base-control">
						<div className="components-base-control__field">
							<label className="components-base-control__label">
								{__('Prompt', 'kotisivu-block-theme')}
							</label>
							<textarea
								id="prompt"
								className="components-text-control__input"
								name="prompt"
								rows={4}
							></textarea>
						</div>
						<p className="components-base-control__help">
							{__(
								'Enter a prompt to generate content. Please do remember that AI generated content may not be accurate. Always review the content before publishing.',
								'kotisivu-block-theme'
							)}
						</p>
					</div>
					<button
						type="submit"
						className="components-button is-primary is-compact"
						disabled={status}
					>
						{status ? (
							<Ring180 />
						) : (
							__('Generate', 'kotisivu-block-theme')
						)}
					</button>
				</form>
			</InspectorControls>
		</>
	);
};

export default Inspector;
