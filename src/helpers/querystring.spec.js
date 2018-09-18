import querystring from './querystring';

describe('querystring.parse', () => {
  // invalid cases
  [undefined, null, 42, Object, Array, Function, Date].forEach(arg => {
    describe(`when arguments=[${arg}]`, () => {
      it('throws error', () => {
        expect(() => querystring.parse(arg)).toThrow(TypeError);
      });
    });
  });

  // test cases
  [
    // empty string
    {
      args: [''],
      expected: {},
    },

    // no starting question mark character
    {
      args: ['foo=bar'],
      expected: { foo: 'bar' },
    },

    // binary param
    {
      args: ['?foo'],
      expected: { foo: '' },
    },

    // key with multiple values
    {
      args: ['?foo=bar&foo=baz'],
      expected: { foo: ['bar', 'baz'] },
    },
    {
      args: ['?foo=bar&foo=baz&foo=qux'],
      expected: { foo: ['bar', 'baz', 'qux'] },
    },
    {
      args: ['?foo=bar&foo=baz&foo=qux&foo&foo'],
      expected: { foo: ['bar', 'baz', 'qux', '', ''] },
    },

    // key-value pairs
    {
      args: ['?foo=bar'],
      expected: { foo: 'bar' },
    },
    {
      args: ['?foo=bar&baz=qux'],
      expected: { foo: 'bar', baz: 'qux' },
    },

    // mixed
    {
      args: ['?foo=bar&baz=qux&baz=quux&corge='],
      expected: { foo: 'bar', baz: ['qux', 'quux'], corge: '' },
    },

    // encoded
    {
      args: ['?foo%20bar=baz%2Fqux'],
      expected: { 'foo bar': 'baz/qux' },
    },
  ].forEach(({ args, expected }) => {
    describe(`when arguments=${JSON.stringify(args)}`, () => {
      it(`returns ${JSON.stringify(expected)}`, () => {
        expect(querystring.parse.apply(null, args)).toEqual(expected);
      });
    });
  });
});
