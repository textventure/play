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
  const spacingUnit = theme.spacing.unit;

  return {
    spacing: {
      margin: spacingUnit * 2, // 16px
      padding: spacingUnit * 3, // 24px
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
