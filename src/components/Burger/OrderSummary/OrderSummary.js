import React, { Component } from "react";

import Aux from "../../../hoc/Auxiliary";
import Button from "../../UI/Button/Button";

class OrderSummary extends Component {
  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map(
      (igKey) => {
        return (
          <li key={igKey}>
            <span style={{ textTransform: "capitalize" }}>{igKey}</span>:{" "}
            {this.props.ingredients[igKey]}
          </li>
        );
      }
    );
    return (
      <Aux>
        <h3>Your Order</h3>
        <p>A delisicious burger with the following ingredients:</p>
        <ul>{ingredientSummary}</ul>
        <p>Total Price: {this.props.price.toFixed(2)} $</p>
        <p>Continue to checkout?</p>
        <Button clicked={this.props.cancelOrder} btnType="Danger">
          CANCEL
        </Button>
        <Button clicked={this.props.continue} btnType="Success">
          CONTINUE
        </Button>
      </Aux>
    );
  }
}

export default OrderSummary;
