import React, { Component } from 'react';

import classes from './BuildControl.css';

class BuildControl extends Component {
  render() {
    return (
      <div className={classes.BuildControl}>
        <div className={classes.Label}>{this.props.label}</div>
        <button
          className={classes.Less}
          onClick={this.props.removed}
          disabled={this.props.disabled}
        >
          Less
        </button>
        <button className={classes.More} onClick={this.props.added}>
          More
        </button>
      </div>
    );
  }
}

export default BuildControl;
