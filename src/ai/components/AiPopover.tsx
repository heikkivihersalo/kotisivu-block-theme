import { __ } from '@wordpress/i18n';
import { Popover } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { Ring180 } from '@icons';

const AiPopover = ({
	isVisible,
	setIsVisible,
	isLoading,
	selectedText,
	generateContentCallback,
}: {
	isVisible: boolean;
	setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
	isLoading: boolean;
	selectedText: string;
	generateContentCallback: React.FormEventHandler<HTMLFormElement>;
}) => {
	return (
		<>
			{isVisible && (
				<>
					<Popover
						placement="bottom"
						onClose={() => setIsVisible(false)}
					>
						<form
							className="ai-popover"
							onSubmit={generateContentCallback}
						>
							<div className="ai-popover__control">
								<div className="ai-popover__field ai-popover__field--prompt">
									<label
										className="ai-popover__label ai-popover__label--prompt"
										htmlFor="prompt"
									>
										{__('Prompt', 'kotisivu-block-theme')}
									</label>
									<textarea
										id="prompt"
										className="ai-popover__input ai-popover__input--prompt"
										name="prompt"
										rows={1}
									></textarea>
								</div>
								<button
									type="submit"
									className="ai-popover__button components-button is-primary is-compact"
									disabled={isLoading}
								>
									{isLoading ? (
										<Ring180 />
									) : (
										__('Generate', 'kotisivu-block-theme')
									)}
								</button>
							</div>
							{selectedText !== '' ? (
								<>
									<div className="ai-popover__selection">
										<span className="ai-popover__field ai-popover__field--selection">
											{__(
												'Selected text',
												'kotisivu-block-theme'
											)}
										</span>
										<p>{selectedText}</p>
									</div>
								</>
							) : null}
							<div
								className="ai-popover__field ai-popover__field--selected"
								data-disabled={selectedText === ''}
							>
								<input
									id="use-selected"
									className="ai-popover__input ai-popover__input--selected"
									type="checkbox"
									defaultChecked={selectedText !== ''}
									disabled={selectedText === ''}
									name="use-selected"
								/>
								<label
									className="ai-popover__label"
									htmlFor="use-selected"
								>
									{__(
										'Use text selection',
										'kotisivu-block-theme'
									)}
								</label>
							</div>
							<p className="ai-popover__help">
								{__(
									'AI generated content may not be accurate. Always review the content before publishing.',
									'kotisivu-block-theme'
								)}
							</p>
						</form>
					</Popover>
				</>
			)}
		</>
	);
};

export default AiPopover;
