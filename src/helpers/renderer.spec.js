import React from 'react';
import render from './renderer';

describe('when format=undefined', () => {
  it('returns original string', () => {
    expect(render('foo')).toBe('foo');
  });

  describe('and element="p"', () => {
    it('returns React element with text', () => {
      expect(render('foo', undefined, 'p')).toEqual(<p>foo</p>);
    });
  });
});

describe('when format="text"', () => {
  it('returns original string', () => {
    expect(render('foo', 'text')).toBe('foo');
  });

  describe('and element="div"', () => {
    it('returns React element with text', () => {
      expect(render('foo', undefined, 'div')).toEqual(<div>foo</div>);
    });
  });
});

describe('when format="markdown"', () => {
  const { marked } = window;

  beforeAll(() => {
    window.marked = jest.fn(input => input);
  });

  afterAll(() => {
    window.marked = marked;
  });

  it('calls `window.marked` with string', () => {
    render('foo', 'markdown');
    expect(window.marked).toHaveBeenCalledWith('foo', {
      headerIds: false,
    });
  });

  it('returns React element with innerHTML', () => {
    expect(render('foo', 'markdown')).toEqual(
      <div dangerouslySetInnerHTML={{ __html: 'foo' }} />
    );
  });

  it('removes newlines in output', () => {
    expect(render('foo\n ', 'markdown')).toEqual(
      <div dangerouslySetInnerHTML={{ __html: 'foo' }} />
    );
  });

  describe('and element="span"', () => {
    it('returns React element with innerHTML', () => {
      expect(render('foo', 'html', 'span')).toEqual(
        <span dangerouslySetInnerHTML={{ __html: 'foo' }} />
      );
    });
  });
});

describe('when format="html"', () => {
  it('returns React element with innerHTML', () => {
    expect(render('foo', 'html')).toEqual(
      <div dangerouslySetInnerHTML={{ __html: 'foo' }} />
    );
  });

  it('removes newlines in output', () => {
    expect(render('foo\n ', 'html')).toEqual(
      <div dangerouslySetInnerHTML={{ __html: 'foo' }} />
    );
  });

  describe('and element="span"', () => {
    it('returns React element with innerHTML', () => {
      expect(render('foo', 'html', 'span')).toEqual(
        <span dangerouslySetInnerHTML={{ __html: 'foo' }} />
      );
    });
  });
});
