declare module '@hooks' {
	import { ComponentType } from 'react';
	import { TemplateArray } from '@wordpress/blocks';

	type BlockVariation = {
		name: string;
		innerBlocks: TemplateArray | undefined;
		attributes: {
			childTemplate: TemplateArray | undefined;
			blockClass: string;
			style: Record<string, string>;
		};
	};

	interface BlockAttributes {
		variationName: string;
		template: TemplateArray | undefined;
		childTemplate: TemplateArray | undefined;
		blockClass: string;
		style: Record<string, string>;
	}

	export type { BlockVariation };

	const useBlockVariations: (blockName: string) => BlockVariation[];

	export { useBlockVariations, BlockAttributes };

	/**
	 * Set types for admin form props
	 */
	type ContactAdminFormProps = {
		path: 'kotisivu-block-theme/v1/options/contact';
		nonce: string | undefined;
	};

	type SocialAdminFormProps = {
		path: 'kotisivu-block-theme/v1/options/social';
		nonce: string | undefined;
	};

	type AnalyticsAdminFormProps = {
		path: 'kotisivu-block-theme/v1/options/analytics';
		nonce: string | undefined;
	};

	type ChatGPTAdminFormProps = {
		path: 'kotisivu-block-theme/v1/options/chatgpt';
		nonce: string | undefined;
	};

	type PurgeCacheAdminFormProps = {
		path: 'kotisivu-block-theme/v1/options/purge-cache';
		nonce: string | undefined;
	};

	type AdminFormProps =
		| ContactAdminFormProps
		| SocialAdminFormProps
		| AnalyticsAdminFormProps
		| ChatGPTAdminFormProps
		| PurgeCacheAdminFormProps;

	export type {
		AdminFormProps,
		ContactAdminFormProps,
		SocialAdminFormProps,
		AnalyticsAdminFormProps,
		ChatGPTAdminFormProps,
		PurgeCacheAdminFormProps,
	};

	type ContactAdminApiResponse = {
		status: string;
		type: string;
		message: string;
		data: {
			name: string;
			address: string;
			zip: number;
			city: string;
			country: string;
			vat: string;
			business_id: string;
			phone: string;
			email: string;
		};
	};

	type SocialAdminApiResponse = {
		status: string;
		type: string;
		message: string;
		data: {
			facebook?: string;
			twitter?: string;
			instagram?: string;
			linkedin?: string;
			youtube?: string;
			pinterest?: string;
			snapchat?: string;
			tiktok?: string;
			twitch?: string;
			reddit?: string;
			discord?: string;
			whatsapp?: string;
		};
	};

	type AnalyticsAdminApiResponse = {
		status: string;
		type: string;
		message: string;
		data: {
			active: boolean;
			id: string;
			url: string;
			timeout: string;
		};
	};

	type ChatGPTAdminApiResponse = {
		status: string;
		type: string;
		message: string;
		data: {
			model: string;
			api_key: string;
		};
	};

	type PurgeCacheAdminApiResponse = {
		status: string;
		type: string;
		message: string;
	};

	type AdminApiResponse =
		| ContactAdminApiResponse
		| SocialAdminApiResponse
		| AnalyticsAdminApiResponse
		| ChatGPTAdminApiResponse
		| PurgeCacheAdminApiResponse;

	export type {
		AdminApiResponse,
		ContactAdminApiResponse,
		SocialAdminApiResponse,
		AnalyticsAdminApiResponse,
		ChatGPTAdminApiResponse,
		PurgeCacheAdminApiResponse,
	};

	type ContactAdminFormData = {
		name: ContactAdminApiResponse['data']['name'];
		address: ContactAdminApiResponse['data']['address'];
		zip: ContactAdminApiResponse['data']['zip'];
		city: ContactAdminApiResponse['data']['city'];
		country: ContactAdminApiResponse['data']['country'];
		vat: ContactAdminApiResponse['data']['vat'];
		business_id: ContactAdminApiResponse['data']['business_id'];
		phone: ContactAdminApiResponse['data']['phone'];
		email: ContactAdminApiResponse['data']['email'];
	};

	type SocialAdminFormData = {
		facebook: SocialAdminApiResponse['data']['facebook'];
		twitter: SocialAdminApiResponse['data']['twitter'];
		instagram: SocialAdminApiResponse['data']['instagram'];
		linkedin: SocialAdminApiResponse['data']['linkedin'];
		youtube: SocialAdminApiResponse['data']['youtube'];
		pinterest: SocialAdminApiResponse['data']['pinterest'];
		snapchat: SocialAdminApiResponse['data']['snapchat'];
		tiktok: SocialAdminApiResponse['data']['tiktok'];
		twitch: SocialAdminApiResponse['data']['twitch'];
		reddit: SocialAdminApiResponse['data']['reddit'];
		discord: SocialAdminApiResponse['data']['discord'];
		whatsapp: SocialAdminApiResponse['data']['whatsapp'];
	};

	type AnalyticsAdminFormData = {
		active: AnalyticsAdminApiResponse['data']['active'];
		id: AnalyticsAdminApiResponse['data']['id'];
		url: AnalyticsAdminApiResponse['data']['url'];
		timeout: AnalyticsAdminApiResponse['data']['timeout'];
	};

	type ChatGPTAdminFormData = {
		model: ChatGPTAdminApiResponse['data']['model'];
		api_key: ChatGPTAdminApiResponse['data']['api_key'];
	};

	type PurgeCacheAdminFormData = {};

	type AdminFormData =
		| ContactAdminFormData
		| SocialAdminFormData
		| AnalyticsAdminFormData
		| ChatGPTAdminFormData
		| PurgeCacheAdminFormData;

	export type {
		AdminFormData,
		ContactAdminFormData,
		SocialAdminFormData,
		AnalyticsAdminFormData,
		ChatGPTAdminFormData,
		PurgeCacheAdminFormData,
	};

	const useAdminForm: (props: AdminFormProps) => {
		formData: AdminFormData;
		setFormData: (data: AdminFormData) => void;
		handleChange: (
			event: React.MouseEvent<HTMLInputElement, MouseEvent>
		) => void;
		handleSave: ({ data }: { data: AdminFormData }) => void;
	};

	export { useAdminForm };
}
