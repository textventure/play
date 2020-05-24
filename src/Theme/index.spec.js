import React from 'react';
import { shallow } from 'enzyme';
import { MuiThemeProvider } from '@material-ui/core';
import Theme from '.';

let wrapper;
let props;

describe('when props.children="children"', () => {
  beforeAll(() => {
    props = {
      children: 'children',
    };
    wrapper = shallow(<Theme {...props} />);
  });

  it('renders <MuiThemeProvider>', () => {
    expect(wrapper.find(MuiThemeProvider).length).toBe(1);
  });

  it('renders "children"', () => {
    expect(wrapper.find(MuiThemeProvider).prop('children')).toBe(
      props.children
    );
  });

  it('renders correctly', () => {
    expect(wrapper.getElement()).toMatchSnapshot();
  });
});
