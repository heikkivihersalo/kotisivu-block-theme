/**
 * Validate Google Tag Manager ID
 * - ID must be in the format GTM-XXXXXXX
 * @param {string} id - Google Tag Manager ID
 * @return {boolean} - ID is valid
 */
function validateTagManagerID(id: string): boolean {
	return /^GTM-[A-Z0-9]{7}$/.test(id);
}

/**
 * Validate Google Tag Manager URL
 * - URL must not be empty string or contain http or https
 * @param {string} url - Google Tag Manager URL
 * @return {boolean} - URL is valid
 */
function validateTagManagerUrl(url: string): boolean {
	if ('' === url) {
		return false;
	}

	if (url.includes('http://') || url.includes('https://')) {
		return false;
	}

	return true;
}

export { validateTagManagerID, validateTagManagerUrl };
