import axios from 'axios';
import {push} from 'react-router-redux'

export const USER_SIGNIN = 'USER_SIGNIN';
export const USER_SIGNOUT = 'USER_SIGNOUT';
export const AUTH_ERROR = 'AUTH_ERROR';

const ROOT_URL = 'http://localhost:3090';

export function signinUser({username, password}) {
  return function (dispatch) {
    axios.post(`${ROOT_URL}/signin`, {username, password})
      .then(response => {
        dispatch({
          type: USER_SIGNIN,
          payload: {
            token: response.data.token,
            username: response.data.username
          }
        });
      })
      .catch((error) => {
        if (error.response) {
          dispatch(authError(error.response.data.message));
        } else {
          dispatch(authError('Can\'t connect to the server.'));
        }
      });

  }
}

export function signupUser({username, password}) {
  return function (dispatch) {
    axios.post(`${ROOT_URL}/signup`, {username, password})
      .then(response => {
        dispatch({
          type: USER_SIGNIN,
          payload: {
            token: response.data.token,
            username: response.data.username
          }
        });
      })
      .catch(error => {
        if (error.response) {
          dispatch(authError(error.response.data.message));
        } else {
          dispatch(authError('Can\'t connect to the server.'));
        }
      });
  }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}

export function signoutUser() {
  localStorage.removeItem('token');
  return {type: USER_SIGNOUT}
}

export function redirect(url) {
  return function (dispatch) {
    dispatch(push(url))
  }
}