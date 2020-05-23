const { fetch, jsyaml } = window;

let element = document.createElement('div');

beforeAll(() => {
  jest.spyOn(document, 'getElementById');
  document.getElementById.mockImplementation(() => element);

  window.fetch = jest.fn('fetch');
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
});

afterAll(() => {
  document.getElementById.mockRestore();
  document.fetch = fetch;
  window.jsyaml = jsyaml;
});

it('renders correctly', () => {
  expect(() => {
    require('.');
  }).not.toThrow();
});
