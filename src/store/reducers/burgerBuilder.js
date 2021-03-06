import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false,
};

const addIngredient = (state, action) => {
  const updatedIngredient = updateObject({
    [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
  });
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
    building: true,
  };
  return updateObject(state, updatedState);
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return addIngredient(state, action);
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: Math.max(
            state.ingredients[action.ingredientName] - 1,
            0,
          ),
        },
        totalPrice:
          state.ingredients[action.ingredientName] > 0
            ? state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            : state.totalPrice,
        building: true,
      };
    case actionTypes.SET_INGREDIENTS:
      return {
        ...state,
        ingredients: action.ingredients,
        totalPrice: 4,
        error: false,
        building: false,
      };
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return {
        ...state,
        error: true,
      };
    default:
      return state;
  }
};

export default reducer;
