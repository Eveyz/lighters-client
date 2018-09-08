// import React from 'react';
// import ReactDOM from 'react-dom';
// import './css/index.css';
// import App from './components/App';
// import registerServiceWorker from './registerServiceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();

import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from 'redux'

import createHistory from 'history/createBrowserHistory'
// // import { Route } from 'react-router'

import { routerReducer, routerMiddleware } from 'react-router-redux'

import { Router, Route } from 'react-router'
// import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import rootReducer from './reducers/index';

import registerServiceWorker from './registerServiceWorker';
import App from './components/App';

import 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history)

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
const store = createStore(
  combineReducers({
    rootReducer,
    router: routerReducer
  }),
  applyMiddleware(middleware)
)

ReactDOM.render(
  <Provider store={store}>
    { /* Tell the Router to use our enhanced history */ }
    <Router history={history}>
      <Route path="/" component={App}>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker();
