const fin = (state = {}, action) => {
  switch (action.type) {
    case 'SELECT_ITEM':
      return {
        ...state,
        selectedItem: action.item
      }
    case 'RESET_SELECTED_ITEM':
      return {
        ...state,
        selectedItem: null
      }
    default:
      return state;
  }
};

export default fin;