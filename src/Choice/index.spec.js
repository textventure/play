import React from 'react';
import { shallow } from 'enzyme';
import Choice from '.';

let wrapper;

describe('with props', () => {
  beforeAll(() => {
    wrapper = shallow(
      <Choice
        children="text"
        choiceId="1337"
        className="classy"
        selectChoice={Function}
      />
    );
  });

  it('renders correctly', () => {
    expect(wrapper.getElement()).toMatchSnapshot();
  });

  describe('when props.selectChoice=Function"', () => {
    beforeAll(() => {
      wrapper.setProps({ selectChoice: jest.fn() });
    });

    it('calls props.selectChoice with props.choiceId when clicked', () => {
      const { props } = wrapper.instance();
      expect(props.selectChoice).not.toHaveBeenCalled();
      wrapper.simulate('click');
      expect(props.selectChoice).toHaveBeenCalledWith(props.choiceId);
    });
  });

  describe('when props.selectChoice=null', () => {
    beforeAll(() => {
      wrapper.setProps({ selectChoice: null });
    });

    it('does not throw when clicked', () => {
      expect(() => wrapper.instance().handleClick()).not.toThrow();
    });
  });
});
