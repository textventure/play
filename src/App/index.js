import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';

import Play from '../Play';
import Load from '../Load';
import styles from './styles';
import { getStory } from '../helpers/api';
import history from '../helpers/history';
import querystring from '../helpers/querystring';

// default textventure config
export const defaultConfig = {
  renderer: 'text',
  start: 'start',
};

export const initialState = {
  branches: {},
  config: defaultConfig,
  id: defaultConfig.start,
  isLoading: false,
};

class App extends Component {
  state = initialState;

  componentDidMount() {
    // invoke listener with browser history location
    this.historyListener(history.location);

    // subscribe to browser history listener
    this.unlisten = history.listen(this.historyListener);
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
    const searchParams = querystring.parse(location.search);
    if (!searchParams.url) {
      this.setState(initialState);
      return;
    }

    if (this.hasLoaded) {
      const { id } = searchParams;
      if (id && id !== this.state.id) {
        this.setState({ id });
      }
      return;
    }

    this.setState({ isLoading: true }, () => {
      this.loadStory(searchParams.url, searchParams);
    });
  };

  /**
   * Fetches and loads story.
   *
   * @param  {String}  url
   * @param  {Object}  [searchParams={}]
   * @param  {String}  [searchParams.id]
   * @return {Promise}
   */
  loadStory = (url, searchParams = {}) => {
    this.hasLoaded = true;

    return getStory(url)
      .then(story => {
        const { _config: config, ...branches } = story;
        const newState = { isLoading: false };

        if (!branches || !config) {
          this.setState(newState);
          return;
        }

        newState.branches = branches;
        newState.config = {
          ...defaultConfig,
          ...config,
        };

        if (searchParams.id) {
          // use branch id from location search
          newState.id = searchParams.id;
        } else {
          // or use start id and set in location search
          newState.id = config.start || defaultConfig.start;
          history.push(
            querystring.stringify({
              ...searchParams,
              id: newState.id,
            })
          );
        }

        this.setState(newState);
      })
      .catch(() => {
        this.hasLoaded = false;
        this.setState({ isLoading: false }, () => history.push(''));
      });
  };

  /**
   * Updates next story branch id based on selected choice id.
   *
   * @param {String} id
   */
  selectChoice = id => this.setState({ id });

  render() {
    const { classes } = this.props;
    const { branches, config, id, isLoading } = this.state;
    let contentNode;

    if (Object.keys(branches).length) {
      contentNode = <Play branches={branches} config={config} id={id} />;
    } else if (isLoading) {
      contentNode = (
        <div className={classes.progress}>
          <LinearProgress />
        </div>
      );
    } else {
      contentNode = <Load />;
    }

    return (
      <CssBaseline>
        <Grid container justify="center">
          <Grid item xs={12} className={classes.grid}>
            {contentNode}
          </Grid>
        </Grid>
      </CssBaseline>
    );
  }
}

App = withStyles(styles)(App);

/* istanbul ignore if */
if (process.env.NODE_ENV === 'development') {
  const { hot } = require('react-hot-loader');
  App = hot(module)(App);
}

export default App;
