import 'es6-shim';

import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';

import history from './history';

import { Router, Route } from 'react-router'

import rootReducer from './reducers/index';
import { saveToLocalStorage, loadFromLocalStorage } from './ultis';
import ScrollToTop from './components/layouts/ScrollToTop';

import registerServiceWorker from './registerServiceWorker';
import App from './containers/AppContainer';

import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';

// Build the middleware for intercepting and dispatching navigation actions
// const middleware = routerMiddleware(history)

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating

const persistedState = loadFromLocalStorage();

const store = createStore(
  rootReducer,
  persistedState,
  compose(applyMiddleware(thunk),
  window.navigator.userAgent.includes('Chrome') ?
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() : compose,
));

store.subscribe(() => saveToLocalStorage(store.getState()));

ReactDOM.render(
  <Provider store={store}>
    { /* Tell the Router to use our enhanced history */ }
    <Router history={history}>
      <ScrollToTop>
        <Route path="/" component={App}>
        </Route>
      </ScrollToTop>
    </Router>
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker();

export default store;