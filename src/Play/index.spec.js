import React from 'react';
import { shallow } from 'enzyme';
import Play from '.';

let props;
let wrapper;

describe('with props', () => {
  beforeAll(() => {
    props = {
      branches: {
        start: {
          text: ['choice1', 'choice2'],
        },
      },
      config: {},
      id: 'start',
    };
    wrapper = shallow(<Play {...props} />);
  });

  it('renders correctly', () => {
    expect(wrapper.getElement()).toMatchSnapshot();
  });
});
