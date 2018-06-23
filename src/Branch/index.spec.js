import React from 'react';
import { shallow } from 'enzyme';
import Branch from '.';

let wrapper;

describe('with props', () => {
  const props = {
    text: 'text',
    classes: {
      button: 'button',
      cardContent: 'cardContent',
    },
    choices: [{ key1: 'value1' }, { key2: 'value2' }],
    selectChoice: Function,
  };

  beforeAll(() => {
    wrapper = shallow(<Branch {...props} />);
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
