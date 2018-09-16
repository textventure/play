import React, { Component } from 'react';
import Branch from '../Branch';
import { getKey, getValue } from '../helpers/util';

export default class Play extends Component {
  render() {
    const { branches, config, id } = this.props;
    const branch = branches[id];
    const choices = getValue(branch);
    const text = getKey(branch);

    return (
      <main>
        <Branch choices={choices} config={config} id={id} text={text} />
      </main>
    );
  }
}
