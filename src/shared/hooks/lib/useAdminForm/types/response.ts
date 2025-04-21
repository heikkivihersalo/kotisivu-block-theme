import type {
	ContactAdminSettingsData,
	SocialAccountsAdminSettingsData,
	AnalyticsAdminSettingsData,
	CacheAdminSettingsData,
} from './data';

export type ResponseBody<T> = {
	status: string;
	type: string;
	message: string;
	data: T;
};

export type AdminSettingsContactResponse =
	ResponseBody<ContactAdminSettingsData>;
export type AdminSettingsSocialResponse =
	ResponseBody<SocialAccountsAdminSettingsData>;
export type AdminSettingsAnalyticsResponse =
	ResponseBody<AnalyticsAdminSettingsData>;
export type AdminSettingsCacheResponse = ResponseBody<CacheAdminSettingsData>;

export type AdminSettingsApiResponse =
	| AdminSettingsContactResponse
	| AdminSettingsSocialResponse
	| AdminSettingsAnalyticsResponse
	| AdminSettingsCacheResponse;
