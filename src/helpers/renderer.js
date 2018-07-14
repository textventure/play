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
 * @return {String|ReactElement}
 */
const render = (input, format = 'text') => {
  switch (format) {
    case 'html':
      return (
        <div dangerouslySetInnerHTML={{ __html: removeNewlines(input) }} />
      );
    case 'markdown':
      return (
        <div
          dangerouslySetInnerHTML={{
            __html: removeNewlines(window.marked(input, { headerIds: false })),
          }}
        />
      );
    case 'text':
    default:
      return input;
  }
};

export default render;
