import React from 'react';
import ExpenseList from './ExpensesList';
import ExpenseListFilters from './ExpenseListFilters';
import ExpenseSumary from './ExpenseSumary';

const ExpensDashbordPage = () => (
  <div>
    <ExpenseSumary/>
    <ExpenseListFilters/>
    <ExpenseList/>
  </div>
);

export default  ExpensDashbordPage