/**
 * WordPress dependencies
 */
import { createReduxStore, register } from '@wordpress/data';

/**
 * Social Media Store
 */
import {
	STORE_NAME as SOCIAL_MEDIA_STORE_NAME,
	STORE_CONFIG as socialMediaConfig,
} from './stores/social-media';

const socialMediaStore = createReduxStore(
	SOCIAL_MEDIA_STORE_NAME,
	socialMediaConfig
);

register(socialMediaStore);

/**
 * Contact Information Store
 */
import {
	STORE_NAME as CONTACT_STORE_NAME,
	STORE_CONFIG as contactConfig,
} from './stores/contact';

const contactStore = createReduxStore(CONTACT_STORE_NAME, contactConfig);

register(contactStore);
