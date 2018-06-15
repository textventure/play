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
  it('returns first key from object', () => {
    expect(getKey({ key: 'value' })).toBe('key');
    expect(getKey({ one: 1, two: 2 })).toBe('one');
  });
});

describe('getValue', () => {
  it('returns first value from object', () => {
    expect(getValue({ key: 'value' })).toBe('value');
    expect(getValue({ one: 1, two: 2 })).toBe(1);
  });
});
