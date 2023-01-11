import {IAuthor, IPost} from '../../constants';
import {
  AUTHOR_ID_FETCH_FAIL,
  AUTHOR_ID_FETCH_REQUEST, AUTHOR_ID_FETCH_SUCCESS,
  AUTHOR_NAME_FETCH_FAIL,
  AUTHOR_NAME_FETCH_REQUEST,
  AUTHOR_NAME_FETCH_SUCCESS,
  AUTHOR_SLUG_FETCH_FAIL,
  AUTHOR_SLUG_FETCH_REQUEST,
  AUTHOR_SLUG_FETCH_SUCCESS
} from '../constants/author';

interface IAction {
  type: string,
  payload: IPost[]
}

const initialState: { loading: boolean, author: IAuthor[] | null, error: any } = {
  loading: false,
  author: null,
  error: null
};

/**
 * fetch single author BY slug
 * @param state
 * @param action
 */
const fetchAuthorBySlugReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case AUTHOR_SLUG_FETCH_REQUEST:
      return {
        loading: true
      };
    case AUTHOR_SLUG_FETCH_SUCCESS:
      return {
        loading: false,
        author: action.payload
      };
    case AUTHOR_SLUG_FETCH_FAIL:
      return {
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

/**
 * fetch single author by name
 * @param state
 * @param action
 */
const fetchAuthorByNameReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case AUTHOR_NAME_FETCH_REQUEST:
      return {
        loading: true
      };
    case AUTHOR_NAME_FETCH_SUCCESS:
      return {
        loading: false,
        author: action.payload
      };
    case AUTHOR_NAME_FETCH_FAIL:
      return {
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

/**
 * fetch single author by id
 * @param state
 * @param action
 */
const fetchAuthorByIdReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case AUTHOR_ID_FETCH_REQUEST:
      return {
        loading: true
      };
    case AUTHOR_ID_FETCH_SUCCESS:
      return {
        loading: false,
        author: action.payload
      };
    case AUTHOR_ID_FETCH_FAIL:
      return {
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};


export {fetchAuthorBySlugReducer, fetchAuthorByNameReducer, fetchAuthorByIdReducer};
