import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Card from '../Card';
import Typography from '@material-ui/core/Typography';
import { getKey, getValue } from '../helpers/util';

export default class Branch extends Component {
  render() {
    const { classes, text, choices, selectChoice } = this.props;
    return (
      <Card>
        <Typography className={classes.cardContent} component="p" gutterBottom>
          {text}
        </Typography>

        {choices.map((choice, index) => (
          <Button
            className={classes.button}
            color="primary"
            key={index}
            onClick={selectChoice.bind(null, getValue(choice))}
          >
            {getKey(choice)}
          </Button>
        ))}
      </Card>
    );
  }
}
