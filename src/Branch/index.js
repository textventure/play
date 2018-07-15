import React, { Component } from 'react';
import Card from '../Card';
import Choice from '../Choice';
import { getKey, getValue } from '../helpers/util';
import render from '../helpers/renderer';

export default class Branch extends Component {
  static defaultProps = {
    config: {},
  };

  render() {
    const {
      choices,
      config: { renderer },
      selectChoice,
      text,
    } = this.props;

    return (
      <Card>
        {text && render(text, renderer, renderer === 'text' ? 'p' : 'div')}

        {choices instanceof Array &&
          choices.map((choice, index) => (
            <Choice
              choiceId={getValue(choice)}
              key={index}
              selectChoice={selectChoice}
            >
              {render(getKey(choice), renderer, 'span')}
            </Choice>
          ))}
      </Card>
    );
  }
}
