declare module '@components/ai' {
	import { ComponentType } from 'react';

	/**
	 * Set types for component props
	 */
	type GenerativeAIProps = {
		attributes: Record<string, any>;
		setAttributes: (newAttributes: Record<string, any>) => void;
	};

	export type { GenerativeAIProps };

	/**
	 * Set types for component
	 */
	const GenerativeAI: ComponentType<GenerativeAIProps>;

	export { GenerativeAI };
}
