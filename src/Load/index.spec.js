import React from 'react';
import { shallow } from 'enzyme';
import history from '../helpers/history';
import { defineProperty } from '../helpers/test-util';
import Load from '.';

jest.mock('../helpers/history', () => ({
  push: jest.fn(),
}));

let wrapper;
let instance;
let state;
let event;

const { URL } = window;

beforeAll(() => {
  window.URL = jest.fn();
});

afterAll(() => {
  window.URL = URL;
  jest.unmock('../helpers/history');
});

describe('when props={}', () => {
  beforeAll(() => {
    wrapper = shallow(<Load />);
  });

  it('renders <TextField> with default placeholder', () => {
    expect(wrapper.find('TextField').prop('placeholder')).toBe(
      'http://localhost/demo.yaml'
    );
  });

  it('renders correctly', () => {
    expect(wrapper.getElement()).toMatchSnapshot();
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
  beforeAll(() => {
    wrapper = shallow(<Load />);
    instance = wrapper.instance();
    state = { value: 'http://foo.bar' };
    wrapper.setState(state);
    event = { preventDefault: jest.fn() };
    instance.onSubmit(event);
  });

  it('sets `onSubmit` on form', () => {
    expect(wrapper.find('form').prop('onSubmit')).toBe(instance.onSubmit);
  });

  it('calls `event.preventDefault`', () => {
    expect(event.preventDefault).toHaveBeenCalledWith();
  });

  it('calls `history.push` with state.value', () => {
    expect(history.push).toHaveBeenCalledWith(
      `?url=${encodeURIComponent(state.value)}`
    );
  });
});

describe('when location.origin="http://foo.bar" and process.env.PUBLIC_URL="/play"', () => {
  const { origin } = window.location;
  const { PUBLIC_URL } = process.env;

  beforeAll(() => {
    jest.resetModules();
    defineProperty(window.location, 'origin', 'http://foo.bar');
    process.env.PUBLIC_URL = '/play';
    const Load = require('.').default;
    wrapper = shallow(<Load />);
  });

  afterAll(() => {
    defineProperty(window.location, 'origin', origin);
    process.env.PUBLIC_URL = PUBLIC_URL;
  });

  it('renders <TextField> with correct placeholder', () => {
    expect(wrapper.find('TextField').prop('placeholder')).toBe(
      'http://foo.bar/play/demo.yaml'
    );
  });
});
