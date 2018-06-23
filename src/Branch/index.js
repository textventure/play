import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '../Card';
import Choice from '../Choice';
import { getKey, getValue } from '../helpers/util';

export default class Branch extends Component {
  static defaultProps = {
    classes: {},
  };

  render() {
    const { classes, text, choices, selectChoice } = this.props;

    return (
      <Card>
        {text && (
          <Typography
            className={classes.cardContent}
            component="p"
            gutterBottom
          >
            {text}
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
