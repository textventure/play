import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import history from '../helpers/history';

const styles = {
  button: {
    letterSpacing: 'initial',
    textAlign: 'left',
    textTransform: 'none',
  },
};

class Choice extends Component {
  /**
   * Selects choice.
   */
  onClick = () => {
    const { choiceId, currentId } = this.props;
    const search = history.location.search.replace(
      `id=${currentId}`,
      `id=${choiceId}`
    );
    history.push(search);
  };

  render() {
    const { children, className, classes } = this.props;
    return (
      <Button
        className={[classes.button, className].join(' ')}
        color="primary"
        onClick={this.onClick}
      >
        {children}
      </Button>
    );
  }
}

export default withStyles(styles)(Choice);
