import React, { Component } from "react";

import Aux from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import ErrorHandler from "../../hoc/ErrorHandler/ErrorHandler";

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.7,
  meat: 1.3,
  cheese: 0.4,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false,
  };

  //Good For fetch data from DB
  componentDidMount() {
    console.log("START");
    axios
      .get("https://burger-builder-27928.firebaseio.com/ingredients.json")
      .then((res) => {
        this.setState({ ingredients: res.data });
      })
      .catch((err) => {
        this.setState({ error: true });
      });
  }

  purchaseHandler = () => {
    this.setState((prevState) => {
      return { purchasing: !prevState.purchasing };
    });
  };

  purchaseContinueHandler = () => {
    this.setState({ loading: true });
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: "Harel",
        address: {
          street: "TestStreet 1",
          zipCode: "12323",
          country: "Israel",
        },
        email: "test@test.com",
      },
      deliveryMethod: "fastest",
    };
    axios
      .post("/orders.json", order)
      .then((res) => {
        this.setState({ loading: false, purchasing: false });
      })
      .catch((err) => {
        this.setState({ loading: false, purchasing: false });
      });
  };

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    this.setState({
      purchasable: sum > 0,
    });
  }

  addIngredientHandler = (type) => {
    const updatedCount = this.state.ingredients[type] + 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedCount;
    const updatedTotalPrice = INGREDIENT_PRICES[type] + this.state.totalPrice;
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: updatedTotalPrice,
    });
    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredientHandler = (type) => {
    const updateCount = this.state.ingredients[type] - 1;
    if (updateCount >= 0) {
      const updatedIngredients = {
        ...this.state.ingredients,
      };
      updatedIngredients[type] = updateCount;
      const updatedTotalPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
      this.setState({
        ingredients: updatedIngredients,
        totalPrice: updatedTotalPrice,
      });
      this.updatePurchaseState(updatedIngredients);
    }
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;
    let burgerBuilder = this.state.error ? (
      <p style={{ textAlign: "center" }}>There was an error from server..</p>
    ) : (
      <Spinner />
    );

    if (this.state.ingredients) {
      burgerBuilder = (
        <Aux>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            addIngredientFunc={this.addIngredientHandler}
            removeIngredientFunc={this.removeIngredientHandler}
            disabled={disabledInfo}
            price={this.state.totalPrice}
            purchasable={this.state.purchasable}
            ordered={this.purchaseHandler}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          price={this.state.totalPrice}
          cancelOrder={this.purchaseHandler}
          continue={this.purchaseContinueHandler}
          ingredients={this.state.ingredients}
        />
      );
    }
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }
    return (
      <Aux>
        <Modal show={this.state.purchasing} cancelOrder={this.purchaseHandler}>
          {orderSummary}
        </Modal>
        {burgerBuilder}
      </Aux>
    );
  }
}

export default ErrorHandler(BurgerBuilder, axios);
