/*
 *  loggedInReducer.js
 *  Controls the loggedIn state object through dispatches to the matching action.type
 *
 *  Revision History
 *      Tyler Mills, 4-20-2021: Init
 */

const loggedInReducer = (state = localStorage.getItem('username') ? true : false, action) => {
  switch (action.type) {
    case 'SIGN_IN':
      return true;
    case 'SIGN_OUT':
      return false;
    default:
      return state;
  }
};

export default loggedInReducer;