import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Branch from '../Branch';
import Title from '../Title';
import { getStory } from '../helpers/api';
import { getKey, getValue } from '../helpers/util';

const styles = theme => ({
  progress: {
    marginTop: theme.spacing.unit * 4, // 32px
  },
});

class Play extends Component {
  static defaultProps = {
    location: {},
  };

  constructor(props) {
    super(props);
    const { branches, config } = props.location;

    this.state = {
      branches,
      config,
      currentBranchId: null,
      isLoading: true,
    };
  }

  componentDidMount() {
    try {
      const url = new URLSearchParams(this.props.location.search).get('url');

      getStory(url)
        .then(story => {
          const newState = {
            isLoading: false,
          };

          const { _config: config, ...branches } = story;
          if (config && branches) {
            newState.config = config;
            newState.branches = branches;
          }

          this.setState(newState);
        })
        .catch(error => {
          this.setState({
            isLoading: false,
          });
        });
    } catch (error) {}
  }

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
    const { branches, config, currentBranchId, isLoading } = this.state;

    if (isLoading) {
      return (
        <div className={classes.progress}>
          <LinearProgress />
        </div>
      );
    }

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

    const currentBranch = branches[currentBranchId];

    return (
      <main>
        {/* title */}
        <Title
          config={config}
          displayAction={!currentBranchId}
          selectChoice={this.selectChoice}
        />

        {/* story */}
        {currentBranch && (
          <Branch
            text={getKey(currentBranch)}
            choices={getValue(currentBranch)}
            config={config}
            selectChoice={this.selectChoice}
          />
        )}
      </main>
    );
  }
}

export default withStyles(styles)(Play);
