import {
  USER_SIGNIN,
  USER_SIGNOUT,
  AUTH_ERROR
} from '../actions';

const initialState = {
  authenticated: false,
  token: null,
  user: null,
  authError: null
};

export default function(state = initialState, action) {
  switch(action.type) {
    case USER_SIGNIN:
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('username', action.payload.usernmae);

      return { ...state,
        authenticated: true,
        token: action.payload.token,
        user: action.payload.usernmae,
        authError: null
      };

    case USER_SIGNOUT:
      localStorage.removeItem('token');
      localStorage.removeItem('username');

      return { ...state,
        authenticated: false,
        token: null,
        user: null,
        authError: null
      };

    case AUTH_ERROR:
      localStorage.removeItem('token');
      localStorage.removeItem('username');

      return { ...state,
        authenticated: false,
        token: null,
        user: null,
        authError: action.payload
      };

    default:
  }
  return state;
}