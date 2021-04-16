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

export const sendAlert = (message, severity) => {
  return {
    type: 'SEND_ALERT',
    payload: {
      message: message,
      severity: severity
    }
  }
}