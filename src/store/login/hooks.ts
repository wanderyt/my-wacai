import { createSelector } from '@reduxjs/toolkit';
import { selectLogin } from '.';
import { WacaiStateSelector, useAppSelector } from '../';

export const selectLoginStatus: WacaiStateSelector<boolean> = createSelector(
  selectLogin,
  login => login.loginStatus
);

export const useLoginStatus = () => useAppSelector(selectLoginStatus);
