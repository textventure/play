import { getStory } from './api';

const { fetch, jsyaml } = window;

beforeAll(() => {
  window.fetch = jest.fn();
  window.jsyaml = { load: jest.fn() };
});

afterAll(() => {
  window.fetch = fetch;
  window.jsyaml = jsyaml;
});

describe('getStory', () => {
  describe('when response.ok=false', () => {
    it('throws error with status text', () => {
      window.fetch.mockImplementationOnce(() =>
        Promise.resolve({
          ok: false,
          statusText: 'NOT FOUND',
        })
      );
      return getStory('url').catch(error => {
        expect(error.message).toBe('URL: NOT FOUND');
      });
    });

    it('throws error with status code', () => {
      window.fetch.mockImplementationOnce(() =>
        Promise.resolve({
          ok: false,
          status: 404,
        })
      );
      return getStory('url').catch(error => {
        expect(error.message).toBe('URL: 404');
      });
    });
  });

  describe('when response.ok=true', () => {
    beforeEach(() => {
      window.fetch.mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          text: () => '',
        })
      );
    });

    describe('but text is not yaml', () => {
      it('throws error', () => {
        window.jsyaml.load.mockImplementation(() => {
          throw new Error();
        });
        return getStory('url').catch(error => {
          expect(error.message).toBe('YAML: Unable to parse');
        });
      });
    });

    describe('but yaml is missing values', () => {
      it('throws error', () => {
        window.jsyaml.load.mockImplementation(() => null);
        return getStory('url').catch(error => {
          expect(error.message).toBe('YAML: Missing values');
        });
      });
    });

    describe('and yaml is valid', () => {
      it('returns story', () => {
        const obj = {};
        window.jsyaml.load.mockImplementation(() => obj);
        return getStory('url').then(story => {
          expect(story).toBe(obj);
        });
      });
    });
  });
});
