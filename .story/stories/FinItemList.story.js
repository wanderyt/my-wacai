import React from 'react';
import MonthExpense from '../../src/modules/fin-item-list/month-expense';
import DayExpense from '../../src/modules/fin-item-list/day-expense';
import HeaderToolbar from '../../src/modules/header-toolbar';
import FinItemList from '../../src/modules/fin-item-list';
import {storiesOf} from '@storybook/react';
import StoreProvider from '../util/storeHelper';

const dayExpenseItems = [{
  id: '893E5F3263FB4FF89A00464B87630A26',
  category: '周中',
  subcategory: '晚餐',
  amount: 103.6,
  comment: '紫燕百味鸡',
  date: '2019-04-10 19:34:02',
}, {
  id: '893E5F3263FB4FF89A00464B87630A21',
  category: '周中',
  subcategory: '晚餐',
  amount: 103.6,
  comment: '紫燕百味鸡',
  date: '2019-04-10 19:34:02',
}, {
  id: '893E5F3263FB4FF89A00464B87630A22',
  category: '周中',
  subcategory: '晚餐',
  amount: 103.6,
  comment: '紫燕百味鸡',
  date: '2019-04-10 19:34:02',
}, {
  id: '893E5F3263FB4FF89A00464B87630A23',
  category: '周中',
  subcategory: '晚餐',
  amount: 103.6,
  comment: '紫燕百味鸡',
  date: '2019-04-10 19:34:02',
}, {
  id: '893E5F3263FB4FF89A00464B87630A24',
  category: '周中',
  subcategory: '晚餐',
  amount: 103.6,
  comment: '紫燕百味鸡',
  date: '2019-04-10 19:34:02',
}];

const monthExpenseItems = [{
  "date": "2019-02-20",
  "amount": 1201,
  "items": [{
    "id": "893E5F3263FB4FF89A00464B87630A261",
    "category": "周中",
    "subcategory": "晚餐",
    "amount": 103.6,
    "comment": "紫燕百味鸡",
    "date": "2019-02-10 19:34:02"
  }, {
    "id": "893E5F3263FB4FF89A00464B87630A262",
    "category": "周中",
    "subcategory": "晚餐",
    "amount": 103.6,
    "comment": "紫燕百味鸡",
    "date": "2019-02-10 19:34:02"
  }, {
    "id": "893E5F3263FB4FF89A00464B87630A263",
    "category": "周中",
    "subcategory": "晚餐",
    "amount": 103.6,
    "comment": "紫燕百味鸡",
    "date": "2019-02-10 19:34:02"
  }]
}, {
  "date": "2019-02-24",
  "amount": 1201,
  "items": [{
    "id": "893E5F3263FB4FF89A00464B87630A264",
    "category": "周中",
    "subcategory": "晚餐",
    "amount": 103.6,
    "comment": "紫燕百味鸡",
    "date": "2019-02-10 19:34:02"
  }, {
    "id": "893E5F3263FB4FF89A00464B87630A265",
    "category": "周中",
    "subcategory": "晚餐",
    "amount": 103.6,
    "comment": "紫燕百味鸡",
    "date": "2019-02-10 19:34:02"
  }, {
    "id": "893E5F3263FB4FF89A00464B87630A266",
    "category": "周中",
    "subcategory": "晚餐",
    "amount": 103.6,
    "comment": "紫燕百味鸡",
    "date": "2019-02-10 19:34:02"
  }]
}];

storiesOf('Fin Item List', module)
  .add('Month header', () => (
    <StoreProvider>
      <div style={{
        margin: '0 20px'
      }}>
        <MonthExpense
          amount={18427.1}
          barWidthRatio={1}
          dayItems={monthExpenseItems} />
      </div>
    </StoreProvider>
  ))
  .add('Month header with 80 percentage', () => (
    <StoreProvider>
      <div style={{
        margin: '0 20px'
      }}>
        <MonthExpense
          amount={12373}
          barWidthRatio={0.74}
          dayItems={monthExpenseItems} />
      </div>
    </StoreProvider>
  ))
  .add('Day expense panel', () => (
    <StoreProvider>
      <div style={{
        margin: '0 20px'
      }}>
        <DayExpense
          day='2019-04-22'
          isLast={true}
          amount={12373} />
      </div>
    </StoreProvider>
  ))
  .add('Day expense panel with items', () => (
    <StoreProvider>
      <div style={{
        margin: '0 20px'
      }}>
        <DayExpense
          day='2019-04-22'
          isLast={true}
          amount={12373}
          items={dayExpenseItems} />
      </div>
    </StoreProvider>
  ))
  .add('List toolbar', () => (
    <StoreProvider>
      <div style={{
        margin: '0 20px'
      }}>
        <HeaderToolbar
          barTitle='所有支出记录' />
      </div>
    </StoreProvider>
  ))
  .add('Fin item list', () => (
    <StoreProvider>
      <div style={{
        margin: '0 20px'
      }}>
        <FinItemList />
      </div>
    </StoreProvider>
  ));
