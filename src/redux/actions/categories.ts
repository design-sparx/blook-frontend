import {client} from '../../client';
import {CATEGORIES_FETCH_FAIL, CATEGORIES_FETCH_REQUEST, CATEGORIES_FETCH_SUCCESS} from '../constants/categories';

/**
 * fetch categories
 * @param length
 */
const fetchAllCategories = (length?: number) => async (dispatch: any) => {
  try {
    dispatch({
      type: CATEGORIES_FETCH_REQUEST
    });
    const data = await client.fetch(
      `*[_type == "category"] ${Boolean(length) ? '[0..10]' : ''}{
        _id, title, description
      }`
    );
    dispatch({
      type: CATEGORIES_FETCH_SUCCESS,
      payload: data
    });
  } catch (error: any) {
    dispatch({
      type: CATEGORIES_FETCH_FAIL,
      payload: error.message
    });
  }
};

export {
  fetchAllCategories
};
