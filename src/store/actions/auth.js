import * as actionTypes from './actionTypes';
import axios from 'axios';
import { authKey } from '../../config';

export const authStart = () => ({
  type: actionTypes.AUTH_START,
});

export const authSuccess = (idToken, userId) => ({
  type: actionTypes.AUTH_SUCCESS,
  idToken,
  userId,
});

export const authFail = error => ({
  type: actionTypes.AUTH_FAIL,
  error,
});

export const auth = (email, password, isSignUp) => async dispatch => {
  dispatch(authStart());

  try {
    let url =
      'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=';
    if (!isSignUp) {
      url =
        'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=';
    }
    const authData = { email, password, returnSecureToken: true };
    const response = await axios.post(url + authKey, authData);

    console.log(response);
    dispatch(authSuccess(response.data.idToken, response.data.localId));
    dispatch(checkAuthTimeout(response.data.expiresIn));
  } catch (error) {
    console.log(error);
    dispatch(authFail(error.response.data.error));
  }
};

export const logout = () => ({
  type: actionTypes.AUTH_LOG_OUT,
});

export const checkAuthTimeout = expirationTime => async dispatch => {
  setTimeout(() => {
    dispatch(logout());
  }, expirationTime * 1000);
};

export const setAuthRedirectPath = path => ({
  type: actionTypes.SET_AUTH_REDIRECT_PATH,
  path,
});
