import axios from "../../axios-orders";

import * as actionTypes from "../actions/actionTypes";

export const addIngredient = (name) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: name,
  };
};

export const deleteIngredient = (name) => {
  return {
    type: actionTypes.DELETE_INGREDIENT,
    ingredientName: name,
  };
};

export const fetchIngredientsError = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_ERROR,
  };
};

export const fetchInitialIngredients = (ings) => {
  return {
    type: actionTypes.FETCH_INITIAL_INGREDIENTS,
    ingredients: ings,
  };
};

export const initIngredients = () => {
  return (dispatch) => {
    axios
      .get("/ingredients.json")
      .then((res) => {
        dispatch(fetchInitialIngredients(res.data));
      })
      .catch(() => dispatch(fetchIngredientsError()));
  };
};
