import React from 'react';
import { shallow } from 'enzyme';
import App from '.';
import Load from '../Load';
import Play from '../Play';

let wrapper;

beforeAll(() => {
  wrapper = shallow(<App />).dive();
});

it('renders <Load> when path="/"', () => {
  expect(wrapper.find({ path: '/' }).prop('component')).toBe(Load);
});

it('renders <Load> when path="/load"', () => {
  expect(wrapper.find({ path: '/load' }).prop('component')).toBe(Load);
});

it('renders <Play> when path="/play"', () => {
  expect(wrapper.find({ path: '/play' }).prop('component')).toBe(Play);
});

it('renders correctly', () => {
  expect(wrapper.getElement()).toMatchSnapshot();
});
