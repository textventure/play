import React from 'react';
import render from './renderer';

describe('when format=undefined', () => {
  it('returns original string', () => {
    expect(render('foo')).toBe('foo');
  });
});

describe('when format="text"', () => {
  it('returns original string', () => {
    expect(render('foo', 'text')).toBe('foo');
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
});
