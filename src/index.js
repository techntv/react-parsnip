import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import App from './App';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import tasksReducer from './reducers';
import './index.css';
import thunk from 'redux-thunk';
import logger from './middleware/logger'
import analytics from './middleware/analytics'
import apiMiddleware from './middleware/api'
import { composeWithDevTools } from 'redux-devtools-extension';

const rootReducer = (state = {}, action) => {
  return {
    tasks: tasksReducer(state.tasks, action)
  }
}
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk, apiMiddleware, logger, analytics)));

ReactDOM.render(<Provider store={store}>
  <App />
</Provider>, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
