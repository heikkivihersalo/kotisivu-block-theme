declare module '@admin/containers' {
	import { ComponentType } from 'react';

	type OptionProps = {
		children: React.ReactNode;
		name?: string;
		description?: string;
	};

	type OptionBodyProps = {
		children: React.ReactNode;
		name?: string;
		description?: string;
	};

	type OptionGroupProps = {
		children: React.ReactNode;
	};

	export type { OptionProps, OptionBodyProps, OptionGroupProps };

	const Option: ComponentType<OptionProps>;
	const OptionBody: ComponentType<OptionBodyProps>;
	const OptionGroup: ComponentType<OptionGroupProps>;

	export { Option, OptionBody, OptionGroup };
}
