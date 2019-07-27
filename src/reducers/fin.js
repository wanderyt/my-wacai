import {formatDateTime} from '../utils/helper';

const fin = (state = {}, action) => {
  switch (action.type) {
    case 'SELECT_ITEM':
      if (!action.item.date) {
        action.item.date = formatDateTime();
      }
      return {
        ...state,
        pageIndex: 'MAIN',
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
          date: formatDateTime(),
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
    case 'CATEGORY_SELECTION_DONE':
      // Handle category group selection done case
      // Need to return to template page when there is no selected item.
      let targetPage = '';
      if (state.selectedItem) {
        targetPage = 'MAIN';
      } else {
        targetPage = 'FIN_TEMPLATE_LIST'
      }
      return {
        ...state,
        pageIndex: targetPage,
        updatedCatGroup: action.updatedCatGroup || {}
      };
    case 'CHANGE_TO_FIN_HISTORY':
      return {
        ...state,
        pageIndex: 'FIN_HISTORY'
      };
    case 'RESET_UPDATED_CAT_GROUP':
      return {
        ...state,
        updatedCatGroup: {}
      };
    case 'CHANGE_TO_FIN_TEMPLATE_LIST':
      return {
        ...state,
        pageIndex: 'FIN_TEMPLATE_LIST',
        isCreatingTemplate: false
      };
    case 'CREATE_TEMPLATE':
      return {
        ...state,
        isCreatingTemplate: true
      };
    case 'OPEN_SEARCH_FIN_MODE':
      return {
        ...state,
        pageIndex: 'SEARCH_FIN_ITEM',
      }
    default:
      return state;
  }
};

export default fin;