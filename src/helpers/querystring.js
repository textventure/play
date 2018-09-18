/**
 * The beginning character of the query string.
 *
 * @constant {String}
 */
const QUESTION_MARK = '?';

/**
 * The substring used to delimit key and value pairs in the query string.
 *
 * @constant {String}
 */
const SEPARATOR = '&';

/**
 * The substring used to delimit keys and values in the query string.
 *
 * @constant {String}
 */
const EQUAL = '=';

/**
 * Parses a URL query string into a collection of key and value pairs.
 *
 * @see {@link https://nodejs.org/api/querystring.html querystring}
 *
 * @param  {String} string - The URL query string to parse.
 * @return {Object}
 */
export const parse = string => {
  if (typeof string !== 'string') {
    throw TypeError('First argument must be a string');
  }

  if (string[0] === QUESTION_MARK) {
    string = string.slice(1);
  }

  if (!string) {
    return {};
  }

  return string.split(SEPARATOR).reduce((accumulator, field) => {
    let [key, value] = field.split(EQUAL);
    key = decodeURIComponent(key);

    if (value === undefined) {
      value = '';
    } else {
      value = decodeURIComponent(value);
    }

    switch (typeof accumulator[key]) {
      // new key-value
      case 'undefined':
        accumulator[key] = value;
        break;

      // existing key-value, convert to array
      case 'string':
        accumulator[key] = [accumulator[key], value];
        break;

      // existing key-values, push to array
      case 'object':
        accumulator[key].push(value);
        break;

      // no default
    }

    return accumulator;
  }, {});
};

export default {
  parse,
};
