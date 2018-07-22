import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Branch from '../Branch';
import Load from '../Load';
import { getStory } from '../helpers/api';
import { getKey, getValue } from '../helpers/util';

export const defaultConfig = {
  renderer: 'text',
  start: 'start',
};

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
      config: {
        ...defaultConfig,
        ...config,
      },
      isLoading: true,
    };
    this.state.currentBranchId = this.state.config.start;
  }

  componentDidMount() {
    try {
      const url = new URLSearchParams(window.location.search).get('url');

      getStory(url)
        .then(story => {
          const newState = {
            isLoading: false,
          };

          const { _config: config, ...branches } = story;
          if (branches && config) {
            newState.branches = branches;
            newState.config = {
              ...defaultConfig,
              ...config,
            };
            // set starting branch id
            if (config.start) {
              newState.currentBranchId = config.start;
            }
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
    const { classes } = this.props;
    const { branches, config, currentBranchId, isLoading } = this.state;

    if (isLoading) {
      return (
        <div className={classes.progress}>
          <LinearProgress />
        </div>
      );
    }

    if (!branches || !config) {
      return <Load />;
    }

    const currentBranch = branches[currentBranchId];

    return (
      <main>
        {currentBranch && (
          <Branch
            choices={getValue(currentBranch)}
            config={config}
            selectChoice={this.selectChoice}
            text={getKey(currentBranch)}
          />
        )}
      </main>
    );
  }
}

export default withStyles(styles)(Play);
