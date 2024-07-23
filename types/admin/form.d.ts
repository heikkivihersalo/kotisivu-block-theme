declare module '@admin/form' {
	import { ComponentType } from 'react';

	type FormProps = {
		children: React.ReactNode;
		onSave: () => void;
	};

	type FormBodyProps = {
		children: React.ReactNode;
	};

	type FormButtonProps = {};

	type FormHeadProps = {
		name: string;
		toggleName?: string;
		toggleValue?: boolean;
		toggleCallback?: (
			event: React.MouseEvent<HTMLInputElement, MouseEvent>
		) => void;
	};

	export type { FormProps, FormBodyProps, FormButtonProps, FormHeadProps };

	const Form: ComponentType<FormProps>;
	const FormBody: ComponentType<FormBodyProps>;
	const FormButton: ComponentType<FormButtonProps>;
	const FormHead: ComponentType<FormHeadProps>;

	export { Form, FormBody, FormButton, FormHead };
}
