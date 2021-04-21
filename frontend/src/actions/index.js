/*
 *  actions.js
 *  Predetermined actions for redux reducers.
 *
 *  Revision History
 *      Tyler Mills, 4-20-2021: Init
 */

// loginReducer
export const signIn = () => {
  return {
    type: 'SIGN_IN'
  }
}

export const signOut = () => {
  return {
    type: 'SIGN_OUT'
  }
}

// alertMessageReducer
export const sendAlert = (message, severity) => {
  return {
    type: 'SEND_ALERT',
    payload: {
      message: message,
      severity: severity
    }
  }
}

export const clearAlert = (message, severity) => {
  return {
    type: 'CLEAR_ALERT',
    payload: {
      message: "",
      severity: ""
    }
  }
}