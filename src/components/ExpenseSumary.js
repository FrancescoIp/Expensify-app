import React from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';
import selectExpense from '../selectors/expenses';
import selectExpenseTotal from '../selectors/expenses-total';

export const ExpenseSumary = ({expenseCount, expensesTotal}) => {
  const expenseWord = expenseCount === 1 ? 'expense' : 'expenses'
  const total = numeral(expensesTotal / 100).format('$0,0.00')
  return (
    <div>
      <h3>Viewing {expenseCount} {expenseWord}. Total: {total}</h3>
    </div>
  )
};

const mapStateToProps = (state) => {
  const visibleExpenses = selectExpense(state.expenses, state.filters) 
  return {
    expenseCount: visibleExpenses.length,
    expensesTotal: selectExpenseTotal(visibleExpenses)
  } 
}

export default connect(mapStateToProps)(ExpenseSumary);