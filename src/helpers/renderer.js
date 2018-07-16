import React from 'react';

export let markedRenderer;

/**
 * Removes newlines from string.
 *
 * @param  {String} string
 * @return {String}
 */
const removeNewlines = string => string.trim().replace(/\n/g, '');

/**
 * Renders text based on format.
 *
 * @param  {String}              input
 * @param  {String}              [format="text"]
 * @param  {String}              [element]
 * @return {String|ReactElement}
 */
const render = (input, format = 'text', element) => {
  switch (format) {
    case 'html':
      return React.createElement(element || 'div', {
        dangerouslySetInnerHTML: { __html: removeNewlines(input) },
      });

    case 'markdown':
      if (!markedRenderer) {
        markedRenderer = new window.marked.Renderer();

        /**
         * @see {@link https://github.com/markedjs/marked/blob/master/docs/USING_PRO.md#inline-level-renderer-methods|link}
         * @param  {String} href
         * @param  {String} [title]
         * @param  {String} text
         * @return {String}
         */
        markedRenderer.link = (href, title, text) =>
          `<a href="${href}" rel="noreferrer noopener" target="_blank">${text}</a>`;
      }

      return React.createElement(element || 'div', {
        dangerouslySetInnerHTML: {
          __html: removeNewlines(
            window.marked(input, {
              headerIds: false,
              renderer: markedRenderer,
            })
          ),
        },
      });

    case 'text':
    default:
      return element ? React.createElement(element, null, input) : input;
  }
};

export default render;
