import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Branch from '../Branch';
import Title from '../Title';
import { getKey, getValue } from '../helpers/util';

const styles = theme => ({
  main: {
    display: 'block', // fix for IE 9-11
  },
  cardContent: {
    marginBottom: theme.spacing.unit * 2, // 16px
  },
  button: {
    textAlign: 'left',
    textTransform: 'none',
  },
});

class Play extends Component {
  state = {
    currentBranchId: null,
  };

  /**
   * Updates next story branch id based on choice.
   *
   * @param {String} branchId
   */
  selectChoice = branchId => {
    this.setState({
      currentBranchId: branchId,
    });
  };

  render() {
    const { classes, location } = this.props;
    const { branches, config } = location;

    if (!branches || !config) {
      return (
        <Redirect
          to={{
            pathname: '/load',
            search: location.search,
          }}
        />
      );
    }

    const { currentBranchId } = this.state;
    const currentBranch = branches[currentBranchId];

    return (
      <main className={classes.main}>
        {/* title */}
        <Title
          classes={classes}
          config={config}
          displayAction={!currentBranchId}
          selectChoice={this.selectChoice}
        />

        {/* story */}
        {currentBranch && (
          <Branch
            classes={classes}
            text={getKey(currentBranch)}
            choices={getValue(currentBranch)}
            selectChoice={this.selectChoice}
          />
        )}
      </main>
    );
  }
}

export default withStyles(styles)(Play);
