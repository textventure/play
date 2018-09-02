const { jsyaml } = window;

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
});

afterAll(() => {
  document.getElementById.mockRestore();
  document.fetch.mockRestore();
  window.jsyaml = jsyaml;
});

it('renders correctly', () => {
  expect(() => {
    require('.');
  }).not.toThrow();
});
