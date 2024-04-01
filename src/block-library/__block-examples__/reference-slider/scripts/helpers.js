import apiFetch from "@wordpress/api-fetch";

/**
 * Get media files from the API
 * @param {Object} params
 * @returns {Array} results
 */
async function getReferences(params = null) {
    /**
     * Create the URL
     */
    let apiRequest = new URL(window.location.origin + "/wp/v2/references");

    /**
     * Add the params to the URL
     */
    for (const [key, value] of Object.entries(params)) {
        apiRequest.searchParams.append(key, value);
    }

    const results = await apiFetch({ path: apiRequest.pathname + apiRequest.search }).then((post) => {
        return post;
    });

    return results;
}

function stripHTML(html) {
    var tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
}

export { getReferences, stripHTML }