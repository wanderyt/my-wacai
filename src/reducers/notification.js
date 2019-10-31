const notification = (state = {}, action) => {
  switch (action.type) {
    case 'SET_MESSAGE':
      return {
        ...state,
        notificationType: action.notificationType,
        notificationMsg: action.message
      }
    case 'RESET_MESSAGE':
      return {
        ...state,
        notificationType: '',
        notificationMsg: ''
      }
    default:
      return state;
  }
};

export default notification;
