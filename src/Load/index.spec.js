import React from 'react';
import { shallow } from 'enzyme';
import { getStory } from '../helpers/api';
import Load from '.';

jest.mock('../helpers/api', () => ({
  getStory: jest.fn(),
}));

let wrapper;
let props;
let state;
let event;

const { URL, URLSearchParams } = window;

beforeAll(() => {
  window.URL = jest.fn();
  window.URLSearchParams = jest.fn();
});

afterAll(() => {
  window.URL = URL;
  window.URLSearchParams = URLSearchParams;
  jest.unmock('../helpers/api');
});

describe('without props', () => {
  beforeAll(() => {
    wrapper = shallow(<Load />);
  });

  it('renders <TextField> with placeholder', () => {
    expect(wrapper.find('TextField').prop('placeholder')).toBe(
      'http://localhost/example.yaml'
    );
  });

  it('renders correctly', () => {
    expect(wrapper.getElement()).toMatchSnapshot();
  });
});

describe('when props.location.search="?url=http://foo.bar"', () => {
  beforeAll(() => {
    window.URLSearchParams.mockImplementation(search => ({
      get: param => {
        if (param === 'url') {
          return search.replace('?url=', '');
        }
      },
    }));
    props = {
      location: {
        search: '?url=http://foo.bar',
      },
    };
    wrapper = shallow(<Load {...props} />);
  });

  it('sets state.value', () => {
    expect(wrapper.state('value')).toBe(
      props.location.search.replace('?url=', '')
    );
  });
});

describe('with state.branches and state.config', () => {
  beforeAll(() => {
    wrapper = shallow(<Load />);
    state = {
      branches: {},
      config: {},
    };
    wrapper.setState(state);
  });

  it('renders <Redirect>', () => {
    expect(wrapper.find('Redirect').length).toBe(1);
  });

  it('redirects to "/play"', () => {
    expect(wrapper.find('Redirect').prop('to')).toEqual({
      ...state,
      pathname: '/play',
      search: 'url=',
    });
  });

  describe('and state.value="http://foo.bar"', () => {
    beforeAll(() => {
      wrapper.setState({
        value: 'http://foo.bar',
      });
    });

    it('renders correctly', () => {
      expect(wrapper.getElement()).toMatchSnapshot();
    });
  });
});

describe('when state.message="Message"', () => {
  beforeAll(() => {
    wrapper = shallow(<Load />);
    state = {
      message: 'Message',
    };
    wrapper.setState(state);
  });

  it('renders <Snackbar> with message', () => {
    expect(wrapper.find('WithStyles(Snackbar)').prop('message')).toBe(
      state.message
    );
  });

  it('renders correctly', () => {
    expect(wrapper.getElement()).toMatchSnapshot();
  });

  it('sets state.message="" when `handleClose` is called', () => {
    wrapper.instance().handleClose();
    expect(wrapper.state('message')).toBe('');
  });
});

describe('when state.value="http://foo.bar"', () => {
  beforeAll(() => {
    wrapper = shallow(<Load />);
    state = {
      value: 'http://foo.bar',
    };
    wrapper.setState(state);
  });

  it('renders <TextField> with value', () => {
    expect(wrapper.find('TextField').prop('value')).toBe(state.value);
  });
});

describe('when state.error="Error"', () => {
  beforeAll(() => {
    wrapper = shallow(<Load />);
    wrapper.setState({
      error: 'Error',
    });
  });

  it('renders <TextField> with error styling', () => {
    expect(wrapper.find('TextField').prop('error')).toBe(true);
  });
});

describe('onChange', () => {
  beforeAll(() => {
    wrapper = shallow(<Load />);
  });

  describe('when value is a url', () => {
    beforeAll(() => {
      event = {
        target: {
          value: 'http://foo.bar',
        },
      };
      wrapper.find('TextField').simulate('change', event);
    });

    it('sets state.value', () => {
      expect(wrapper.state('value')).toBe(event.target.value);
    });

    it('does not set state.error', () => {
      expect(wrapper.state('error')).toBe('');
    });
  });

  describe('when value is not a url', () => {
    beforeAll(() => {
      window.URL.mockImplementation(() => {
        throw new Error();
      });
      event = {
        target: {
          value: 'foo.bar',
        },
      };
      wrapper.find('TextField').simulate('change', event);
    });

    it('sets state.value', () => {
      expect(wrapper.state('value')).toBe(event.target.value);
    });

    it('sets state.error', () => {
      expect(wrapper.state('error')).toBe('Invalid URL');
    });
  });
});

describe('onSubmit', () => {
  let resolvedValue;
  let rejectedValue;

  describe('when successful', () => {
    beforeAll(() => {
      resolvedValue = {
        _config: {},
        branches: {},
      };
      getStory.mockImplementation(
        () => new Promise(resolve => resolve(resolvedValue))
      );

      wrapper = shallow(<Load />);
      state = {
        value: 'http://foo.bar',
      };
      wrapper.setState(state);

      event = {
        preventDefault: jest.fn(),
      };
      wrapper.find('form').simulate('submit', event);
    });

    it('prevents default event', () => {
      expect(event.preventDefault).toHaveBeenCalled();
      event.preventDefault.mockReset();
    });

    it('calls `getStory`', () => {
      expect(getStory).toHaveBeenCalledWith(state.value);
    });

    it('sets state with branches and config', () => {
      const { _config: config, ...branches } = resolvedValue;
      expect(wrapper.state('branches')).toEqual(branches);
      expect(wrapper.state('config')).toEqual(config);
    });

    it('redirects to "/play"', () => {
      wrapper.update();
      const { _config: config, ...branches } = resolvedValue;

      expect(wrapper.find('Redirect').prop('to')).toEqual({
        branches,
        config,
        pathname: '/play',
        search: `url=${encodeURIComponent(state.value)}`,
      });
    });
  });

  describe('with missing properties', () => {
    beforeAll(() => {
      resolvedValue = {};
      getStory.mockImplementation(
        () => new Promise(resolve => resolve(resolvedValue))
      );

      wrapper = shallow(<Load />);
      state = {
        value: 'http://foo.bar',
      };
      wrapper.setState(state);
      wrapper.instance().handleSubmit({ preventDefault: () => {} });
    });

    it('does not set state', () => {
      expect(wrapper.state('branches')).toEqual(null);
      expect(wrapper.state('config')).toEqual(null);
    });

    it('does not redirect to "/play"', () => {
      wrapper.update();
      expect(wrapper.find('Redirect').length).toBe(0);
    });
  });

  describe('when unsuccessful', () => {
    beforeAll(() => {
      rejectedValue = {
        message: 'Error',
      };
      getStory.mockImplementation(
        () => new Promise((resolve, reject) => reject(rejectedValue))
      );

      wrapper = shallow(<Load />);
      state = {
        value: 'http://foo.bar',
      };
      wrapper.setState(state);

      event = {
        preventDefault: jest.fn(),
      };
      wrapper.find('form').simulate('submit', event);
    });

    it('prevents default event', () => {
      expect(event.preventDefault).toHaveBeenCalled();
      event.preventDefault.mockReset();
    });

    it('calls `getStory`', () => {
      expect(getStory).toHaveBeenCalledWith(state.value);
    });

    it('sets state.message', () => {
      expect(wrapper.state('message')).toBe(rejectedValue.message);
    });

    it('renders <Snackbar> with message', () => {
      wrapper.update();
      expect(wrapper.find('WithStyles(Snackbar)').prop('message')).toBe(
        rejectedValue.message
      );
    });
  });
});
