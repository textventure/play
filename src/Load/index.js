import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Card from '../Card';
import history from '../helpers/history';

const initialState = {
  error: '',
  value: '',
};

const placeholder =
  window.location.origin + process.env.PUBLIC_URL + '/demo.yaml';

export default class Load extends Component {
  state = {
    ...initialState,
    message: '',
  };

  /**
   * Handles snackbar close.
   */
  handleClose = () => this.setState({ message: '' });

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
  onSubmit = event => {
    event.preventDefault();
    history.push(`?url=${encodeURIComponent(this.state.value)}`);
  };

  render() {
    const { error, message, value } = this.state;
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

        <form onSubmit={this.onSubmit}>
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
