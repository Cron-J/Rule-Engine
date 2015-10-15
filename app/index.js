import 'babel-core/polyfill';
import React,{ Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
//import BrowserHistory from 'react-router/lib/BrowserHistory';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router';
import configureStore from './store/configureStore';
import App from './containers/App';
import {compose, createStore, applyMiddleware } from 'redux';
// Redux DevTools store enhancers
import { devTools, persistState } from 'redux-devtools';
// React components for Redux DevTools
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';

const store = configureStore();

export default class Root extends Component {
  render() {
    return(
      <div>
        <Provider store={store}>
          <Router>
            <Route path="/" component={App}></Route>
          </Router>
        </Provider>
        <DebugPanel top right bottom>
          <DevTools store={store} monitor={LogMonitor} />
        </DebugPanel>


      </div>
    );
  }
}
ReactDOM.render(<Root />,document.getElementById('root'));
