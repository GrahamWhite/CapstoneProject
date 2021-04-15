const initialState = { message: "", severity: ""};

const alertMessageReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SEND_ALERT':
      const alertMessage = action.payload;
      return alertMessage;
    default:
      return state;
  }
};

export default alertMessageReducer;