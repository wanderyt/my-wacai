import { formatDateTime, getPreselectedCategories } from '../../utils/helper';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFinItem } from '../../utils/gql-client/props';

type PageType =
  | 'MAIN'
  | 'CATEGORY_SELECTION'
  | 'FIN_TEMPLATE_LIST'
  | 'FIN_HISTORY'
  | 'SEARCH_FIN_ITEM'
  | 'FIN_TEMPLATE_LIST';

export interface FinState {
  pageIndex: PageType;
  selectedItem?: IFinItem;
}

const initialState: FinState = {
  pageIndex: 'MAIN',
};

export const finSlice = createSlice({
  name: 'fin',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // increment: state => {
    //   state.value += 1;
    // },
    // decrement: state => {
    //   state.value -= 1;
    // },
    // // Use the PayloadAction type to declare the contents of `action.payload`
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
    selectItem: (state, action: PayloadAction<{ item: IFinItem }>) => {
      if (!action.payload.item.date) {
        action.payload.item.date = formatDateTime();
      }

      state.pageIndex = 'MAIN';
      state.selectedItem = action.payload.item;
    },
  },
});

export const { selectItem } = finSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.fin;

export default finSlice.reducer;

// const fin = (state = {}, action) => {
//   switch (action.type) {
//     case 'SELECT_ITEM':
//       if (!action.item.date) {
//         action.item.date = formatDateTime();
//       }
//       return {
//         ...state,
//         pageIndex: 'MAIN',
//         selectedItem: action.item,
//       };
//     case 'RESET_SELECTED_ITEM':
//       return {
//         ...state,
//         selectedItem: null,
//         updatedCatGroup: {},
//       };
//     case 'CREATE_ITEM':
//       let { category, subcategory } = getPreselectedCategories();
//       return {
//         ...state,
//         selectedItem: {
//           category,
//           subcategory,
//           date: formatDateTime(),
//           amount: 0,
//         },
//       };
//     case 'CHANGE_TO_CATEGORY_SELECTION':
//       return {
//         ...state,
//         selectedItem: action.currentItem || {},
//         pageIndex: 'CATEGORY_SELECTION',
//         selectedCatGroup: action.selectedCatGroup || {},
//       };
//     case 'CHANGE_TO_MAIN':
//       return {
//         ...state,
//         pageIndex: 'MAIN',
//         updatedCatGroup: action.updatedCatGroup || {},
//       };
//     case 'CATEGORY_SELECTION_DONE':
//       // Handle category group selection done case
//       // Need to return to template page when there is no selected item.
//       let targetPage = '';
//       if (state.selectedItem) {
//         targetPage = 'MAIN';
//       } else {
//         targetPage = 'FIN_TEMPLATE_LIST';
//       }
//       return {
//         ...state,
//         pageIndex: targetPage,
//         selectedCatGroup: {},
//         updatedCatGroup: action.updatedCatGroup || {},
//       };
//     case 'CHANGE_TO_FIN_HISTORY':
//       return {
//         ...state,
//         pageIndex: 'FIN_HISTORY',
//       };
//     case 'RESET_UPDATED_CAT_GROUP':
//       return {
//         ...state,
//         updatedCatGroup: {},
//       };
//     case 'CHANGE_TO_FIN_TEMPLATE_LIST':
//       return {
//         ...state,
//         pageIndex: 'FIN_TEMPLATE_LIST',
//         isCreatingTemplate: false,
//       };
//     case 'CREATE_TEMPLATE':
//       return {
//         ...state,
//         isCreatingTemplate: true,
//       };
//     case 'OPEN_SEARCH_FIN_MODE':
//       return {
//         ...state,
//         pageIndex: 'SEARCH_FIN_ITEM',
//       };
//     case 'APP_LOADING':
//       return {
//         ...state,
//         isAppLoading: true,
//       };
//     case 'APP_LOADED':
//       return {
//         ...state,
//         isAppLoading: false,
//       };
//     case 'COMMENT_LOADED':
//       return {
//         ...state,
//         comment: {
//           commentOptions: action.commentOptions,
//           placeOptions: action.placeOptions,
//           commentFullInfoOptions: action.commentFullInfoOptions,
//         },
//       };
//     case 'TAG_LOADED':
//       return {
//         ...state,
//         tag: action.tag,
//       };
//     default:
//       return state;
//   }
// };
