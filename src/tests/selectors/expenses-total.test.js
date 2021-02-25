import expenses from '../fixture/expenses'
import getExpensesTotal from '../../selectors/expenses-total';

test('should return 0 if not expenses', () => {
  const result = getExpensesTotal([])
  expect(result).toBe(0)
});

test('should return correctly one expense', () => {
  const result = getExpensesTotal([expenses[0]])
  expect(result).toBe(195)
});

test('should return correctly more expenses', () => {
  const result = getExpensesTotal(expenses)
  expect(result).toBe(114195)
});