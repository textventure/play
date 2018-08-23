import React from 'react';
import { shallow } from 'enzyme';
import Branch from '.';

let wrapper;
let props;

describe('when props={}', () => {
  beforeAll(() => {
    wrapper = shallow(<Branch />).dive();
  });

  it('renders correctly', () => {
    expect(wrapper.getElement()).toMatchSnapshot();
  });
});

describe('when props.text="text"', () => {
  beforeAll(() => {
    wrapper = shallow(<Branch text="text" />).dive();
  });

  it('renders correctly', () => {
    expect(wrapper.getElement()).toMatchSnapshot();
  });

  describe('and props.config.renderer="text"', () => {
    beforeAll(() => {
      wrapper.setProps({
        config: {
          renderer: 'text',
        },
      });
    });

    it('renders correctly', () => {
      expect(wrapper.getElement()).toMatchSnapshot();
    });
  });
});

describe('with props.choices and props.selectChoice', () => {
  beforeAll(() => {
    props = {
      choices: [{ key1: 'value1' }, { key2: 'value2' }],
      selectChoice: Function,
    };
    wrapper = shallow(<Branch {...props} />).dive();
  });

  it('renders correctly', () => {
    expect(wrapper.getElement()).toMatchSnapshot();
  });

  it('passes props.selectChoice to <Choice>', () => {
    wrapper.find('Choice').forEach(choice => {
      expect(choice.prop('selectChoice')).toBe(props.selectChoice);
    });
  });
});
