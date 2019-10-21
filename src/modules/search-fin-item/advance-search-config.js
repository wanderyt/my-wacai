import {KeywordsSelectionPanel, CategorySelectionPanel, AmountRangeSelectionPanel} from './advance-search-option-panel';

export const ADVANCE_SEARCH_ITEMS = [{
  type: 'dateRange',
  name: '日期'
}, {
  type: 'amountRanges',
  name: '金额',
  defaultValue: '',
  comp: AmountRangeSelectionPanel,
  formatter: (amountRanges) => {
    let validAmountRanges = amountRanges.map(({minAmount, maxAmount}) => {
      if (+maxAmount === 0) {
        return `>= ${minAmount}`;
      } else {
        return `${minAmount} - ${maxAmount}`;
      }
    });
    return validAmountRanges.join(', ');
  }
}, {
  type: 'category',
  name: '类别',
  defaultValue: '全部',
  comp: CategorySelectionPanel,
  formatter: ({category, subcategory}) => {
    return `${category} - ${subcategory}`;
  }
}, {
  type: 'keyword',
  name: '关键字',
  defaultValue: '',
  comp: KeywordsSelectionPanel,
  formatter: (value) => {
    return value;
  }
}];
