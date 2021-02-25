import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseSumary } from '../../components/ExpenseSumary';

test('Should render correctly expenseSumary with 1 expense', () => {
  const wrapper = shallow(<ExpenseSumary expenseCount={1} expensesTotal={233}/>);
  expect(wrapper).toMatchSnapshot()
});

test('Should render correctly expenseSumary with 2 expenses', () => {
  const wrapper = shallow(<ExpenseSumary expenseCount={44} expensesTotal={232356623}/>)
  expect(wrapper).toMatchSnapshot()
});