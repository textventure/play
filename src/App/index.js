import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';

import Play from '../Play';
import styles from './styles';

class App extends Component {
  render() {
    const { classes } = this.props;
    return (
      <CssBaseline>
        <Grid container justify="center">
          <Grid item xs={12} className={classes.grid}>
            <Play />
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
