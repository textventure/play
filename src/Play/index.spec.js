import React from 'react';
import { shallow } from 'enzyme';
import { getStory } from '../helpers/api';
import history from '../helpers/history';
import Play, { defaultConfig } from '.';

jest.mock('../helpers/api', () => ({
  getStory: jest.fn(),
}));

jest.mock('../helpers/history', () => ({
  location: {},
  listen: jest.fn(),
}));

let instance;
let props;
let wrapper;

afterAll(() => {
  jest.unmock('../helpers/api');
  jest.unmock('../helpers/history');
});

describe('when props={}', () => {
  beforeAll(() => {
    history.location = { search: '' };
    wrapper = shallow(<Play />).dive();
  });

  it('renders <Load>', () => {
    expect(wrapper.find('Load').length).toBe(1);
  });

  it('renders correctly', () => {
    expect(wrapper.getElement()).toMatchSnapshot();
  });

  describe('and state.isLoading=true', () => {
    beforeAll(() => {
      wrapper.setState({ isLoading: true });
    });

    it('renders <LinearProgress>', () => {
      expect(wrapper.find('WithStyles(LinearProgress)').length).toBe(1);
    });

    it('renders correctly', () => {
      expect(wrapper.getElement()).toMatchSnapshot();
    });
  });
});

describe('when props={} and state.isLoading=false', () => {
  beforeAll(() => {
    wrapper = shallow(<Play />).dive();
    wrapper.setState({
      isLoading: false,
    });
  });

  it('renders <Load>', () => {
    expect(wrapper.find('Load').length).toBe(1);
  });

  it('renders correctly', () => {
    expect(wrapper.getElement()).toMatchSnapshot();
  });
});

describe('when window.location.search="" and state.isLoading=true', () => {
  beforeAll(() => {
    history.location = { search: '' };
    wrapper = shallow(<Play />).dive();
  });

  it('sets isLoading to false', () => {
    expect(wrapper.state('isLoading')).toBe(false);
  });

  it('renders <Load>', () => {
    expect(wrapper.find('Load').length).toBe(1);
  });
});

describe('when window.location.search="?foo" and state.isLoading=false', () => {
  beforeAll(() => {
    history.location = { search: '?foo' };
    wrapper = shallow(<Play />).dive();
    wrapper.setState({
      isLoading: false,
    });
  });

  afterAll(() => {
    history.location = { search: '' };
  });

  it('renders <Load>', () => {
    expect(wrapper.find('Load').length).toBe(1);
  });
});

describe('when props.config={}, props.branches={}, and state.isLoading=false', () => {
  beforeAll(() => {
    props = {
      branches: {},
      config: {},
    };
    wrapper = shallow(<Play {...props} />).dive();
    wrapper.setState({
      isLoading: false,
    });
  });

  it('does not render <Branch>', () => {
    expect(wrapper.find('Branch').length).toBe(0);
  });

  it('renders correctly', () => {
    expect(wrapper.getElement()).toMatchSnapshot();
  });
});

describe('with props and state', () => {
  beforeAll(() => {
    const id = 'branchId';
    props = {
      branches: {
        [id]: {
          'Text.': [
            {
              'Choice text.': 'choice',
            },
          ],
        },
      },
      config: {},
    };

    wrapper = shallow(<Play {...props} />).dive();
    wrapper.setState({
      id,
      isLoading: false,
    });
  });

  it('renders <Branch>', () => {
    expect(wrapper.find('WithStyles(Branch)').length).toBe(1);
  });

  it('renders correctly', () => {
    expect(wrapper.getElement()).toMatchSnapshot();
  });
});

describe('when selectChoice is invoked', () => {
  beforeAll(() => {
    wrapper = shallow(<Play />).dive();
  });

  it('sets state.id with value', () => {
    const branchId = 'branchId';
    wrapper.instance().selectChoice(branchId);
    expect(wrapper.state('id')).toBe(branchId);
  });
});

describe('historyListener', () => {
  beforeAll(() => {
    history.location = { search: '' };
    getStory.mockReturnValue(new Promise(resolve => resolve()));
    wrapper = shallow(<Play />).dive();
    instance = wrapper.instance();
    jest.spyOn(instance, 'loadStory').mockReturnValue();
    jest.spyOn(instance, 'setState');
  });

  afterAll(() => {
    history.location = {};
    getStory.mockReset();
  });

  describe('when hasLoaded=true', () => {
    beforeEach(() => {
      instance.hasLoaded = true;
      instance.loadStory.mockReset();
      instance.setState.mockReset();
    });

    it('does not call `loadStory`', () => {
      instance.historyListener({ search: '' });
      expect(instance.loadStory).not.toHaveBeenCalled();
    });

    describe('and id=undefined', () => {
      it('does not call `setState` with id', () => {
        instance.historyListener({ search: '' });
        expect(instance.setState).not.toHaveBeenCalledWith('startId');
      });
    });

    describe('and id !== state.id', () => {
      it('does not call `setState` with id', () => {
        wrapper.setState({ id: 'fooId' });
        instance.historyListener({ search: '?id=startId' });
        expect(instance.setState).not.toHaveBeenCalledWith('startId');
      });
    });

    describe('and id === state.id', () => {
      it('calls `setState` with id', () => {
        wrapper.setState({ id: 'startId' });
        instance.historyListener({ search: '?id=startId' });
        expect(instance.setState).toHaveBeenCalledWith({ id: 'startId' });
      });
    });
  });

  describe('when hasLoaded=false', () => {
    it('calls `loadStory` with url', () => {
      instance.hasLoaded = false;
      instance.historyListener({ search: '?url=http://foo.bar' });
      expect(instance.loadStory).toHaveBeenCalledWith('http://foo.bar');
    });
  });
});

describe('when location.search="?url=http://foo.bar"', () => {
  let resolvedValue;

  beforeAll(() => {
    history.location = { search: '?url=http://foo.bar' };
  });

  afterAll(() => {
    history.location = {};
  });

  describe('when fetch is successful', () => {
    resolvedValue = {
      _config: {
        start: 'startId',
      },
      branches: {},
    };

    beforeAll(() => {
      getStory.mockImplementationOnce(
        () => new Promise(resolve => resolve(resolvedValue))
      );
      history.location = { search: '?url=http://foo.bar' };
      wrapper = shallow(<Play />).dive();
    });

    it('calls `getStory` with url', () => {
      expect(getStory).toHaveBeenCalledWith('http://foo.bar');
    });

    it('sets state.isLoading to false', () => {
      expect(wrapper.state('isLoading')).toBe(false);
    });

    describe('with _config and branches', () => {
      const { _config: config, ...branches } = resolvedValue;

      it('sets state.branches', () => {
        expect(wrapper.state('branches')).toEqual(branches);
      });

      it('sets state.config', () => {
        expect(wrapper.state('config')).toEqual({
          ...defaultConfig,
          ...config,
        });
        expect(wrapper.state('id')).toBe(config.start);
      });

      it('sets state.id', () => {
        expect(wrapper.state('id')).toBe(config.start);
      });
    });

    describe('when _config.start=undefined', () => {
      const resolvedValue = {
        _config: {},
      };

      beforeAll(() => {
        getStory.mockImplementationOnce(
          () => new Promise(resolve => resolve(resolvedValue))
        );
        // reset state
        wrapper.setState({
          id: 'start',
        });
        wrapper.instance().componentDidMount();
      });

      it('does not set state.id', () => {
        expect(wrapper.state('id')).not.toBe(resolvedValue._config.start);
        expect(wrapper.state('id')).toBe('start');
      });
    });
  });

  describe('and fetch responds with nothing', () => {
    beforeAll(() => {
      resolvedValue = {};
      getStory.mockImplementationOnce(
        () => new Promise(resolve => resolve(resolvedValue))
      );
      wrapper = shallow(<Play />).dive();
    });

    it('calls `getStory` with url', () => {
      expect(getStory).toHaveBeenCalledWith('http://foo.bar');
    });

    it('sets state.isLoading to false', () => {
      expect(wrapper.state('isLoading')).toBe(false);
    });

    it('does not set state.branches', () => {
      expect(wrapper.state('branches')).toEqual({});
    });

    it('does not set state.config', () => {
      expect(wrapper.state('config')).toEqual(defaultConfig);
    });
  });

  describe('and fetch is unsuccessful', () => {
    beforeAll(() => {
      getStory.mockImplementationOnce(
        () => new Promise((resolve, reject) => reject())
      );
      wrapper = shallow(<Play />).dive();
      instance = wrapper.instance();
      jest.spyOn(instance, 'setState');
    });

    it('calls `getStory` with url', () => {
      expect(getStory).toHaveBeenCalledWith('http://foo.bar');
    });

    it('sets state.isLoading=false', () => {
      expect(instance.setState).toHaveBeenCalledWith({ isLoading: false });
      expect(wrapper.state('isLoading')).toBe(false);
    });

    it('does not set state.branches', () => {
      expect(wrapper.state('branches')).toBe(undefined);
    });

    it('does not set state.config', () => {
      expect(wrapper.state('config')).toEqual(defaultConfig);
    });
  });
});

describe('loadStory', () => {
  beforeAll(() => {
    history.location = { search: '' };
    getStory.mockReturnValue(new Promise(resolve => resolve()));
    wrapper = shallow(<Play />).dive();
    instance = wrapper.instance();
    jest.spyOn(instance, 'setState');
  });

  describe('when url=undefined', () => {
    beforeAll(() => {
      getStory.mockReset();
      instance.loadStory();
    });

    it('does not set hasLoaded=true', () => {
      expect(instance.hasLoaded).toBe(undefined);
    });

    it('does not call `getStory`', () => {
      expect(getStory).not.toHaveBeenCalled();
    });

    it('does not call `setState`', () => {
      expect(instance.setState).not.toHaveBeenCalled();
    });
  });

  describe('when url="http://foo.bar"', () => {
    beforeAll(() => {
      getStory.mockReturnValue(new Promise(resolve => resolve()));
      instance.setState.mockReset();
      instance.loadStory('http://foo.bar');
    });

    it('sets hasLoaded=true', () => {
      expect(instance.hasLoaded).toBe(true);
    });

    it('calls `getStory`', () => {
      expect(getStory).toHaveBeenCalledWith('http://foo.bar');
    });

    it('calls `setState`', () => {
      expect(instance.setState).toHaveBeenCalled();
    });
  });
});

describe('componentDidMount', () => {
  const unlisten = jest.fn();

  beforeAll(() => {
    history.location = { search: '' };
    wrapper = shallow(<Play />).dive();
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
    wrapper = shallow(<Play />).dive();
    instance = wrapper.instance();
    jest.spyOn(instance, 'unlisten');
  });

  it('calls `unlisten`', () => {
    instance.componentWillUnmount();
    expect(unlisten).toHaveBeenCalledWith();
  });
});
