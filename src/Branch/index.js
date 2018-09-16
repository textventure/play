import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '../Card';
import Choice from '../Choice';
import { getKey, getValue } from '../helpers/util';
import render from '../helpers/renderer';

export const branchClass = 'branch';

/**
 * @param  {Object} theme
 * @return {Object}
 */
const styles = theme => {
  const { spacing, typography } = theme;
  return {
    choices: {
      marginTop: typography.pxToRem(spacing.unit * 2),
    },
  };
};

class Branch extends Component {
  static defaultProps = {
    config: {},
  };

  render() {
    const {
      choices,
      classes,
      config: { renderer },
      id,
      text,
      selectChoice,
    } = this.props;

    return (
      <Card>
        <div className={branchClass}>
          {text && render(text, renderer, renderer === 'text' ? 'p' : 'div')}
        </div>

        {choices instanceof Array && (
          <div className={classes.choices}>
            {choices.map((choice, index) => (
              <Choice
                choiceId={getValue(choice)}
                currentId={id}
                key={index}
                selectChoice={selectChoice}
              >
                {render(getKey(choice), renderer, 'span')}
              </Choice>
            ))}
          </div>
        )}
      </Card>
    );
  }
}

export default withStyles(styles)(Branch);
