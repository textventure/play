import React from 'react';

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
      return React.createElement(element || 'div', {
        dangerouslySetInnerHTML: {
          __html: removeNewlines(window.marked(input, { headerIds: false })),
        },
      });
    case 'text':
    default:
      return element ? React.createElement(element, null, input) : input;
  }
};

export default render;
