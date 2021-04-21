/*
 *  index.js
 *  Initialization of the react app and the redux store. 
 *  Renders app to public/index.html
 *
 *  Revision History
 *      Tyler Mills, 4-20-2021: Init
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import './index.css';
import { App } from './App.js';
// import reportWebVitals from './reportWebVitals';
import { createStore } from 'redux';
import allReducers from './reducers';
import { loadState, saveState } from './globals'

const persistedStore = loadState();

const store = createStore(
  allReducers, 
  persistedStore,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  ,
  document.getElementById('root')
);

store.subscribe(() => {
  saveState(store.getState());
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
