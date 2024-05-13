/**
 * Namespace for the REST API.
 */
const NAMESPACE = '/kotisivu-block-theme/v1';

/**
 * REST API paths for the options store.
 * Defined in the WP REST API.
 */
const PATHS = {
	contact: `${NAMESPACE}/options/contact`,
	social: `${NAMESPACE}/options/social`,
};

/**
 * Keys that are stored in the database.
 * Can be used to format data for the front-end.
 */
const CONTACT = [
	{
		db_key: 'contact-address',
		key: 'address',
	},
	{
		db_key: 'contact-city',
		key: 'city',
	},
	{
		db_key: 'contact-zip',
		key: 'zip',
	},
	{
		db_key: 'contact-country',
		key: 'country',
	},
	{
		db_key: 'contact-business-id',
		key: 'businessId',
	},
	{
		db_key: 'contact-company-name',
		key: 'companyName',
	},
	{
		db_key: 'contact-email',
		key: 'email',
	},
	{
		db_key: 'contact-phone',
		key: 'phone',
	},
	{
		db_key: 'contact-vat-number',
		key: 'vatNumber',
	},
];

/**
 * Keys that are stored in the database.
 * Can be used to format data for the front-end.
 */
const SOCIAL = [
	{
		db_key: 'facebook-url',
		key: 'facebook',
	},
	{
		db_key: 'twitter-url',
		key: 'twitter',
	},
	{
		db_key: 'instagram-url',
		key: 'instagram',
	},
	{
		db_key: 'linkedin-url',
		key: 'linkedin',
	},
	{
		db_key: 'youtube-url',
		key: 'youtube',
	},
	{
		db_key: 'pinterest-url',
		key: 'pinterest',
	},
	{
		db_key: 'snapchat-url',
		key: 'snapchat',
	},
	{
		db_key: 'tiktok-url',
		key: 'tiktok',
	},
	{
		db_key: 'twitch-url',
		key: 'twitch',
	},
	{
		db_key: 'reddit-url',
		key: 'reddit',
	},
	{
		db_key: 'discord-url',
		key: 'discord',
	},
	{
		db_key: 'whatsapp-url',
		key: 'whatsapp',
	},
];

export { NAMESPACE, PATHS, SOCIAL, CONTACT };
