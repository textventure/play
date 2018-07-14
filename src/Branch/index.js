import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '../Card';
import Choice from '../Choice';
import { getKey, getValue } from '../helpers/util';
import render from '../helpers/renderer';

export default class Branch extends Component {
  static defaultProps = {
    classes: {},
    config: {},
  };

  render() {
    const { choices, classes, config, selectChoice, text } = this.props;

    return (
      <Card>
        {text && (
          <Typography
            className={classes.cardContent}
            component="div"
            gutterBottom
          >
            {render(text, config.renderer)}
          </Typography>
        )}

        {choices instanceof Array &&
          choices.map((choice, index) => (
            <Choice
              choiceId={getValue(choice)}
              className={classes.button}
              key={index}
              selectChoice={selectChoice}
            >
              {getKey(choice)}
            </Choice>
          ))}
      </Card>
    );
  }
}
