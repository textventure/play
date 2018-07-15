import React from 'react';
import { shallow } from 'enzyme';
import Title from '.';

let wrapper;

describe('without props', () => {
  it('renders without error', () => {
    expect(() => (wrapper = shallow(<Title />))).not.toThrow();
  });

  it('renders correctly', () => {
    expect(wrapper.getElement()).toMatchSnapshot();
  });
});

describe('with props', () => {
  const props = {
    classes: {
      button: 'button',
      cardContent: 'cardContent',
    },
    config: {
      author: 'Author',
      description: 'Description',
      title: 'Title',
      start: { Start: 'start' },
    },
    displayAction: true,
    selectChoice: Function,
  };

  beforeAll(() => {
    wrapper = shallow(<Title {...props} />);
  });

  it('renders correctly', () => {
    expect(wrapper.getElement()).toMatchSnapshot();
  });

  it('passes props.selectChoice to <Choice>', () => {
    expect(wrapper.find('WithStyles(Choice)').prop('selectChoice')).toBe(
      props.selectChoice
    );
  });
});
