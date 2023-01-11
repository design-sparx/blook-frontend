import {
  FB_SIGN_IN_REQUEST,
  FB_SIGN_IN_FAIL,
  FB_SIGN_IN_SUCCESS,
  GOOGLE_SIGN_IN_REQUEST,
  GOOGLE_SIGN_IN_FAIL,
  GOOGLE_SIGN_IN_SUCCESS,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_REQUEST,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  SET_USER
} from '../constants/user';

const initialState: { loading: boolean, currentUser: any, error: any } = {
  loading: false,
  currentUser: null,
  error: null
};

const userReducer = (state = initialState, action: any): any => {
  switch (action.type) {
    case REGISTER_REQUEST:
    case LOGIN_REQUEST:
    case LOGOUT_REQUEST:
    case GOOGLE_SIGN_IN_REQUEST:
    case FB_SIGN_IN_REQUEST:
      return {
        ...state,
        loading: true
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        currentUser: null
      };
    case SET_USER:
      return {
        ...state,
        loading: false,
        currentUser: action.payload
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
    case GOOGLE_SIGN_IN_SUCCESS:
    case FB_SIGN_IN_SUCCESS:
      return {
        ...state,
        loading: false,
        currentUser: action.payload
      };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case LOGOUT_FAIL:
    case GOOGLE_SIGN_IN_FAIL:
    case FB_SIGN_IN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
};

export {userReducer};
