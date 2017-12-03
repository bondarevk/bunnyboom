import {
  CHANGE_USERNAME
} from '../actions';

const initialState = {
  username: null,
  connected: false
};

export default function(state = initialState, action) {
  switch(action.type) {
    case CHANGE_USERNAME:
      localStorage.setItem('username', action.payload.usernmae);
      return { ...state,
        username: action.payload.usernmae
      };

    default:
  }
  return state;
}