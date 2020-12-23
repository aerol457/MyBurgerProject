import * as actions from "../actions/actionTypes";

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.7,
  meat: 1.3,
  cheese: 0.4,
};

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false,
};

const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true,
      };

    case actions.DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
        building: true,
      };
    case actions.FETCH_INITIAL_INGREDIENTS:
      return {
        ...state,
        ingredients: action.ingredients,
        error: false,
        totalPrice: 4,
        building: false,
      };
    case actions.FETCH_INGREDIENTS_ERROR:
      return {
        error: true,
      };
    default:
      return state;
  }
};

export default ingredientsReducer;
