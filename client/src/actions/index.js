import {push} from 'react-router-redux'

export const CHANGE_USERNAME = 'CHANGE_USERNAME';

const ROOT_URL = 'http://localhost:3090';

export function changeUsername(username) {
  return function (dispatch) {
    dispatch({
      type: CHANGE_USERNAME,
      payload: {
        username: username
      }
    });
  }
}

export function redirect(url) {
  return function (dispatch) {
    dispatch(push(url))
  }
}