import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import App from '.';

let root;

afterAll(() => {
  ReactDOM.unmountComponentAtNode(root);
});

it('renders without crashing', () => {
  root = document.createElement('div');
  ReactDOM.render(<App />, root);
});

it('renders correctly', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.getElement()).toMatchSnapshot();
});
