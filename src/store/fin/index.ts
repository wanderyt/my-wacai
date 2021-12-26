import { formatDateTime, getPreselectedCategories } from '../../utils/helper';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICategoryGroup, IFinItem } from '../../utils/gql-client/props';
import { RootState } from '..';

export type PageType =
  | 'MAIN'
  | 'CATEGORY_SELECTION'
  | 'FIN_TEMPLATE_LIST'
  | 'FIN_HISTORY'
  | 'SEARCH_FIN_ITEM'
  | 'FIN_TEMPLATE_LIST';

export interface ICommentListDetails {
  commentOptions: Array<Pick<IFinItem, 'comment' | 'date'>>;
  placeOptions: string[];
  commentFullInfoOptions: Array<
    Pick<IFinItem, 'category' | 'comment' | 'place' | 'subcategory'>
  >;
}

export interface FinState {
  pageIndex: PageType;
  selectedItem?: Partial<IFinItem>;
  updatedCatGroup: ICategoryGroup | {};
  selectedCatGroup: ICategoryGroup | {};
  commentList?: ICommentListDetails;
  tagList?: string[];
}

const initialState: FinState = {
  pageIndex: 'MAIN',
  selectedItem: null,
  updatedCatGroup: {},
  selectedCatGroup: {},
};

export const finSlice = createSlice({
  name: 'fin',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setSelectedItem: (
      state,
      action: PayloadAction<{ item: Partial<IFinItem> }>
    ) => {
      if (!action.payload.item.date) {
        action.payload.item.date = formatDateTime();
      }

      state.pageIndex = 'MAIN';
      state.selectedItem = action.payload.item;
    },
    resetSelectedItem: state => {
      state.selectedItem = null;
      state.updatedCatGroup = {};
    },
    buildDraftFinItem: state => {
      let { category, subcategory } = getPreselectedCategories();
      state.selectedItem = {
        category,
        subcategory,
        date: formatDateTime(),
        amount: 0,
      };
    },
    switchToCategorySelection: (
      state,
      action: PayloadAction<{
        currentItem: Partial<IFinItem>;
        selectedCatGroup: ICategoryGroup;
      }>
    ) => {
      state.selectedItem = action.payload.currentItem;
      state.pageIndex = 'CATEGORY_SELECTION';
      state.selectedCatGroup = action.payload.selectedCatGroup;
    },
  },
});

export const {
  setSelectedItem,
  resetSelectedItem,
  buildDraftFinItem,
  switchToCategorySelection,
} = finSlice.actions;

export const selectFin = (state: RootState): FinState => state.fin;

export default finSlice.reducer;

// const fin = (state = {}, action) => {
//   switch (action.type) {
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
