import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

export default class Choice extends Component {
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
    const { className, children } = this.props;
    return (
      <Button className={className} color="primary" onClick={this.handleClick}>
        {children}
      </Button>
    );
  }
}
