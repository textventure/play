const { jsyaml } = window;

/**
 * Gets story from URL.
 *
 * @param  {String} url
 * @return {Promise}
 */
export const getStory = url => {
  return fetch(url)
    .then(response => {
      const { status } = response;
      if (status < 200 || status >= 300) {
        throw new Error('URL: ' + (response.statusText || status));
      }
      return response.text();
    })
    .then(text => {
      try {
        return jsyaml.load(text);
      } catch (error) {
        throw new Error('YAML: Unable to parse');
      }
    })
    .then(story => {
      if (!(story instanceof Object)) {
        throw new Error('YAML: Missing values');
      }
      return story;
    });
};
