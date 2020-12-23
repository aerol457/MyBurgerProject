import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const handleDataStart = () => {
  return {
    type: actionTypes.HANDLE_DATA_START,
  };
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT,
  };
};

export const purchaseBurgerSuccess = (id, data) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: data,
  };
};

export const dataFail = (error) => {
  return {
    type: actionTypes.DATA_FAIL,
    error: error,
  };
};

export const purchaseBurgerStart = (orderData, token) => {
  return (dispatch) => {
    dispatch(handleDataStart());
    axios
      .post("/orders.json?auth=" + token, orderData)
      .then((res) => {
        dispatch(purchaseBurgerSuccess(res.data.name, orderData));
      })
      .catch((err) => {
        dispatch(dataFail(err));
      });
  };
};

export const fetchOrdersSuccess = (ordersData) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: ordersData,
  };
};

export const fetchOrdersStart = (token, idUser) => {
  return (dispatch) => {
    dispatch(handleDataStart());
    const queryParams =
      "?auth=" + token + '&orderBy="idUser"&equalTo="' + idUser + '"';
    axios
      .get("/orders.json" + queryParams)
      .then((res) => {
        dispatch(fetchOrdersSuccess(res.data));
      })
      .catch((err) => {
        dispatch(dataFail(err));
      });
  };
};
