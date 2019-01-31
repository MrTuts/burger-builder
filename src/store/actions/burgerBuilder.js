import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = ingName => ({
  type: actionTypes.ADD_INGREDIENT,
  ingredientName: ingName,
});

export const removeIngredient = ingName => ({
  type: actionTypes.REMOVE_INGREDIENT,
  ingredientName: ingName,
});

export const setIngredients = ingredients => ({
  type: actionTypes.SET_INGREDIENTS,
  ingredients,
});

export const fetchIngredientsFailed = () => ({
  type: actionTypes.FETCH_INGREDIENTS_FAILED,
});

export const initIngredients = () => async dispatch => {
  try {
    const response = await axios.get('./ingredients.json');
    dispatch(setIngredients(response.data));
  } catch (error) {
    dispatch(fetchIngredientsFailed());
  }
};
