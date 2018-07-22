import React from 'react';
import { shallow } from 'enzyme';
import App from '.';

let wrapper;

beforeAll(() => {
  wrapper = shallow(<App />).dive();
});

it('renders correctly', () => {
  expect(wrapper.getElement()).toMatchSnapshot();
});
