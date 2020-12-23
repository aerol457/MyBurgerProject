import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import ErrorHandler from "../../hoc/ErrorHandler/ErrorHandler";
import * as actions from "../../store/actions/index";

const BurgerBuilder = (props) => {
  const [purchasing, setPurchasing] = useState(false);
  const dispatch = useDispatch();

  const onAddedIngredient = (ingName) =>
    dispatch(actions.addIngredient(ingName));
  const onDeleteIngredient = (ingName) =>
    dispatch(actions.deleteIngredient(ingName));
  const onInitIngredients = useCallback(
    () => dispatch(actions.initIngredients()),
    []
  );
  const onInitPurchase = () => dispatch(actions.purchaseInit());
  const onSetAuthRedirectPath = (path) =>
    dispatch(actions.setAuthRedirectPath(path));

  const ingredients = useSelector((state) => state.burgerBuilder.ingredients);
  const totalPrice = useSelector((state) => state.burgerBuilder.totalPrice);
  const error = useSelector((state) => state.burgerBuilder.error);
  const isAuthenticate = useSelector((state) => state.auth.token !== null);

  useEffect(() => {
    onInitIngredients();
  }, [onInitIngredients]);

  const purchaseHandler = () => {
    if (isAuthenticate) {
      setPurchasing(!purchasing);
    } else {
      onSetAuthRedirectPath("/checkout");
      props.history.push("/auth");
    }
  };

  const purchaseContinueHandler = () => {
    props.history.push("/checkout");
    onInitPurchase();
  };

  const updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    return sum > 0;
  };

  const disabledInfo = {
    ...ingredients,
  };
  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }
  let orderSummary = null;
  let burgerBuilder = error ? (
    <p style={{ textAlign: "center" }}>There was an error from server..</p>
  ) : (
    <Spinner />
  );

  if (ingredients) {
    burgerBuilder = (
      <Aux>
        <Burger ingredients={ingredients} />
        <BuildControls
          isAuth={isAuthenticate}
          addIngredientFunc={(type) => onAddedIngredient(type)}
          removeIngredientFunc={(type) => onDeleteIngredient(type)}
          disabled={disabledInfo}
          price={totalPrice}
          purchasable={updatePurchaseState(ingredients)}
          ordered={purchaseHandler}
        />
      </Aux>
    );
    orderSummary = (
      <OrderSummary
        price={totalPrice}
        cancelOrder={purchaseHandler}
        continue={purchaseContinueHandler}
        ingredients={ingredients}
      />
    );
  }
  return (
    <Aux>
      <Modal show={purchasing}>{orderSummary}</Modal>
      {burgerBuilder}
    </Aux>
  );
};

export default ErrorHandler(BurgerBuilder, axios);
