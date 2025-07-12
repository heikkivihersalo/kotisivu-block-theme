export type ContactAdminSettingsData = {
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

export type SocialAccountsAdminSettingsData = {
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

export type AnalyticsAdminSettingsData = {
	active: boolean;
	id: string;
	url: string;
	timeout: string;
};

export type CacheAdminSettingsData = {
	[key: string]: string;
};

export type AdminSettingsData =
	| ContactAdminSettingsData
	| SocialAccountsAdminSettingsData
	| AnalyticsAdminSettingsData
	| CacheAdminSettingsData;
