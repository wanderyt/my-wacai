import { createSelector } from '@reduxjs/toolkit';
import { ICommentListDetails, PageType, selectFin } from '.';
import { WacaiStateSelector, useAppSelector } from '../';
import { ICategoryGroup, IFinItem } from '../../utils/gql-client/props';

export const selectFinItem: WacaiStateSelector<Partial<IFinItem>> =
  createSelector(selectFin, fin => fin.selectedItem);
export const selectPageIndex: WacaiStateSelector<PageType> = createSelector(
  selectFin,
  fin => fin.pageIndex
);
export const selectUpdatedCatGroup: WacaiStateSelector<ICategoryGroup | {}> =
  createSelector(selectFin, fin => fin.updatedCatGroup);
export const selectSelectedCatGroup: WacaiStateSelector<ICategoryGroup | {}> =
  createSelector(selectFin, fin => fin.selectedCatGroup);
export const selectCommentList: WacaiStateSelector<ICommentListDetails> =
  createSelector(selectFin, fin => fin.commentList);
export const selectTagList: WacaiStateSelector<string[]> = createSelector(
  selectFin,
  fin => fin.tagList
);

export const useSelectedItem = () => useAppSelector(selectFinItem);
export const usePageType = () => useAppSelector(selectPageIndex);
export const useUpdatedCatGroup = () => useAppSelector(selectUpdatedCatGroup);
export const useSelectedCatGroup = () => useAppSelector(selectSelectedCatGroup);
export const useCommentList = () => useAppSelector(selectCommentList);
export const useTagList = () => useAppSelector(selectTagList);
