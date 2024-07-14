declare module '@wordpress/server-side-render' {
	import { ComponentType } from 'react';

	type ServerSideRenderProps = {
		block: string;
		attributes: Record<string, any>;
		className: string;
	};

	const ServerSideRender: ComponentType<ServerSideRenderProps>;

	export default ServerSideRender;
}
