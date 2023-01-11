import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from './reducers/index';

const initialState = {};

const middleware = [thunk];

if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  middleware.push(logger);
}

export const store = createStore(reducers, initialState, applyMiddleware(thunk));

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
