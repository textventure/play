import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  paper: {
    margin: theme.spacing.unit * 2, // 16px
    padding: theme.spacing.unit * 3, // 24px
    whiteSpace: 'pre-line', // respect newlines in text
  },
});

class Card extends Component {
  render() {
    const { children, classes } = this.props;
    return <Paper className={classes.paper}>{children}</Paper>;
  }
}

export default withStyles(styles)(Card);
