import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '../Card';
import Choice from '../Choice';
import { formatAuthor, getKey, getValue } from '../helpers/util';

export default class Title extends Component {
  static defaultProps = {
    classes: {},
    config: {},
  };

  render() {
    const { classes, config, displayAction, selectChoice } = this.props;
    let { title, author, description, start } = config;
    author = formatAuthor(config.author);

    return (
      <Card>
        <div className={classes.cardContent}>
          {/* title */}
          {title && (
            <Typography component="h1" gutterBottom variant="headline">
              {title}
            </Typography>
          )}

          {/* author */}
          {author && (
            <Typography variant="caption" gutterBottom>
              By {author}
            </Typography>
          )}

          {/* description */}
          {description && <Typography gutterBottom>{description}</Typography>}
        </div>

        {/* action */}
        {displayAction && (
          <Choice
            choiceId={getValue(start)}
            className={classes.button}
            selectChoice={selectChoice}
          >
            {getKey(start)}
          </Choice>
        )}
      </Card>
    );
  }
}
