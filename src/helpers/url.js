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
 * Returns URL search param(s).
 *
 * @see {@link https://developer.mozilla.org/docs/Web/API/URL/searchParams seachParams}
 *
 * @param  {String}        search  - The URL query string.
 * @param  {String}        [param] - The optional parameter name.
 * @return {Object|String}         - The search params or matching param value.
 */
export const searchParams = (search, param) => {
  if (typeof search !== 'string') {
    throw TypeError('First argument must be a string');
  }

  if (search[0] === QUESTION_MARK) {
    search = search.slice(1);
  }

  if (!search) {
    if (typeof param === 'string') {
      return;
    } else {
      return {};
    }
  }

  const searchParamsMap = search
    .split(SEPARATOR)
    .reduce((accumulator, field) => {
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

  if (typeof param === 'string') {
    return searchParamsMap[param];
  } else {
    return searchParamsMap;
  }
};
