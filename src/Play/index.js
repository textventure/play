import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Branch from '../Branch';
import Load from '../Load';
import { getStory } from '../helpers/api';
import { getKey, getValue } from '../helpers/util';
import browserHistory from '../helpers/history';
import { searchParams } from '../helpers/url';

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
  constructor(props) {
    super(props);
    const { branches, config } = props;
    this.state = {
      branches,
      config: {
        ...defaultConfig,
        ...config,
      },
      isLoading: false,
    };
    this.state.id = this.state.config.start;
  }

  componentDidMount() {
    // invoke listener with browser history location
    this.historyListener(browserHistory.location);

    // subscribe to browser history listener
    this.unlisten = browserHistory.listen(this.historyListener);
  }

  componentWillUnmount() {
    // unsubscribe from browser history listener
    this.unlisten();
  }

  /**
   * Listens to browser history navigation events.
   *
   * @param {Object} location
   * @param {String} location.hash
   * @param {String} location.pathname
   * @param {String} location.search
   * @param {*}      location.state
   */
  historyListener = location => {
    const { id, url } = searchParams(location.search);
    if (this.hasLoaded) {
      if (id && id !== this.state.id) {
        this.setState({ id });
      }
    } else {
      this.loadStory(url);
    }
  };

  /**
   * Fetches and loads story.
   *
   * @param  {String}            [url]
   * @return {Promise|undefined}
   */
  loadStory = url => {
    if (!url) {
      return;
    }

    this.hasLoaded = true;
    this.setState({ isLoading: true });
    const newState = { isLoading: false };

    return getStory(url)
      .then(story => {
        const { _config: config, ...branches } = story;
        if (branches && config) {
          newState.branches = branches;
          newState.config = {
            ...defaultConfig,
            ...config,
          };

          // set starting branch id
          if (config.start) {
            newState.id = config.start;
          }
        }

        this.setState(newState);
      })
      .catch(() => {
        this.hasLoaded = false;
        this.setState(newState);
      });
  };

  /**
   * Updates next story branch id based on selected choice id.
   *
   * @param {String} id
   */
  selectChoice = id => this.setState({ id });

  render() {
    const { branches, config, id, isLoading } = this.state;

    if (isLoading) {
      return (
        <div className={this.props.classes.progress}>
          <LinearProgress />
        </div>
      );
    }

    if (!branches || !config) {
      return <Load />;
    }

    const currentBranch = branches[id];
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
