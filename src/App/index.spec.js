import React from 'react';
import { shallow } from 'enzyme';
import { LinearProgress } from '@material-ui/core';
import { getStory } from '../helpers/api';
import history from '../helpers/history';
import App, { defaultConfig, initialState } from '.';

jest.mock('../helpers/api', () => ({
  getStory: jest.fn(),
}));

jest.mock('../helpers/history', () => ({
  location: {},
  listen: jest.fn(),
  push: jest.fn(),
}));

let instance;
let state;
let wrapper;

afterAll(() => {
  jest.unmock('../helpers/api');
  jest.unmock('../helpers/history');
});

describe('when props={}', () => {
  beforeAll(() => {
    history.location = { search: '' };
    wrapper = shallow(<App />).dive();
  });

  it('renders <Load>', () => {
    expect(wrapper.find('Load')).toHaveLength(1);
  });

  it('renders correctly', () => {
    expect(wrapper.getElement()).toMatchSnapshot();
  });
});

describe('when state.branches={} and state.isLoading=true', () => {
  beforeAll(() => {
    history.location = { search: '' };
    wrapper = shallow(<App />).dive();
    wrapper.setState({ isLoading: true });
  });

  it('renders <LinearProgress>', () => {
    expect(wrapper.find(LinearProgress)).toHaveLength(1);
  });

  it('renders correctly', () => {
    expect(wrapper.getElement()).toMatchSnapshot();
  });
});

describe('with state.branches', () => {
  beforeAll(() => {
    state = {
      branches: {
        id: {
          Text: [{ 'Choice text': 'choice' }],
        },
      },
      config: {},
      id: 'id',
    };
    wrapper = shallow(<App />).dive();
    wrapper.setState(state);
  });

  it('renders <Play>', () => {
    expect(wrapper.find('Play')).toHaveLength(1);
  });

  it('renders correctly', () => {
    expect(wrapper.getElement()).toMatchSnapshot();
  });
});

describe('selectChoice', () => {
  beforeAll(() => {
    wrapper = shallow(<App />).dive();
    instance = wrapper.instance();
    jest.spyOn(instance, 'setState');
  });

  it('has default state.id', () => {
    expect(instance.setState).not.toHaveBeenCalled();
    expect(wrapper.state('id')).toBe(defaultConfig.start);
  });

  it('sets state.id with value', () => {
    wrapper.instance().selectChoice('next');
    expect(instance.setState).toHaveBeenCalled();
    expect(wrapper.state('id')).toBe('next');
  });
});

describe('historyListener', () => {
  beforeAll(() => {
    history.location = { search: '' };
    getStory.mockReturnValue(Promise.resolve());
    wrapper = shallow(<App />).dive();
    instance = wrapper.instance();
    jest.spyOn(instance, 'loadStory').mockReturnValueOnce();
    jest.spyOn(instance, 'setState');
  });

  beforeEach(() => {
    instance.loadStory.mockClear();
    instance.setState.mockClear();
  });

  afterAll(() => {
    history.location = {};
  });

  describe('when location.search=""', () => {
    const search = '';

    it('sets state to initialState', () => {
      instance.historyListener({ search });
      expect(instance.setState).toHaveBeenCalledWith(initialState);
      expect(wrapper.state()).toEqual(initialState);
    });

    it('does not call `loadStory`', () => {
      instance.historyListener({ search });
      expect(instance.loadStory).not.toHaveBeenCalled();
    });
  });

  describe('when hasLoaded=true', () => {
    beforeAll(() => {
      instance.hasLoaded = true;
    });

    describe('and location.search="?url=http://localhost"', () => {
      const search = '?url=http://localhost';

      it('does not call `loadStory`', () => {
        instance.historyListener({ search });
        expect(instance.loadStory).not.toHaveBeenCalled();
      });
    });

    describe('and location.search="?url=http://localhost&id=start"', () => {
      it('does not set state.id when id === state.id', () => {
        wrapper.setState({ id: initialState.id });
        instance.setState.mockClear();
        instance.historyListener({
          search: `?url=http://localhost&id=${initialState.id}`,
        });
        expect(instance.setState).not.toHaveBeenCalled();
      });

      it('sets state.id when id !== state.id', () => {
        wrapper.setState({ id: 'start' });
        instance.setState.mockClear();
        instance.historyListener({ search: '?url=http://localhost&id=next' });
        expect(instance.setState).toHaveBeenCalledWith({ id: 'next' });
        expect(wrapper.state('id')).toBe('next');
      });
    });
  });

  describe('when hasLoaded=false and location.search="?url=http://localhost"', () => {
    const url = 'http://localhost';
    const location = { search: `?url=${url}` };

    beforeAll(() => {
      instance.hasLoaded = false;
    });

    it('calls `loadStory` with url', () => {
      instance.historyListener(location);
      expect(instance.loadStory).toHaveBeenCalledWith(url, { url });
    });
  });
});

describe('loadStory', () => {
  const url = 'http://localhost';

  beforeAll(() => {
    history.location = { search: '' };
    wrapper = shallow(<App />).dive();
    instance = wrapper.instance();
    jest.spyOn(instance, 'setState');
  });

  afterAll(() => {
    getStory.mockReset();
    history.push.mockReset();
  });

  describe('when first argument is passed', () => {
    beforeAll(() => {
      getStory.mockClear();
      getStory.mockReturnValueOnce(Promise.resolve());
      history.push.mockClear();
      instance.hasLoaded = false;
      instance.setState.mockClear();
      return instance.loadStory(url);
    });

    it('calls `getStory` with url', () => {
      expect(getStory).toHaveBeenCalledWith(url);
    });
  });

  describe('when fetch is resolved', () => {
    const branches = {
      id: { Text: ['Choice1', 'Choice2'] },
    };

    beforeEach(() => {
      getStory.mockClear();
      getStory.mockReturnValueOnce(
        Promise.resolve({
          _config: {},
          ...branches,
        })
      );
      history.push.mockClear();
      instance.hasLoaded = false;
      instance.setState.mockClear();
      return instance.loadStory(url);
    });

    it('sets hasLoaded=true', () => {
      expect(instance.hasLoaded).toBe(true);
    });

    it('sets state with branches, config, id, and isLoading', () => {
      expect(instance.setState).toHaveBeenCalledWith({
        branches,
        config: defaultConfig,
        isLoading: false,
        id: defaultConfig.start,
      });
    });

    it('calls history.push with id', () => {
      expect(history.push).toHaveBeenCalledWith('?id=' + defaultConfig.start);
    });
  });

  describe('when fetch is resolved and search="?url=http://localhost"', () => {
    const config = { start: 'next' };

    beforeAll(() => {
      getStory.mockClear();
      getStory.mockReturnValueOnce(
        Promise.resolve({
          _config: config,
        })
      );
      history.push.mockClear();
      instance.hasLoaded = false;
      instance.setState.mockClear();
      return instance.loadStory(url, { url });
    });

    it('sets state with branches, config, id, and isLoading', () => {
      expect(instance.setState).toHaveBeenCalledWith({
        branches: {},
        config: {
          ...defaultConfig,
          ...config,
        },
        id: config.start,
        isLoading: false,
      });
    });

    it('calls history.push with id', () => {
      expect(history.push).toHaveBeenCalledWith(
        `?url=${encodeURIComponent('http://localhost')}&id=${config.start}`
      );
    });
  });

  describe('when fetch is resolved and search="?id=start"', () => {
    const config = { start: 'next' };
    const id = 'start';

    beforeAll(() => {
      getStory.mockClear();
      getStory.mockReturnValueOnce(
        Promise.resolve({
          _config: config,
        })
      );
      history.push.mockClear();
      instance.hasLoaded = false;
      instance.setState.mockClear();
      wrapper.setState({ id });
      return instance.loadStory(url, { id });
    });

    it('sets state with branches, config, id, and isLoading', () => {
      expect(instance.setState).toHaveBeenCalledWith({
        branches: {},
        config: {
          ...defaultConfig,
          ...config,
        },
        id,
        isLoading: false,
      });
    });

    it('does not call history.push', () => {
      expect(history.push).not.toHaveBeenCalled();
    });
  });

  describe('when fetch is resolved with empty object', () => {
    beforeAll(() => {
      getStory.mockClear();
      getStory.mockReturnValueOnce(Promise.resolve({}));
      history.push.mockClear();
      instance.hasLoaded = false;
      instance.setState.mockClear();
      return instance.loadStory(url);
    });

    it('sets hasLoaded=true', () => {
      expect(instance.hasLoaded).toBe(true);
    });

    it('sets state.isLoading=false', () => {
      expect(instance.setState).toHaveBeenCalledWith({ isLoading: false });
    });
  });

  describe('when fetch is resolved with invalid value', () => {
    beforeAll(() => {
      getStory.mockClear();
      getStory.mockReturnValueOnce(Promise.resolve());
      history.push.mockClear();
      instance.hasLoaded = false;
      instance.setState.mockClear();
      return instance.loadStory(url);
    });

    it('sets hasLoaded=false', () => {
      expect(instance.hasLoaded).toBe(false);
    });

    it('calls `setState`', () => {
      expect(instance.setState).toHaveBeenCalledWith(
        { isLoading: false },
        expect.any(Function)
      );
    });

    it('sets state.isLoading=false', () => {
      expect(wrapper.state('isLoading')).toBe(false);
    });

    it('calls history.push with empty string', () => {
      expect(history.push).toHaveBeenCalledWith('');
    });
  });

  describe('when fetch is rejected', () => {
    beforeAll(() => {
      getStory.mockClear();
      getStory.mockReturnValueOnce(Promise.reject());
      history.push.mockClear();
      instance.hasLoaded = false;
      instance.setState.mockClear();
      return instance.loadStory(url);
    });

    it('sets hasLoaded=false', () => {
      expect(instance.hasLoaded).toBe(false);
    });

    it('calls `setState`', () => {
      expect(instance.setState).toHaveBeenCalledWith(
        { isLoading: false },
        expect.any(Function)
      );
    });

    it('sets state.isLoading=false', () => {
      expect(wrapper.state('isLoading')).toBe(false);
    });

    it('calls history.push with empty string', () => {
      expect(history.push).toHaveBeenCalledWith('');
    });
  });
});

describe('componentDidMount', () => {
  const unlisten = jest.fn();

  beforeAll(() => {
    history.location = { search: '' };
    wrapper = shallow(<App />).dive();
    instance = wrapper.instance();
    jest.spyOn(instance, 'historyListener');
    history.listen.mockReturnValueOnce(unlisten);
  });

  it('calls `historyListener` with location', () => {
    expect(instance.historyListener).not.toHaveBeenCalled();
    instance.componentDidMount();
    expect(instance.historyListener).toHaveBeenCalledWith(history.location);
  });

  it('listens to browser history', () => {
    expect(history.listen).toHaveBeenCalledWith(instance.historyListener);
  });

  it('sets `unlisten`', () => {
    expect(instance.unlisten).toBe(unlisten);
  });
});

describe('componentWillUnmount', () => {
  const unlisten = jest.fn();

  beforeAll(() => {
    history.location = { search: '' };
    history.listen.mockReturnValueOnce(unlisten);
    wrapper = shallow(<App />).dive();
    instance = wrapper.instance();
    jest.spyOn(instance, 'unlisten');
  });

  afterAll(() => {
    history.location = {};
  });

  it('calls `unlisten`', () => {
    instance.componentWillUnmount();
    expect(unlisten).toHaveBeenCalledWith();
  });
});
