import loginReducer from './loginReducer';
import alertMessageReducer from './alertMessageReducer';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
  loggedIn: loginReducer,
  alertMessage: alertMessageReducer
});

export default allReducers;