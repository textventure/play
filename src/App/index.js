import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';

import Load from '../Load';
import Play from '../Play';
import styles from './styles';

class App extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Router basename={process.env.PUBLIC_URL}>
        <CssBaseline>
          <Grid container justify="center">
            <Grid item xs={12} className={classes.grid}>
              <Switch>
                <Route exact path="/" component={Load} />
                <Route path="/load" component={Load} />
                <Route path="/play" component={Play} />
              </Switch>
            </Grid>
          </Grid>
        </CssBaseline>
      </Router>
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
