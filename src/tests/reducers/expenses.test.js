import expensesReducer from '../../reducers/expenses';
import expenses from '../fixture/expenses';


test('should set default state', () => {
  const state = expensesReducer(undefined, {type: '@@INIT'});
  expect(state).toEqual([])
});

test('should remove expense by id', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: expenses[1].id
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([expenses[0],expenses[2]]);
});

test('should not remove expense by id if id is not found', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: '-1'
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});

test('should add an expense', () => {
  const expense = {
    id: '4',
    description: 'Expense to add',
    note: '',
    amount: 45000,
    createdAt: 3000
  }
  const action = {
    type: 'ADD_EXPENSE',
    expense
  }
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([...expenses,expense])
});

test('Should edit expense of the given id', () => {
  const action = {
    type: 'EDIT_EXPENSE',
    id: '2',
    updates: {
      note: 'to update'
    }
  }
  const state = expensesReducer(expenses, action)
  expect(state[1].note).toBe('to update')
});

test('Should not edit expense if id not found', () => {
  const action = {
    type: 'EDIT_EXPENSE',
    id: '-1',
    updates: {
      note: 'to update'
    }
  }
  const state = expensesReducer(expenses, action)
  expect(state).toEqual(expenses)
});