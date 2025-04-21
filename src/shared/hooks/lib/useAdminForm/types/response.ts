type ResponseBody<T> = {
	status: string;
	type: string;
	message: string;
	data: T;
};

type AdminSettingsContactResponse = ResponseBody<ContactAdminSettingsData>;
type AdminSettingsSocialResponse =
	ResponseBody<SocialAccountsAdminSettingsData>;
type AdminSettingsAnalyticsResponse = ResponseBody<AnalyticsAdminSettingsData>;
type AdminSettingsCacheResponse = ResponseBody<CacheAdminSettingsData>;

type AdminSettingsApiResponse =
	| AdminSettingsContactResponse
	| AdminSettingsSocialResponse
	| AdminSettingsAnalyticsResponse
	| AdminSettingsCacheResponse;
