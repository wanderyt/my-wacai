import { finSlice } from './fin/index';
import { loginSlice } from './login/index';
import { combineReducers, configureStore, Selector } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

const combinedReducer = combineReducers({
  fin: finSlice.reducer,
  login: loginSlice.reducer,
});

const store = configureStore({
  reducer: combinedReducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type WacaiStateSelector<T> = Selector<RootState, T>;
