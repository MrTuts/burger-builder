import * as actionTypes from '../actions/actionTypes';

const initialState = {
  orders: [],
  purchasing: false,
  purchased: false,
  loadingOrders: false,
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT:
      return {
        ...state,
        purchased: false,
      };
    case actionTypes.PURCHASE_BURGER_START:
      return {
        ...state,
        purchasing: true,
      };
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return {
        ...state,
        purchasing: false,
        purchased: true,
        orders: [...state.orders, { ...action.orderData, id: action.orderId }],
      };
    case actionTypes.PURCHASE_BURGER_FAIL:
      return {
        ...state,
        purchasing: false,
      };
    case actionTypes.FETCH_ORDERS_START:
      return { ...state, loadingOrders: true };
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return { ...state, orders: action.orders, loadingOrders: false };
    case actionTypes.FETCH_ORDERS_FAIL:
      return { ...state, loadingOrders: false };
    default:
      return state;
  }
};

export default orderReducer;
