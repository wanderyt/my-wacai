import {formatDate} from '../utils/helper';

const fin = (state = {}, action) => {
  switch (action.type) {
    case 'SELECT_ITEM':
      return {
        ...state,
        selectedItem: action.item
      };
    case 'RESET_SELECTED_ITEM':
      return {
        ...state,
        selectedItem: null
      };
    case 'CREATE_ITEM':
      return {
        ...state,
        selectedItem: {
          category: '周末',
          subcategory: '晚餐',
          date: formatDate(),
          amount: 0
        }
      };
    case 'CHANGE_TO_CATEGORY_SELECTION':
      return {
        ...state,
        pageIndex: 'CATEGORY_SELECTION',
        selectedCatGroup: action.selectedCatGroup || {}
      };
    case 'CHANGE_TO_MAIN':
      return {
        ...state,
        pageIndex: 'MAIN',
        updatedCatGroup: action.updatedCatGroup || {}
      };
    case 'RESET_UPDATED_CAT_GROUP':
      return {
        ...state,
        updatedCatGroup: {}
      };
    default:
      return state;
  }
};

export default fin;