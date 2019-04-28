const errorMsg = (state = {}, action) => {
  switch (action.type) {
    case 'SET_ERROR_MESSAGE':
      return {
        ...state,
        message: action.message
      }
    case 'RESET_ERROR_MESSAGE':
      return {
        ...state,
        message: ''
      }
    default:
      return state;
  }
};

export default errorMsg;
