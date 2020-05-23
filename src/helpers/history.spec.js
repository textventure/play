import { createBrowserHistory } from 'history';
import browserHistory from './history';

jest.mock('history', () => ({
  createBrowserHistory: jest.fn().mockReturnValue('browserHistory'),
}));

it('calls createBrowserHistory', () => {
  expect(createBrowserHistory).toHaveBeenCalled();
});

it('returns browserHistory', () => {
  expect(browserHistory).toBe(createBrowserHistory());
  expect(browserHistory).toBe('browserHistory');
});
