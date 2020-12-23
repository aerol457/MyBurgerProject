import React, { useEffect } from "react";
import { connect } from "react-redux";

import axios from "../../axios-orders";
import Order from "../../components/Order/Order";
import ErrorHandler from "../../hoc/ErrorHandler/ErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as orderActions from "../../store/actions/index";

const orders = (props) => {
  const { onFetchOrders } = props;
  useEffect(() => {
    onFetchOrders(props.token, props.idUser);
  }, [onFetchOrders]);

  let orders = <Spinner />;
  if (!props.loading) {
    orders = Object.keys(props.orders).map((order, index) => {
      return (
        <Order
          key={index}
          ingredients={props.orders[order].ingredients}
          price={+props.orders[order].price}
        />
      );
    });
    if (orders.length === 0) {
      orders = (
        <p style={{ fontSize: "30px", textAlign: "center" }}>
          No orders found, Please make orders to see them.
        </p>
      );
    }
  }
  return <div>{orders}</div>;
};

const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    idUser: state.auth.idUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrders: (token, idUser) =>
      dispatch(orderActions.fetchOrdersStart(token, idUser)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ErrorHandler(orders, axios));
