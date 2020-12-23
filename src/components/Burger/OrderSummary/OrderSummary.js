import React from "react";

import Aux from "../../../hoc/Auxiliary/Auxiliary";
import Button from "../../UI/Button/Button";

const orderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients).map((igKey) => {
    return (
      <li key={igKey}>
        <span style={{ textTransform: "capitalize" }}>{igKey}</span>:{" "}
        {props.ingredients[igKey]}
      </li>
    );
  });
  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delisicious burger with the following ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p>Total Price: {props.price.toFixed(2)} $</p>
      <p>Continue to checkout?</p>
      <Button clicked={props.cancelOrder} btnType="Danger">
        CANCEL
      </Button>
      <Button clicked={props.continue} btnType="Success">
        CONTINUE
      </Button>
    </Aux>
  );
};

export default orderSummary;
