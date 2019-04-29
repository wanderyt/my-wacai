const login = (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        loginStatus: true
      }
    case 'TOKEN_INVALID':
      return {
        ...state,
        loginStatus: false
      }
    default:
      return state;
  }
};

export default login;
