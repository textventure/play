import React from 'react';
import { shallow } from 'enzyme';
import Branch from '.';

let wrapper;

describe('when props.text="foo"', () => {
  beforeAll(() => {
    wrapper = shallow(<Branch text="foo" />);
  });

  it('renders correctly', () => {
    expect(wrapper.getElement()).toMatchSnapshot();
  });

  describe('and props.classes.cardContent="cardContent"', () => {
    beforeAll(() => {
      wrapper.setProps({ classes: { cardContent: 'cardContent' } });
    });

    it('renders correctly', () => {
      expect(wrapper.getElement()).toMatchSnapshot();
    });
  });
});

describe('with props.choices', () => {
  beforeAll(() => {
    const props = {
      choices: [{ key: 'value' }],
    };
    wrapper = shallow(<Branch {...props} />);
  });

  it('renders correctly', () => {
    expect(wrapper.getElement()).toMatchSnapshot();
  });

  describe('and props.classes.button="button"', () => {
    beforeAll(() => {
      wrapper.setProps({ classes: { button: 'button' } });
    });

    it('renders correctly', () => {
      expect(wrapper.getElement()).toMatchSnapshot();
    });
  });

  describe('when props.selectChoice is a function', () => {
    beforeAll(() => {
      wrapper.setProps({ selectChoice: jest.fn() });
    });

    it('invokes function with choice when clicked', () => {
      const props = wrapper.instance().props;
      expect(props.selectChoice).not.toHaveBeenCalled();
      wrapper.find('WithStyles(Button)').simulate('click');
      expect(props.selectChoice).toHaveBeenCalledWith('value');
    });
  });

  describe('when props.selectChoice is not a function', () => {
    beforeAll(() => {
      wrapper.setProps({ selectChoice: null });
    });

    it('does not throw when invoked', () => {
      expect(() => wrapper.instance().render()).not.toThrow();
    });
  });
});
