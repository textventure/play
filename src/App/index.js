import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';

import Load from '../Load';
import Play from '../Play';

const styles = {
  gridItem: {
    maxWidth: 600,
  },
};

class App extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Router>
        <Grid container justify="center">
          <CssBaseline />
          <Grid item xs={12} className={classes.gridItem}>
            <Switch>
              <Route exact path="/" component={Load} />
              <Route path="/load" component={Load} />
              <Route path="/play" component={Play} />
            </Switch>
          </Grid>
        </Grid>
      </Router>
    );
  }
}

App = withStyles(styles)(App);

if (process.env.NODE_ENV === 'development') {
  const { hot } = require('react-hot-loader');
  App = hot(module)(App);
}

export default App;
