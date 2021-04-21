/*
 *  index.js
 *  Combines all the reducers into a single export for redux
 *
 *  Revision History
 *      Tyler Mills, 4-20-2021: Init
 */

import loginReducer from './loggedInReducer';
import alertMessageReducer from './alertMessageReducer';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
  loggedIn: loginReducer,
  alertMessage: alertMessageReducer
});

export default allReducers;