const API_PATH = '/kotisivu-block-theme/v1/options/social' as const;

const ACTIONS = {
	GETTER: 'GET',
	SETTER: 'SET',
} as const;

const SOCIAL_MEDIA_ACCOUNTS = {
	facebook: 'facebook',
	twitter: 'twitter',
	instagram: 'instagram',
	linkedin: 'linkedin',
	youtube: 'youtube',
	pinterest: 'pinterest',
	snapchat: 'snapchat',
	tiktok: 'tiktok',
	twitch: 'twitch',
	reddit: 'reddit',
	discord: 'discord',
	whatsapp: 'whatsapp',
};

export { API_PATH, ACTIONS, SOCIAL_MEDIA_ACCOUNTS };
