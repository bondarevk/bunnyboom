import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory'
import ReduxThunk from 'redux-thunk'
import {Provider} from 'react-redux';
import {createStore, combineReducers, applyMiddleware} from 'redux'
import {Redirect, Route, Switch} from 'react-router'
import {reducer as form} from 'redux-form';
import {ConnectedRouter, routerReducer, routerMiddleware} from 'react-router-redux'


import {ProtectedRoute} from './components/protected/protectedRoute';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

import App from './components/app';
import Signin from './components/signin/signin';
import Signup from './components/signup/signup';

import reducers from './reducers';
import {USER_SIGNIN} from "./actions";

// Bootstrap 4
import 'bootstrap/dist/css/bootstrap.css';
import $ from 'jquery';
import tether from 'tether';
window.Tether = tether;
window.jQuery = window.$ = $;
require('bootstrap');

const history = createHistory();
const middleware = routerMiddleware(history);
const store = createStore(
  combineReducers({
    ...reducers,
    form: form,
    router: routerReducer
  }),
  applyMiddleware(middleware, ReduxThunk)
);

const token = localStorage.getItem('token');
const username = localStorage.getItem('username');
if (token && username) {
  store.dispatch({
    type: USER_SIGNIN,
    payload: {
      token: token,
      username: username
    }
  })
}

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Switch>
          <ProtectedRoute exact path="/" component={App}/>
          <Route path="/signin" component={Signin}/>
          <Route path="/signup" component={Signup}/>
          <Redirect to='/'/>
        </Switch>
      </div>
    </ConnectedRouter>
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
