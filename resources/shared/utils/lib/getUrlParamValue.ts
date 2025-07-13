/**
 * Get the initial value
 * @param name Parameter name
 * @return Initial value
 */
export function getUrlParamValue(name: string): string {
    const url = new URL(window.location.href);
    const paramValue = url.searchParams.get(name) as string;
    return paramValue || '';
}
