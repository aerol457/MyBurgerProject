import * as actionTypes from "../actions/actionTypes";

const stateInitial = {
  orders: [],
  loading: false,
  error: "",
  purchased: false,
};

const orderReducer = (state = stateInitial, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      const newOrder = {
        ...action.orderData,
        id: action.orderId,
      };
      return {
        ...state,
        orders: state.orders.concat(newOrder),
        purchased: true,
        loading: false,
      };
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.orders,
        loading: false,
      };
    case actionTypes.DATA_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case actionTypes.PURCHASE_INIT:
      return {
        ...state,
        purchased: false,
      };
    case actionTypes.HANDLE_DATA_START:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default orderReducer;
