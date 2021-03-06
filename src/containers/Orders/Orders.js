import React, { Component } from 'react';
import { connect } from 'react-redux';

import Spinner from '../../components/UI/Spinner/Spinner';
import { fetchOrders } from '../../store/actions';
import Order from '../../components/Order/Order';
import classes from './Orders.css';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrders(this.props.token, this.props.userId);
  }

  render() {
    const orders = this.props.loading ? (
      <Spinner />
    ) : (
      this.props.orders.map(order => (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={+order.price}
        />
      ))
    );
    return <div className={classes.Orders}>{orders}</div>;
  }
}

const mapStateToProps = state => ({
  orders: state.order.orders,
  loading: state.order.loadingOrders,
  token: state.auth.token,
  userId: state.auth.userId,
});

const mapDispatchToProps = dispatch => ({
  onFetchOrders: (token, userId) => dispatch(fetchOrders(token, userId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withErrorHandler(Orders, axios));
