import React from 'react';
import { shallow } from 'enzyme';
import Card from '.';

let wrapper;

describe('when props.children="foo"', () => {
  beforeAll(() => {
    wrapper = shallow(<Card>foo</Card>).dive();
  });

  it('renders correctly', () => {
    expect(wrapper.getElement()).toMatchSnapshot();
  });
});

describe('when props.className="foo"', () => {
  beforeAll(() => {
    wrapper = shallow(<Card className="foo" />).dive();
  });

  it('renders correctly', () => {
    expect(wrapper.getElement()).toMatchSnapshot();
  });
});
