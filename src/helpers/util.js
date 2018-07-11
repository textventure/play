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
 * Gets key.
 *
 * @param  {String|Object} value
 * @return {String}
 */
export const getKey = value => {
  if (typeof value === 'string') {
    return value;
  }

  // return first property key
  if (value instanceof Object) {
    for (let key in value) {
      return key;
    }
  }
};

/**
 * Gets value.
 *
 * @param  {Object} obj
 * @return {*}
 */
export const getValue = obj => {
  // return first property value
  if (obj instanceof Object) {
    for (let key in obj) {
      return obj[key];
    }
  }
};
