import React, { Component } from 'react';

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  { lable: 'Salad', type: 'salad' },
  { lable: 'Bacon', type: 'bacon' },
  { lable: 'Cheese', type: 'cheese' },
  { lable: 'Meat', type: 'meat' },
];

class BuildControls extends Component {
  render() {
    return (
      <div className={classes.BuildControls}>
        <p>
          Current Price: <strong>{this.props.price.toFixed(2)}</strong>
        </p>
        {controls.map(ctrl => (
          <BuildControl
            key={ctrl.lable}
            label={ctrl.lable}
            added={() => this.props.ingredientAdded(ctrl.type)}
            removed={() => this.props.ingredientRemoved(ctrl.type)}
            disabled={this.props.disabled[ctrl.type]}
          />
        ))}
        <button
          disabled={!this.props.purchasable}
          className={classes.OrderButton}
          onClick={this.props.ordered}
        >
          ORDER NOW
        </button>
      </div>
    );
  }
}

export default BuildControls;
