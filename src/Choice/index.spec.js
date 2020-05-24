import React from 'react';
import { shallow } from 'enzyme';
import { Button } from '@material-ui/core';
import history from '../helpers/history';
import Choice from '.';

let instance;
let props;
let wrapper;

jest.mock('../helpers/history', () => ({
  location: {},
  push: jest.fn(),
}));

afterAll(() => {
  jest.unmock('../helpers/history');
});

describe('when props={}', () => {
  beforeAll(() => {
    wrapper = shallow(<Choice />).dive();
  });

  it('renders correctly', () => {
    expect(wrapper.getElement()).toMatchSnapshot();
  });
});

describe('when props.children="foo"', () => {
  beforeAll(() => {
    props = { children: 'foo' };
    wrapper = shallow(<Choice {...props} />).dive();
  });

  it('renders text "foo"', () => {
    expect(wrapper.find(Button).children().text()).toBe('foo');
  });

  it('renders correctly', () => {
    expect(wrapper.getElement()).toMatchSnapshot();
  });
});

describe('when props.className="foo"', () => {
  beforeAll(() => {
    props = { className: 'foo' };
    wrapper = shallow(<Choice {...props} />).dive();
  });

  it('adds className to <Button>', () => {
    expect(wrapper.find(Button).prop('className')).toContain('foo');
  });

  it('renders correctly', () => {
    expect(wrapper.getElement()).toMatchSnapshot();
  });
});

describe('onClick', () => {
  beforeAll(() => {
    wrapper = shallow(<Choice />).dive();
    instance = wrapper.instance();
  });

  it('sets `onClick` on <Button>', () => {
    expect(wrapper.find(Button).prop('onClick')).toBe(instance.onClick);
  });

  it('calls `history.push` with props.choiceId', () => {
    history.location.search = '?id=currentId';
    wrapper.setProps({
      choiceId: 'choiceId',
      currentId: 'currentId',
    });
    instance.onClick();
    expect(history.push).toHaveBeenCalledWith('?id=choiceId');
  });
});
