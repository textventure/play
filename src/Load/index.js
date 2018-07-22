import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Card from '../Card';
import Play from '../Play';
import { getStory } from '../helpers/api';

const initialState = {
  error: '',
  value: '',
};
const placeholder =
  window.location.origin + process.env.PUBLIC_URL + '/demo.yaml';

export default class Load extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
      branches: null,
      config: null,
      message: '',
    };

    try {
      const url = new URLSearchParams(window.location.search).get('url');
      if (url) {
        this.state.value = url;
      }
    } catch (error) {}
  }

  /**
   * Handles snackbar close.
   */
  handleClose = () => {
    this.setState({
      message: '',
    });
  };

  /**
   * Handles input change.
   *
   * @param {SyntheticEvent} event
   */
  handleChange = event => {
    const { value } = event.target;
    const newState = {
      ...initialState,
      value,
    };
    try {
      new URL(value);
    } catch (error) {
      newState.error = 'Invalid URL';
    }
    this.setState(newState);
  };

  /**
   * Handles form submit.
   *
   * @param {SyntheticEvent} event
   */
  handleSubmit = event => {
    event.preventDefault();

    getStory(this.state.value)
      .then(story => {
        const { _config: config, ...branches } = story;

        if (config && branches) {
          this.setState({
            branches,
            config,
          });
        }
      })
      .catch(error => {
        this.setState({
          message: error.message,
        });
      });
  };

  render() {
    const { branches, config, value } = this.state;
    if (branches && config) {
      window.history.pushState({}, '', `?url=${encodeURIComponent(value)}`);
      return <Play branches={branches} config={config} />;
    }

    const { error, message } = this.state;
    return (
      <Card>
        {message && (
          <Snackbar
            autoHideDuration={6000}
            message={message}
            onClose={this.handleClose}
            open={Boolean(message)}
          />
        )}

        <form onSubmit={this.handleSubmit}>
          <Typography gutterBottom variant="headline">
            Load Story
          </Typography>

          <TextField
            autoFocus
            error={Boolean(error)}
            fullWidth
            helperText={error}
            InputLabelProps={{ shrink: true }}
            label="URL"
            margin="normal"
            name="url"
            onChange={this.handleChange}
            placeholder={placeholder}
            required
            spellCheck={false}
            type="url"
            value={value}
          />
          <br />
          <br />

          <Button
            color="primary"
            size="medium"
            type="submit"
            variant="contained"
          >
            Load
          </Button>
        </form>
      </Card>
    );
  }
}
