export const signIn = () => {
  return {
    type: 'SIGN_IN'
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