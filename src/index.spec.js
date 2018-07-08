const { jsyaml, URL, URLSearchParams } = window;

let element = document.createElement('div');

beforeAll(() => {
  jest.spyOn(document, 'getElementById');
  document.getElementById.mockImplementation(() => element);

  jest.spyOn(window, 'fetch');
  window.fetch.mockImplementation(
    () =>
      new Promise(resolve =>
        resolve({
          _config: {},
          branches: {},
        })
      )
  );

  window.jsyaml = {
    load: jest.fn(() => ({})),
  };

  window.URL = jest.fn();
  window.URLSearchParams = jest.fn(() => ({ get: () => {} }));
});

afterAll(() => {
  document.getElementById.mockRestore();
  document.fetch.mockRestore();
  window.jsyaml = jsyaml;
  window.URL = URL;
  window.URLSearchParams = URLSearchParams;
});

it('renders correctly', () => {
  expect(() => {
    require('.');
  }).not.toThrow();
});
