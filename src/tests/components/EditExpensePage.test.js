import React from 'react';
import { shallow } from 'enzyme';
import expenses from '../fixture/expenses';
import { EditExpensePage } from '../../components/EditExpensePage';

let editExpense, startRemoveExpense, history, wrapper;

beforeEach(() => {
  editExpense = jest.fn();
  startRemoveExpense = jest.fn();
  history = { push: jest.fn() };
  wrapper = shallow(
    <EditExpensePage
      editExpense={editExpense}
      startRemoveExpense={startRemoveExpense}
      history={history}
      expense={expenses[2]}
    />
  );
});

test('should render EditExpensePage', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should handle edit expense', () => {
  wrapper.find('ExpenseForm').prop('onSubmit')(expenses[2]);
  expect(history.push).toHaveBeenCalledWith('/');
  expect(editExpense).toHaveBeenCalledWith(expenses[2].id, expenses[2]);
});

test('should handle startRemoveExpense', () => {
  wrapper.find('button').prop('onClick')(expenses[2]);
  expect(history.push).toHaveBeenCalledWith('/');
  expect(startRemoveExpense).toHaveBeenCalledWith({ id: expenses[2].id });
});
