import {combineReducers} from 'redux';
import {
  fetchAllPostsReducer,
  fetchRecentPostsReducer,
  fetchPostBySlugReducer,
  fetchPostsByAuthorReducer,
  fetchPostsByCategoryReducer,
  fetchPostsBySearchReducer
} from './post-reducer';

import {fetchAllCategoriesReducer} from './categories-reducer';
import {fetchAuthorByIdReducer, fetchAuthorByNameReducer, fetchAuthorBySlugReducer} from './author-reducer';
import {userReducer} from './user-reducer';

// import { toggleTheme } from "./globalReducers";

const rootReducer = combineReducers({
  fetchAllPostsReducer,
  fetchRecentPostsReducer,
  fetchPostBySlugReducer,
  fetchAllCategoriesReducer,
  fetchAuthorBySlugReducer,
  fetchAuthorByNameReducer,
  fetchAuthorByIdReducer,
  fetchPostsByAuthorReducer,
  fetchPostsByCategoryReducer,
  fetchPostsBySearchReducer,
  userReducer
});

export default rootReducer;
