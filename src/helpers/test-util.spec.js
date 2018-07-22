import { defineProperty } from './test-util';

describe('defineProperty', () => {
  const key = 'key';
  const value = 'value';
  const object = {
    [key]: 'foo',
  };

  beforeAll(() => {
    jest.spyOn(Object, 'defineProperty');
  });

  afterAll(() => {
    Object.defineProperty.mockRestore();
  });

  it('calls `Object.defineProperty` with arguments', () => {
    expect(Object.defineProperty).not.toHaveBeenCalled();
    defineProperty(object, key, value);
    expect(Object.defineProperty).toHaveBeenCalledWith(object, key, {
      value,
      writable: true,
    });
  });

  it('returns object', () => {
    expect(defineProperty(object, key, value)).toEqual({
      [key]: value,
    });
  });
});
