import {KeywordsSelectionPanel, CategorySelectionPanel, AmountRangeSelectionPanel, DateRangeSelectionPanel} from './advance-search-option-panel';
import {formatDateObject} from '../../utils/helper';

export const ADVANCE_SEARCH_ITEMS = [{
  type: 'dateRange',
  name: '日期',
  defaultValue: '全部',
  comp: DateRangeSelectionPanel,
  formatter: (dateRange) => {
    if (dateRange.minDate && dateRange.maxDate) {
      let minDate = typeof dateRange.minDate === 'object' ? formatDateObject(dateRange.minDate) : dateRange.minDate;
      let maxDate = typeof dateRange.maxDate === 'object' ? formatDateObject(dateRange.maxDate) : dateRange.maxDate;
      return `${minDate} - ${maxDate}`;
    } else {
      return '全部';
    }
  }
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
