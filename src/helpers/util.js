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
