import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  button: {
    textAlign: 'left',
    textTransform: 'none',
  },
};

class Choice extends Component {
  /**
   * Selects choice.
   *
   * @param {SyntheticEvent} event
   */
  handleClick = event => {
    const { choiceId, selectChoice } = this.props;
    if (typeof selectChoice === 'function') {
      selectChoice(choiceId);
    }
  };

  render() {
    const { children, className, classes } = this.props;

    return (
      <Button
        className={[classes.button, className].join(' ')}
        color="primary"
        onClick={this.handleClick}
      >
        {children}
      </Button>
    );
  }
}

export default withStyles(styles)(Choice);
