/*--------------------------------------------------------------
>>> TABLE OF CONTENTS:
----------------------------------------------------------------
0.0 Imports
--------------------------------------------------------------*/

/**
 * WordPress dependencies
 */
import apiFetch from '@wordpress/api-fetch';

/*--------------------------------------------------------------
  1.0 
--------------------------------------------------------------*/

/**
 * Get media files from the API
 * @param {Object} params
 * @returns {Array} results
 */
async function getMediaFiles(params = null) {
  /**
   * Create the URL
   */
  let apiRequest = new URL(window.location.origin + "/wp/v2/media");

  /**
   * Add the params to the URL
   */
  for (const [key, value] of Object.entries(params)) {
    apiRequest.searchParams.append(key, value);
  }

  const results = await apiFetch({ path: apiRequest.pathname + apiRequest.search }).then((media) => {
    return media;
  });

  return results;
}

function convertEntityToText(str) {
  const entityCodes = {
    "&#8211;": "-",
  }

  for (const entity in entityCodes) {
    if (str.indexOf(entity) >= 0) {
      const newStr = str.replaceAll(entity, entityCodes[entity])
      return newStr
    }
  }
  return str;
}

/*--------------------------------------------------------------
  3.0 Exports
--------------------------------------------------------------*/

export { getMediaFiles, convertEntityToText }
