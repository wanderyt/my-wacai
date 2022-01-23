import { formatDateTime, getPreselectedCategories } from '../../utils/helper';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICategoryGroup, IFinItem } from '../../utils/gql-client/props';
import { RootState } from '..';
import { PageType, ICommentListDetails, FinState, finSlice } from '../fin';

export interface LoginState {
  loginStatus: boolean;
}

const initialState: LoginState = {
  loginStatus: false,
};

export const loginSlice = createSlice({
  name: 'login',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setLoginStatus: (state, action: PayloadAction<boolean>) => {
      state.loginStatus = action.payload;
    },
  },
});

export const { setLoginStatus } = loginSlice.actions;

export const selectLogin = (state: RootState): LoginState => state.login;

export default loginSlice.reducer;

// const login = (state = {}, action) => {
//   switch (action.type) {
//     case 'TOKEN_INVALID':
//       return {
//         ...state,
//         loginStatus: false
//       }
//     default:
//       return state;
//   }
// };

// export default login;
