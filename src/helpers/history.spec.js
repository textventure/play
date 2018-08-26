import createBrowserHistory from 'history/createBrowserHistory';
import browserHistory from './history';

jest.mock('history/createBrowserHistory');

afterAll(() => {
  jest.unmock('history/createBrowserHistory');
});

it('calls createBrowserHistory', () => {
  expect(createBrowserHistory).toHaveBeenCalled();
});

it('returns browserHistory', () => {
  expect(browserHistory).toBe(createBrowserHistory());
});
