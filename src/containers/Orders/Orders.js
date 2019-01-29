import React, { Component } from 'react';

import Order from '../../components/Order/Order';
import classes from './Orders.css';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  };

  componentDidMount() {
    this.fetchOrders();
  }

  fetchOrders = async () => {
    try {
      const response = await axios.get('orders.json');
      const fetchedOrders = [];
      for (let key in response.data) {
        fetchedOrders.push({
          id: key,
          ...response.data[key],
        });
      }
      this.setState({
        orders: fetchedOrders,
      });
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    return (
      <div className={classes.Orders}>
        {this.state.orders.map(order => (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={+order.price}
          />
        ))}
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);
