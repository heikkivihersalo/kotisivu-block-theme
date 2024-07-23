declare module '@admin/misc' {
	import { ComponentType } from 'react';

	type ButtonProps = {
		name: string;
		disabled?: boolean;
		onClick?: () => void;
	};

	export type { ButtonProps };

	const Button: ComponentType<ButtonProps>;

	export { Button };
}
