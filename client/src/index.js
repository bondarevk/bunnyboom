import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory'
import ReduxThunk from 'redux-thunk'
import {Provider} from 'react-redux';
import {createStore, combineReducers, applyMiddleware} from 'redux'
import {Redirect, Route, Switch} from 'react-router'
import {reducer as form} from 'redux-form';
import {ConnectedRouter, routerReducer, routerMiddleware} from 'react-router-redux'


import registerServiceWorker from './registerServiceWorker';
import './index.css';

import App from './components/app';

import reducers from './reducers';
import {CHANGE_USERNAME} from "./actions";

// Bootstrap 4
import 'bootstrap/dist/css/bootstrap.css';
import Popper from 'popper.js';
import $ from 'jquery';
import tether from 'tether';
window.Tether = tether;
window.Popper = Popper;
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

const username = localStorage.getItem('username');
if (username) {
  store.dispatch({
    type: CHANGE_USERNAME,
    payload: {
      username: username
    }
  })
}

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Switch>
          <Route exact path="/" component={App}/>
          <Redirect to='/'/>
        </Switch>
      </div>
    </ConnectedRouter>
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
