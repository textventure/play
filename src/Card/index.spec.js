import React from 'react';
import { shallow } from 'enzyme';
import Card from '.';

let wrapper;

describe('when props.children="foo"', () => {
  beforeAll(() => {
    wrapper = shallow(<Card>foo</Card>);
  });

  it('renders correctly', () => {
    expect(wrapper.getElement()).toMatchSnapshot();
  });
});
