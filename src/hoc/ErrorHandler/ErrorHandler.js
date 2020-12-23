import React from "react";

import Modal from "../../components/UI/Modal/Modal";
import Aux from "../Auxiliary/Auxiliary";
import useErrorHandler from "../../hooks/errorHandler";

const errorHandler = (WrappedComponent, axios) => {
  return (props) => {
    const [error, clearError] = useErrorHandler(axios);

    return (
      <Aux>
        <Modal show={error} cancelOrder={clearError}>
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </Aux>
    );
  };
};

export default errorHandler;
