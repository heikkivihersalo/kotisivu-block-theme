declare module '@wordpress/commands' {
	type useCommandProps = {
		name: string;
		label: string;
		icon: any;
		callback: ({ close }: { close: Function }) => void;
		context?: 'site-editor-edit' | 'site-editor';
	};

	function useCommand({ name, label, icon, callback }: useCommandProps): void;

	export { useCommand };
}
