import {CATEGORIES_FETCH_FAIL, CATEGORIES_FETCH_REQUEST, CATEGORIES_FETCH_SUCCESS } from '../constants/categories';
import {ICategory} from '../../constants';

interface IAction {
  type: string,
  payload: ICategory[]
}

/**
 * fetch all categories
 * @param state
 * @param action
 */
const fetchAllCategoriesReducer = (state = {}, action: IAction) => {
  switch (action.type) {
    case CATEGORIES_FETCH_REQUEST:
      return {
        loading: true
      };
    case CATEGORIES_FETCH_SUCCESS:
      return {
        loading: false,
        categories: action.payload
      };
    case CATEGORIES_FETCH_FAIL:
      return {
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export {
  fetchAllCategoriesReducer
};
