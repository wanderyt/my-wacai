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
  isAppLoading: boolean;
  isCreatingTemplate: boolean;
}

const initialState: FinState = {
  pageIndex: 'MAIN',
  selectedItem: null,
  updatedCatGroup: {},
  selectedCatGroup: {},
  isAppLoading: false,
  isCreatingTemplate: false,
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
        currentItem?: Partial<IFinItem>;
        selectedCatGroup: ICategoryGroup;
      }>
    ) => {
      if (action.payload.currentItem) {
        state.selectedItem = action.payload.currentItem;
      }

      state.pageIndex = 'CATEGORY_SELECTION';
      state.selectedCatGroup = action.payload.selectedCatGroup;
    },
    switchToMain: (
      state,
      action: PayloadAction<{
        updatedCatGroup: ICategoryGroup;
      }>
    ) => {
      state.pageIndex = 'MAIN';
      state.updatedCatGroup = action.payload.updatedCatGroup;
    },
    completeCategorySelection: (
      state,
      action: PayloadAction<{
        updatedCatGroup: ICategoryGroup;
      }>
    ) => {
      // Handle category group selection done case
      // Need to return to template page when there is no selected item.
      let targetPage: PageType;
      if (state.selectedItem) {
        targetPage = 'MAIN';
      } else {
        targetPage = 'FIN_TEMPLATE_LIST';
      }

      state.pageIndex = targetPage;
      state.selectedCatGroup = {};
      state.updatedCatGroup = action.payload.updatedCatGroup || {};
    },
    switchToFinHistory: state => {
      state.pageIndex = 'FIN_HISTORY';
    },
    resetUpdatedCatGroup: state => {
      state.updatedCatGroup = {};
    },
    switchToTemplateList: state => {
      state.pageIndex = 'FIN_TEMPLATE_LIST';
      state.isCreatingTemplate = false;
    },
    createTemplate: state => {
      state.isCreatingTemplate = true;
    },
    switchToSearchFinMode: state => {
      state.pageIndex = 'SEARCH_FIN_ITEM';
    },
    setAppLoading: state => {
      state.isAppLoading = true;
    },
    setAppLoaded: state => {
      state.isAppLoading = false;
    },
    setCommentLoaded: (
      state,
      action: PayloadAction<{
        commentData: ICommentListDetails;
      }>
    ) => {
      state.commentList = {
        commentOptions: action.payload.commentData.commentOptions,
        placeOptions: action.payload.commentData.placeOptions,
        commentFullInfoOptions:
          action.payload.commentData.commentFullInfoOptions,
      };
    },
  },
});

export const {
  setSelectedItem,
  resetSelectedItem,
  buildDraftFinItem,
  switchToCategorySelection,
  switchToMain,
  completeCategorySelection,
  switchToFinHistory,
  resetUpdatedCatGroup,
  switchToTemplateList,
  createTemplate,
  switchToSearchFinMode,
  setAppLoading,
  setAppLoaded,
  setCommentLoaded,
} = finSlice.actions;

export const selectFin = (state: RootState): FinState => state.fin;

export default finSlice.reducer;

// const fin = (state = {}, action) => {
//   switch (action.type) {
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
