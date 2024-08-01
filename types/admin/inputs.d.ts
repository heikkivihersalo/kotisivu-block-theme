declare module '@admin/inputs' {
	import { ComponentType } from 'react';

	type InputType = 'text' | 'textarea' | 'number' | 'email';

	type InputProps = {
		type: InputType;
		label: string;
		name: string;
		value: string | number | readonly string[] | undefined;
		placeholder?: string;
		onChange?: (
			event: React.MouseEvent<HTMLInputElement, MouseEvent>
		) => void;
		disabled?: boolean;
	};

	type ToggleProps = {
		label: string;
		name: string;
		checked: boolean;
		onChange: (
			event: React.MouseEvent<HTMLInputElement, MouseEvent>
		) => void;
		hideLabel?: boolean;
	};

	export type { InputType, InputProps, ToggleProps };

	const Input: ComponentType<InputProps>;
	const Toggle: ComponentType<ToggleProps>;

	export { Input, Toggle };
}
