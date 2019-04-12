const fin = (state = {}, action) => {
  switch (action.type) {
    case 'SELECT_ITEM':
      return {
        ...state,
        selectedItem: action.item
      }
    default:
      return state;
  }
};

export default fin;