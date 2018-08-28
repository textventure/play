import createBrowserHistory from 'history/createBrowserHistory';
import browserHistory from './history';

jest.mock('history/createBrowserHistory', () =>
  jest.fn().mockReturnValue('browserHistory')
);

afterAll(() => {
  jest.unmock('history/createBrowserHistory');
});

it('calls createBrowserHistory', () => {
  expect(createBrowserHistory).toHaveBeenCalled();
});

it('returns browserHistory', () => {
  expect(browserHistory).toBe(createBrowserHistory());
  expect(browserHistory).toBe('browserHistory');
});
