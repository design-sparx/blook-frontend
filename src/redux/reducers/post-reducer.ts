import {
  POSTS_FETCH_REQUEST,
  POSTS_FETCH_SUCCESS,
  POSTS_FETCH_FAIL,
  POSTS_FETCH_RESET,
  POST_FETCH_REQUEST,
  POSTS_FETCH_RECENT_REQUEST,
  POSTS_FETCH_RECENT_SUCCESS,
  POSTS_FETCH_RECENT_FAIL,
  POST_FETCH_SUCCESS,
  POST_FETCH_FAIL,
  POSTS_FETCH_AUTHOR_REQUEST,
  POSTS_FETCH_AUTHOR_SUCCESS,
  POSTS_FETCH_AUTHOR_FAIL,
  POSTS_CATEGORY_FETCH_SUCCESS,
  POSTS_CATEGORY_FETCH_REQUEST,
  POSTS_CATEGORY_FETCH_FAIL,
  POSTS_SEARCH_FETCH_REQUEST,
  POSTS_SEARCH_FETCH_SUCCESS,
  POSTS_SEARCH_FETCH_FAIL
} from '../constants/post';
import {IPost} from '../../constants';

interface IAction {
  type: string,
  payload: IPost[]
}

const initialState: { loading: boolean, post?: IPost[] | null, posts?: IPost[] | null, error: any } = {
  loading: false,
  post: null,
  posts: null,
  error: null
};

/**
 * fetch all posts
 * @param state
 * @param action
 */
const fetchAllPostsReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case POSTS_FETCH_REQUEST:
      return {
        loading: true
      };
    case POSTS_FETCH_SUCCESS:
      return {
        loading: false,
        posts: action.payload
      };
    case POSTS_FETCH_FAIL:
      return {
        loading: false,
        error: action.payload
      };
    case POSTS_FETCH_RESET:
      return {};
    default:
      return state;
  }
};

/**
 * fetch single post
 * @param state
 * @param action
 */
const fetchPostBySlugReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case POST_FETCH_REQUEST:
      return {
        loading: true
      };
    case POST_FETCH_SUCCESS:
      return {
        loading: false,
        post: action.payload
      };
    case POST_FETCH_FAIL:
      return {
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

/**
 * fetch recent posts
 * @param state
 * @param action
 */
const fetchRecentPostsReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case POSTS_FETCH_RECENT_REQUEST:
      return {
        loading: true
      };
    case POSTS_FETCH_RECENT_SUCCESS:
      return {
        loading: false,
        posts: action.payload
      };
    case POSTS_FETCH_RECENT_FAIL:
      return {
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

/**
 * fetch posts by author
 * @param state
 * @param action
 */
const fetchPostsByAuthorReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case POSTS_FETCH_AUTHOR_REQUEST:
      return {
        loading: true
      };
    case POSTS_FETCH_AUTHOR_SUCCESS:
      return {
        loading: false,
        posts: action.payload
      };
    case POSTS_FETCH_AUTHOR_FAIL:
      return {
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

/**
 * fetch posts per category
 * @param state
 * @param action
 */
const fetchPostsByCategoryReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case POSTS_CATEGORY_FETCH_REQUEST:
      return {
        loading: true
      };
    case POSTS_CATEGORY_FETCH_SUCCESS:
      return {
        loading: false,
        posts: action.payload
      };
    case POSTS_CATEGORY_FETCH_FAIL:
      return {
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

/**
 * fetch posts per search
 * @param state
 * @param action
 */
const fetchPostsBySearchReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case POSTS_SEARCH_FETCH_REQUEST:
      return {
        loading: true
      };
    case POSTS_SEARCH_FETCH_SUCCESS:
      return {
        loading: false,
        posts: action.payload
      };
    case POSTS_SEARCH_FETCH_FAIL:
      return {
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export {
  fetchAllPostsReducer,
  fetchPostBySlugReducer,
  fetchRecentPostsReducer,
  fetchPostsByAuthorReducer,
  fetchPostsByCategoryReducer,
  fetchPostsBySearchReducer
};
