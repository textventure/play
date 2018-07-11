import { formatAuthor, getKey, getValue } from './util';

describe('formatAuthor', () => {
  describe('when first argument is not a string', () => {
    it('returns an empty string', () => {
      [undefined, null, 0, 1, {}, () => {}, Date].forEach(argument => {
        expect(formatAuthor(argument)).toBe('');
      });
    });
  });

  describe('when first argument is a string', () => {
    it('returns string', () => {
      expect(formatAuthor('')).toBe('');
      expect(formatAuthor('Mark')).toBe('Mark');
      expect(formatAuthor('Mark Twain')).toBe('Mark Twain');
    });
  });

  describe('when first argument is an array', () => {
    it('returns empty string when array is blank', () => {
      expect(formatAuthor([])).toBe('');
    });

    describe('and array.length == 1', () => {
      it('returns first item', () => {
        expect(formatAuthor(['Mark Twain'])).toBe('Mark Twain');
      });
    });

    describe('and array.length == 2', () => {
      it('returns formatted items', () => {
        expect(formatAuthor(['Mark Twain', 'Marcus Aurelius'])).toBe(
          'Mark Twain and Marcus Aurelius'
        );
      });
    });

    describe('and array.length > 2', () => {
      it('returns formatted items', () => {
        expect(
          formatAuthor(['Mark Twain', 'Marcus Aurelius', 'Karl Marx'])
        ).toBe('Mark Twain, Marcus Aurelius, and Karl Marx');
      });
    });
  });
});

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
