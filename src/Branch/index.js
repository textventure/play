import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Card from '../Card';
import Typography from '@material-ui/core/Typography';
import { getKey, getValue } from '../helpers/util';

export default class Branch extends Component {
  static defaultProps = {
    classes: {},
  };

  render() {
    const { classes, text, choices, selectChoice } = this.props;
    const hasSelectChoice = typeof selectChoice === 'function';

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
            <Button
              className={classes.button}
              color="primary"
              key={index}
              onClick={
                hasSelectChoice
                  ? selectChoice.bind(null, getValue(choice))
                  : undefined
              }
            >
              {getKey(choice)}
            </Button>
          ))}
      </Card>
    );
  }
}
