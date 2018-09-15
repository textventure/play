import React from 'react';
import { shallow } from 'enzyme';
import history from '../helpers/history';
import Choice from '.';

let wrapper;
let instance;
let props;

jest.mock('../helpers/history', () => ({
  location: {},
  push: jest.fn(),
}));

afterAll(() => {
  jest.unmock('../helpers/history');
});

describe('when props={}', () => {
  beforeAll(() => {
    wrapper = shallow(<Choice />).dive();
  });

  it('renders correctly', () => {
    expect(wrapper.getElement()).toMatchSnapshot();
  });
});

describe('when props.children="foo"', () => {
  beforeAll(() => {
    props = { children: 'foo' };
    wrapper = shallow(<Choice {...props} />).dive();
  });

  it('renders text "foo"', () => {
    expect(
      wrapper
        .find('WithStyles(Button)')
        .children()
        .text()
    ).toBe('foo');
  });

  it('renders correctly', () => {
    expect(wrapper.getElement()).toMatchSnapshot();
  });
});

describe('when props.className="foo"', () => {
  beforeAll(() => {
    props = { className: 'foo' };
    wrapper = shallow(<Choice {...props} />).dive();
  });

  it('adds className to <Button>', () => {
    expect(wrapper.find('WithStyles(Button)').prop('className')).toContain(
      'foo'
    );
  });

  it('renders correctly', () => {
    expect(wrapper.getElement()).toMatchSnapshot();
  });
});

describe('onClick', () => {
  beforeAll(() => {
    wrapper = shallow(<Choice />).dive();
    instance = wrapper.instance();
  });

  it('sets `onClick` on <Button>', () => {
    expect(wrapper.find('WithStyles(Button)').prop('onClick')).toBe(
      instance.onClick
    );
  });

  it('calls `history.push` with props.choiceId', () => {
    history.location.search = '?id=currentId';
    wrapper.setProps({
      choiceId: 'choiceId',
      currentId: 'currentId',
    });
    instance.onClick();
    expect(history.push).toHaveBeenCalledWith('?id=choiceId');
  });

  describe('when props.selectChoice=Function"', () => {
    beforeAll(() => {
      wrapper.setProps({ selectChoice: jest.fn() });
    });

    it('calls `props.selectChoice` with props.choiceId when clicked', () => {
      const { props } = wrapper.instance();
      expect(props.selectChoice).not.toHaveBeenCalled();
      wrapper.simulate('click');
      expect(props.selectChoice).toHaveBeenCalledWith(props.choiceId);
    });
  });

  describe('when props.selectChoice=undefined', () => {
    beforeAll(() => {
      wrapper.setProps({ selectChoice: undefined });
    });

    it('does not throw when clicked', () => {
      expect(() => wrapper.instance().onClick()).not.toThrow();
    });
  });
});
