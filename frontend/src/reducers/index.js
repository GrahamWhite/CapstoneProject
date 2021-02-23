import loginReducer from './loginReducer';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
  loggedIn: loginReducer
});

export default allReducers;