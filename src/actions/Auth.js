import {
  USER_LOGGED_IN,
  USER_SIGNED_UP,
  USER_LOGGED_OUT,
  RESET_PASSWORD_EMAIL_SENT,
  RESET_PASSWORD_SUCCEEDED
} from '../types';
import api from '../api/user';
import axiosInstence from '../api/index';


export const userLoggedIn = user => ({type: USER_LOGGED_IN, payload: user});

export const userLoggedOut = () => ({type: USER_LOGGED_OUT, payload: {}});

export const getMe = () => dispatch => {
  const {token} = JSON.parse(localStorage.triponaUser || '');
  axiosInstence.defaults.headers.common['Authorization'] = `bearer ${token}`;
  return api.getMe().then(user => {
    user = {...user, token};
    localStorage.triponaUser = JSON.stringify(user);
    return dispatch(userLoggedIn(user));
  });
};


export const login = (credentials) => (dispatch) =>
  api.login(credentials).then(user => {
    localStorage.triponaUser = JSON.stringify(user);
    if (user.token) {
      return dispatch(getMe());
    }

    else {
      dispatch(userLoggedIn(user));
      return user;
    }

  });

export const loginViaFacebook = (credentials) => (dispatch) =>
  api.loginViaFacebook(credentials).then(user => {
    localStorage.triponaUser = JSON.stringify(user);
    return dispatch(getMe());
  });

export const loginViaGoogle = (credentials) => (dispatch) =>
  api.loginViaGoogle(credentials).then(user => {
    localStorage.triponaUser = JSON.stringify(user);
    return dispatch(getMe());
  });


export const signup = (params) => (dispatch) =>
  api.signup(params).then(user => dispatch({type: USER_SIGNED_UP, payload: user.verificationToken}));

export const verify = (params) => (dispatch) =>
  api.verify(params).then(user => {
    localStorage.triponaUser = JSON.stringify(user);
    dispatch(userLoggedIn(user));
  });

export const logout = () => dispatch => {
  localStorage.removeItem('triponaUser');
  return dispatch(userLoggedOut());
};


export const forgetPassword = (email) => (dispatch) =>
  api.forgetPassword(email).then((res) => dispatch({type: RESET_PASSWORD_EMAIL_SENT, payload: res.resetToken}));

export const resetPassword = (params) => (dispatch) =>
  api.resetPassword(params).then((res) => dispatch({type: RESET_PASSWORD_SUCCEEDED, payload: res}));