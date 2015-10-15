import {createStore, applyMiddleware, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
//import apiMiddleware from '../middleware/api';
import loggerMiddleware from 'redux-logger';
import rootReducer from '../reducers';
import asyncMiddleware from 'redux-async';
import { devTools, persistState } from 'redux-devtools';

//  const createStoreWithMiddleware = applyMiddleware(
//  thunkMiddleware,
//  apiMiddleware,
//  loggerMiddleware
//  )(createStore);

const finalCreateStore = compose(
    // Enables your middleware:
    applyMiddleware(asyncMiddleware,
        loggerMiddleware), // any Redux middleware, e.g. redux-thunk
    // Provides support for DevTools:
    devTools(),
    // Lets you write ?debug_session=<name> in address bar to persist debug sessions
    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
)(createStore);

export default function configureStore(initialState) {
  const store = finalCreateStore(rootReducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers/index');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
