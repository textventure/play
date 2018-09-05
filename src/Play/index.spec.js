import React from 'react';
import { shallow } from 'enzyme';
import { getStory } from '../helpers/api';
import browserHistory from '../helpers/history';
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
    browserHistory.location.search = '';
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
    browserHistory.location.search = '';
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
    browserHistory.location.search = '?foo';
    wrapper = shallow(<Play />).dive();
    wrapper.setState({
      isLoading: false,
    });
  });

  afterAll(() => {
    browserHistory.location.search = '';
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
    const currentBranchId = 'branchId';
    props = {
      branches: {
        [currentBranchId]: {
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
      currentBranchId,
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

  it('sets state.currentBranchId with value', () => {
    const branchId = 'branchId';
    wrapper.instance().selectChoice(branchId);
    expect(wrapper.state('currentBranchId')).toBe(branchId);
  });
});

describe('when window.location.search="?url=http://foo.bar"', () => {
  let resolvedValue;

  beforeAll(() => {
    browserHistory.location.search = '?url=http://foo.bar';
  });

  describe('and fetch is successful', () => {
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
      browserHistory.location.search = '?url=http://foo.bar';
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
        expect(wrapper.state('currentBranchId')).toBe(config.start);
      });

      it('sets state.currentBranchId', () => {
        expect(wrapper.state('currentBranchId')).toBe(config.start);
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
          currentBranchId: 'start',
        });
        wrapper.instance().componentDidMount();
      });

      it('does not set state.currentBranchId', () => {
        expect(wrapper.state('currentBranchId')).not.toBe(
          resolvedValue._config.start
        );
        expect(wrapper.state('currentBranchId')).toBe('start');
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
      expect(wrapper.state('branches')).toBe(undefined);
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
    });

    it('calls `getStory` with url', () => {
      expect(getStory).toHaveBeenCalledWith('http://foo.bar');
    });

    it('sets state.isLoading to false', () => {
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

describe('componentDidMount', () => {
  const unlisten = jest.fn();

  beforeAll(() => {
    browserHistory.location.search = '';
    wrapper = shallow(<Play />).dive();
    instance = wrapper.instance();
    jest.spyOn(instance, 'historyListener');
    browserHistory.listen.mockReturnValueOnce(unlisten);
  });

  it('calls `historyListener` with location', () => {
    expect(instance.historyListener).not.toHaveBeenCalled();
    instance.componentDidMount();
    expect(instance.historyListener).toHaveBeenCalledWith(
      browserHistory.location
    );
  });

  it('listens to browser history', () => {
    expect(browserHistory.listen).toHaveBeenCalledWith(
      instance.historyListener
    );
  });

  it('sets `unlisten`', () => {
    expect(instance.unlisten).toBe(unlisten);
  });
});

describe('componentWillUnmount', () => {
  const unlisten = jest.fn();

  beforeAll(() => {
    browserHistory.location.search = '';
    browserHistory.listen.mockReturnValueOnce(unlisten);
    wrapper = shallow(<Play />).dive();
    instance = wrapper.instance();
    jest.spyOn(instance, 'unlisten');
  });

  it('calls `unlisten`', () => {
    instance.componentWillUnmount();
    expect(unlisten).toHaveBeenCalledWith();
  });
});
