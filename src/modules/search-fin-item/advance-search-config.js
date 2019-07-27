import {KeywordsSelectionPanel} from './advance-search-option-panel';

export const ADVANCE_SEARCH_ITEMS = [{
  type: 'dateRange',
  name: '日期'
}, {
  type: 'amountRange',
  name: '金额'
}, {
  type: 'category',
  name: '类别'
}, {
  type: 'subcategory',
  name: '小类'
}, {
  type: 'keyword',
  name: '关键字',
  comp: KeywordsSelectionPanel
}];
