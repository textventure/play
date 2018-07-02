import React from 'react';
import { shallow } from 'enzyme';
import Play from '.';

let wrapper;
let props;

describe('without props', () => {
  beforeAll(() => {
    wrapper = shallow(<Play />).dive();
  });

  it('renders <Redirect>', () => {
    expect(wrapper.find('Redirect').length).toBe(1);
  });

  it('renders correctly', () => {
    expect(wrapper.getElement()).toMatchSnapshot();
  });
});

describe('when props.location.search="?foo"', () => {
  beforeAll(() => {
    props = {
      location: {
        search: '?foo',
      },
    };
    wrapper = shallow(<Play {...props} />).dive();
  });

  it('redirects to `/load` with query string', () => {
    expect(wrapper.find('Redirect').prop('to')).toEqual({
      pathname: '/load',
      search: props.location.search,
    });
  });
});

describe('when props.location.config={} and props.location.branches={}', () => {
  beforeAll(() => {
    props = {
      location: {
        branches: {},
        config: {},
      },
    };
    wrapper = shallow(<Play {...props} />).dive();
  });

  it('renders <Title>', () => {
    expect(wrapper.find('Title').length).toBe(1);
  });

  it('does not render <Branch>', () => {
    expect(wrapper.find('Branch').length).toBe(0);
  });

  it('renders correctly', () => {
    expect(wrapper.getElement()).toMatchSnapshot();
  });
});

describe('with props.location.branches and state.currentBranchId', () => {
  beforeAll(() => {
    const currentBranchId = 'branchId';
    props = {
      location: {
        branches: {
          [currentBranchId]: {
            'Text.': [
              {
                'Choice text.': 'choice',
              },
            ],
          },
        },
        config: {},
      },
    };
    wrapper = shallow(<Play {...props} />).dive();
    wrapper.setState({
      currentBranchId,
    });
  });

  it('renders <Branch>', () => {
    expect(wrapper.find('Branch').length).toBe(1);
  });

  it('renders correctly', () => {
    expect(wrapper.getElement()).toMatchSnapshot();
  });
});

describe('when selectChoice is invoked', () => {
  beforeAll(() => {
    wrapper = shallow(<Play />).dive();
  });

  it('sets state.currentBranchId with value', () => {
    const branchId = 'branchId';
    wrapper.instance().selectChoice(branchId);
    expect(wrapper.state('currentBranchId')).toBe(branchId);
  });
});
