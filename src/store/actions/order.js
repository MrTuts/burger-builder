import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerStart = () => ({
  type: actionTypes.PURCHASE_BURGER_START,
});

export const purchaseBurgerSuccess = (id, orderData) => ({
  type: actionTypes.PURCHASE_BURGER_SUCCESS,
  orderId: id,
  orderData,
});

export const purchaseBurgerFail = error => ({
  type: actionTypes.PURCHASE_BURGER_FAIL,
  error,
});

export const purchaseBurger = (oderData, token) => async dispatch => {
  dispatch(purchaseBurgerStart());

  try {
    const response = await axios.post('/orders.json?auth=' + token, oderData);
    dispatch(purchaseBurgerSuccess(response.data.name, oderData));
  } catch (error) {
    dispatch(purchaseBurgerFail(error));
  }
};

export const purchaseInit = () => ({
  type: actionTypes.PURCHASE_INIT,
});

export const fetchOrders = token => async dispatch => {
  dispatch(fetchOrdersStart());
  try {
    const response = await axios.get('orders.json?auth=' + token);
    const fetchedOrders = [];
    for (let key in response.data) {
      fetchedOrders.push({
        id: key,
        ...response.data[key],
      });
    }
    dispatch(fetchOrdersSuccess(fetchedOrders));
  } catch (error) {
    dispatch(fetchOrdersFail(error));
  }
};

export const fetchOrdersStart = () => ({
  type: actionTypes.FETCH_ORDERS_START,
});

export const fetchOrdersSuccess = orders => ({
  type: actionTypes.FETCH_ORDERS_SUCCESS,
  orders,
});

export const fetchOrdersFail = error => ({
  type: actionTypes.FETCH_ORDERS_FAIL,
  error,
});
