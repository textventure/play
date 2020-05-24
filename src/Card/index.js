import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

/**
 * Card styles.
 *
 * @param  {Object} theme
 * @return {Object}
 */
const styles = theme => {
  const { spacing } = theme;

  return {
    spacing: {
      margin: spacing(2), // 16px
      padding: spacing(3), // 24px

      // @media (min-width: 600px)
      [theme.breakpoints.up('md')]: {
        margin: spacing(4), // 32px
      },
    },
    'pre-line': {
      // preserve new lines, collapse spaces and tabs, allow text wrapping
      // https://developer.mozilla.org/docs/Web/CSS/white-space
      whiteSpace: 'pre-line',
    },
  };
};

class Card extends Component {
  static defaultProps = {
    whiteSpace: 'pre-line',
  };

  render() {
    const { children, classes, className, whiteSpace } = this.props;

    return (
      <Paper
        className={[classes.spacing, classes[whiteSpace], className].join(' ')}
      >
        {children}
      </Paper>
    );
  }
}

export default withStyles(styles)(Card);
