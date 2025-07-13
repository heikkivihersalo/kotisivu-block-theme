/**
 * Handle the URL update
 * @param name Parameter name
 * @param value New value
 * @return void
 */
export function updateUrlParamValue(name: string, value: string): void {
	const url = new URL(window.location.href);

	if (!value || value === '' || value === null || value === undefined) {
		url.searchParams.delete(name);
	} else {
		// If the values are same, do not update the URL
		if (url.searchParams.get(name) === value) {
			return;
		}

		url.searchParams.set(name, value);
	}

	window.history.pushState({}, '', url);
}
