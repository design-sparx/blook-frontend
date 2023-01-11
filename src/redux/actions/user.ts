import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  User
} from 'firebase/auth';
import {auth, googleAuthProvider} from '../../firebase';
import {
  GOOGLE_SIGN_IN_FAIL,
  GOOGLE_SIGN_IN_REQUEST,
  GOOGLE_SIGN_IN_SUCCESS, LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_FAIL,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  REGISTER_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  SET_USER
} from '../constants/user';
import {IAuth, IUser} from '../../constants';
import {handleCreateAuthor, handleFetchAuthor} from '../../api';

/**
 * initialize registration via form
 * @param email
 * @param password
 * @param displayName
 */

const registerInitiate = ({email, password, displayName}: IAuth) => async (dispatch: any) => {
  try {
    dispatch({
      type: REGISTER_REQUEST
    });
    createUserWithEmailAndPassword(auth, email, password)
      .then(({user}) => {
        /**
         * Signed in then Update profile
         */
        const refUser = {...user, displayName: displayName};
        Promise.all([updateProfile(user, {displayName: displayName}), handleCreateAuthor(refUser as any)])
          .then(res => {
          //
          })
          .catch(error => {
            dispatch({
              type: REGISTER_FAIL,
              error: error.message
            });
          });
      }).catch(error => console.error(error));
  } catch (error: any) {
    dispatch({
      type: REGISTER_FAIL,
      error: error.message
    });
  }
};

/**
 * initialize google sign in
 */
const googleSignInInitiate = () => (dispatch: any) => {
  try {
    dispatch({
      type: GOOGLE_SIGN_IN_REQUEST
    });
    signInWithPopup(auth, googleAuthProvider)
      .then(user => {
        handleFetchAuthor(user.user as unknown as IUser).then(res => {
          // Signed in
          if (res.length > 0) {
            console.log('loading user without update');
            dispatch({
              type: GOOGLE_SIGN_IN_SUCCESS,
              payload: res[0]
            });
          } else {
            console.log('sign in and add user');
            handleCreateAuthor(user as unknown as IUser).then((res1) => {
              dispatch({
                type: GOOGLE_SIGN_IN_SUCCESS,
                payload: res1
              });
            }).catch((error: any) => {
              dispatch({
                type: GOOGLE_SIGN_IN_FAIL,
                payload: error.message
              });
            });
          }
        }).catch((error) => {
          dispatch({
            type: GOOGLE_SIGN_IN_FAIL,
            payload: error.message
          });
        });
      })
      .catch((error) => {
        dispatch({
          type: GOOGLE_SIGN_IN_FAIL,
          payload: error.message
        });
      });
  } catch (error: any) {
    dispatch({
      type: GOOGLE_SIGN_IN_FAIL,
      payload: error.message
    });
  }
};

/**
 * initialize login
 * @param email
 * @param password
 */
const loginInitiate = ({email, password}: IAuth) => async (dispatch: any) => {
  try {
    dispatch({
      type: LOGIN_REQUEST
    });
    signInWithEmailAndPassword(auth, email, password)
      .then(({user}) => {
        handleFetchAuthor(user as unknown as IUser).then(res => {
          // Signed in
          dispatch({
            type: LOGIN_SUCCESS,
            payload: res[0]
          });
        }).catch((error) => {
          dispatch({
            type: LOGIN_FAIL,
            error: error.message
          });
        });
      })
      .catch((error) => {
        dispatch({
          type: LOGIN_FAIL,
          error: error.message
        });
      });
  } catch (error: any) {
    dispatch({
      type: LOGIN_FAIL,
      error: error.message
    });
  }
};

/**
 * initialize logout
 */
const logoutInitiate = () => async (dispatch: any) => {
  dispatch({
    type: LOGOUT_REQUEST
  });
  signOut(auth)
    .then(() => {
      dispatch({
        type: LOGOUT_SUCCESS
      });
    })
    .catch((error: any) => {
      dispatch({
        type: LOGOUT_FAIL,
        payload: error.message
      });
    });
};

const setUser = (user: User | null): any => ({
  type: SET_USER,
  payload: user
});

export {
  registerInitiate,
  googleSignInInitiate,
  logoutInitiate,
  loginInitiate,
  setUser
};
