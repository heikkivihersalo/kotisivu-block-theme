export {};

declare global {
	type KotisivuSettings = {
		nonce: string;
	};

	interface Window {
		kotisivuSettings?: KotisivuSettings;
	}
}
