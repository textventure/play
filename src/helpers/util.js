/**
 * Formats author name(s).
 *
 * @param  {String|Array} author
 * @return {String}
 */
export const formatAuthor = author => {
  if (typeof author === 'string') {
    return author;
  }
  if (author instanceof Array) {
    const authorLength = author.length;
    switch (authorLength) {
      case 0:
        return '';
      case 1:
        return author[0];
      case 2:
        return author.join(' and ');
      // greater than 2
      default:
        return author.reduce((accumulator, name, index) => {
          if (index === 0) {
            return name;
          }
          if (index === authorLength - 1) {
            return accumulator + ', and ' + name;
          }
          return accumulator + ', ' + name;
        }, '');
    }
  }
  return '';
};

/**
 * Gets first property key from object.
 *
 * @param  {Object} object
 * @return {String}
 */
export const getKey = object => {
  for (let key in object) {
    return key;
  }
};

/**
 * Gets first property value from object.
 *
 * @param  {Object} object
 * @return {*}
 */
export const getValue = object => {
  for (let key in object) {
    return object[key];
  }
};
