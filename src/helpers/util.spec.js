import { getKey, getValue } from './util';

describe('getKey', () => {
  describe('when first argument is a string', () => {
    it('returns the string', () => {
      expect(getKey('key')).toBe('key');
    });
  });

  describe('when first argument is an object', () => {
    it('returns the first property key', () => {
      expect(getKey({ key: 'value' })).toBe('key');
      expect(getKey({ one: 1, two: 2 })).toBe('one');
    });
  });

  describe('when first argument is invalid', () => {
    it('returns undefined', () => {
      expect(getKey()).toBe(undefined);
      expect(getKey(null)).toBe(undefined);
      expect(getKey(1)).toBe(undefined);
    });
  });
});

describe('getValue', () => {
  describe('when first argument is an object', () => {
    it('returns first property value', () => {
      expect(getValue({ key: 'value' })).toBe('value');
      expect(getValue({ one: 1, two: 2 })).toBe(1);
    });
  });

  describe('when first argument is invalid', () => {
    it('returns undefined', () => {
      expect(getValue()).toBe(undefined);
      expect(getValue(null)).toBe(undefined);
      expect(getValue('')).toBe(undefined);
      expect(getValue(1)).toBe(undefined);
    });
  });
});
