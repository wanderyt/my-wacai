import { FinState } from './index';
import { RootState, useAppSelector } from '../';

export const selectFin = useAppSelector((state: RootState) => state.fin);
export const useSelectedItem = useAppSelector(state => state.fin.selectedItem);
