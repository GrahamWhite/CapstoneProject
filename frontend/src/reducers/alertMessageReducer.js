/*
 *  alertMessageReducer.js
 *  Controls the alertMessage state object through dispatches to the matching action.type
 *
 *  Revision History
 *      Tyler Mills, 4-20-2021: Init
 */

const initialState = { message: "", severity: ""};

const alertMessageReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SEND_ALERT':
      const alertMessage = action.payload;
      return alertMessage;
    case 'CLEAR_ALERT':
      return initialState;
    default:
      return state;
  }
};

export default alertMessageReducer;