type ContactAdminSettingsData = {
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

type SocialAccountsAdminSettingsData = {
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

type AnalyticsAdminSettingsData = {
	active: boolean;
	id: string;
	url: string;
	timeout: string;
};

type CacheAdminSettingsData = {
	[key: string]: string;
};

type AdminSettingsData =
	| AdminSettingsContactResponse
	| AdminSettingsSocialResponse
	| AdminSettingsAnalyticsResponse
	| AdminSettingsCacheResponse;
