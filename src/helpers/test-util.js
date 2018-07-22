/**
 * `Object.defineProperty` shorthand.
 *
 * @param  {Object} object
 * @param  {String} key
 * @param  {*}      value
 * @return {Object}
 */
export const defineProperty = (object, key, value) => {
  return Object.defineProperty(object, key, {
    value,
    writable: true,
  });
};
