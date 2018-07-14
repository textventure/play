import React from 'react';

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
      return <div dangerouslySetInnerHTML={{ __html: input }} />;
    case 'markdown':
      return (
        <div
          dangerouslySetInnerHTML={{
            __html: window.marked(input, { headerIds: false }),
          }}
        />
      );
    case 'text':
    default:
      return input;
  }
};

export default render;
