const test = (state = {}, action) => {
  const {variant = 0} = state;
  switch (action.type) {
    case 'UPDATE_VARIANT':
      return {
        ...state,
        variant: variant + 1
      }
    default:
      return state;
  }
};

export default test;
