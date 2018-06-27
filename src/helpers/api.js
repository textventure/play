/**
 * Gets story from URL.
 *
 * @param  {String} url
 * @return {Promise}
 */
export const getStory = url => {
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.text();
      }
      throw new Error('URL: ' + (response.statusText || response.status));
    })
    .then(text => {
      try {
        return window.jsyaml.load(text);
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
