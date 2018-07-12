import React from 'react';
import { shallow } from 'enzyme';
import { getStory } from '../helpers/api';
import Play from '.';

jest.mock('../helpers/api', () => ({
  getStory: jest.fn(),
}));

let wrapper;
let props;

afterAll(() => {
  jest.unmock('../helpers/api');
});

describe('when props={}', () => {
  beforeAll(() => {
    wrapper = shallow(<Play />).dive();
  });

  it('renders <LinearProgress>', () => {
    expect(wrapper.find('WithStyles(LinearProgress)').length).toBe(1);
  });

  it('renders correctly', () => {
    expect(wrapper.getElement()).toMatchSnapshot();
  });
});

describe('when props={} and state.isLoading=false', () => {
  beforeAll(() => {
    wrapper = shallow(<Play />).dive();
    wrapper.setState({
      isLoading: false,
    });
  });

  it('renders <Redirect>', () => {
    expect(wrapper.find('Redirect').length).toBe(1);
  });

  it('renders correctly', () => {
    expect(wrapper.getElement()).toMatchSnapshot();
  });
});

describe('when props.location.search="?foo" and state.isLoading=false', () => {
  beforeAll(() => {
    props = {
      location: {
        search: '?foo',
      },
    };
    wrapper = shallow(<Play {...props} />).dive();
    wrapper.setState({
      isLoading: false,
    });
  });

  it('redirects to `/load` with query string', () => {
    expect(wrapper.find('Redirect').prop('to')).toEqual({
      pathname: '/load',
      search: props.location.search,
    });
  });
});

describe('when props.location.config={}, props.location.branches={}, and state.isLoading=false', () => {
  beforeAll(() => {
    props = {
      location: {
        branches: {},
        config: {},
      },
    };
    wrapper = shallow(<Play {...props} />).dive();
    wrapper.setState({
      isLoading: false,
    });
  });

  it('renders <Title>', () => {
    expect(wrapper.find('Title').length).toBe(1);
  });

  it('does not render <Branch>', () => {
    expect(wrapper.find('Branch').length).toBe(0);
  });

  it('renders correctly', () => {
    expect(wrapper.getElement()).toMatchSnapshot();
  });
});

describe('with props.location.branches, state.currentBranchId, and state.isLoading=false', () => {
  beforeAll(() => {
    const currentBranchId = 'branchId';
    props = {
      location: {
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
      },
    };
    wrapper = shallow(<Play {...props} />).dive();
    wrapper.setState({
      currentBranchId,
      isLoading: false,
    });
  });

  it('renders <Branch>', () => {
    expect(wrapper.find('Branch').length).toBe(1);
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

describe('when props.location.search="?url=http://foo.bar"', () => {
  const { URLSearchParams } = window;
  let resolvedValue;

  beforeAll(() => {
    window.URLSearchParams = jest.fn(search => ({
      get: param => {
        const match = search.match(new RegExp(param + '=(.+)'));
        if (match && match.length) {
          return match[1];
        }
      },
    }));

    props = {
      location: {
        search: '?url=http://foo.bar',
      },
    };
  });

  afterAll(() => {
    window.URLSearchParams = URLSearchParams;
  });

  describe('and fetch is successful', () => {
    beforeAll(() => {
      resolvedValue = {
        _config: {},
        branches: {},
      };
      getStory.mockImplementation(
        () => new Promise(resolve => resolve(resolvedValue))
      );

      wrapper = shallow(<Play {...props} />).dive();
    });

    it('calls `getStory` with url', () => {
      expect(getStory).toHaveBeenCalledWith('http://foo.bar');
    });

    it('sets state.isLoading to false', () => {
      expect(wrapper.state('isLoading')).toBe(false);
    });

    it('sets state.branches and state.config', () => {
      const { _config: config, ...branches } = resolvedValue;
      expect(wrapper.state('branches')).toEqual(branches);
      expect(wrapper.state('config')).toEqual(config);
    });
  });

  describe('and fetch responds with nothing', () => {
    beforeAll(() => {
      resolvedValue = {};
      getStory.mockImplementation(
        () => new Promise(resolve => resolve(resolvedValue))
      );

      wrapper = shallow(<Play {...props} />).dive();
    });

    it('calls `getStory` with url', () => {
      expect(getStory).toHaveBeenCalledWith('http://foo.bar');
    });

    it('sets state.isLoading to false', () => {
      expect(wrapper.state('isLoading')).toBe(false);
    });

    it('does not set state.branches and state.config', () => {
      expect(wrapper.state('branches')).toBe(undefined);
      expect(wrapper.state('config')).toBe(undefined);
    });
  });

  describe('and fetch is unsuccessful', () => {
    beforeAll(() => {
      getStory.mockImplementation(
        () => new Promise((resolve, reject) => reject())
      );

      wrapper = shallow(<Play {...props} />).dive();
    });

    it('calls `getStory` with url', () => {
      expect(getStory).toHaveBeenCalledWith('http://foo.bar');
    });

    it('sets state.isLoading to false', () => {
      expect(wrapper.state('isLoading')).toBe(false);
    });

    it('does not set state.branches and state.config', () => {
      expect(wrapper.state('branches')).toBe(undefined);
      expect(wrapper.state('config')).toBe(undefined);
    });
  });
});
