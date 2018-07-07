import React from 'react';
import { shallow } from 'enzyme';
import Card from '.';

let wrapper;
let props;

describe('when props.children="foo"', () => {
  beforeAll(() => {
    props = {
      children: 'foo',
    };
    wrapper = shallow(<Card {...props} />).dive();
  });

  it('renders correctly', () => {
    expect(wrapper.getElement()).toMatchSnapshot();
  });
});
