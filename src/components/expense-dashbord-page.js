import React from 'react';
import ExpenseList from './ExpensesList';
import ExpenseListFilters from './ExpenseListFilters';

const ExpensDashbordPage = () => (
  <div>
    <ExpenseListFilters/>
    <ExpenseList/>
  </div>
);

export default  ExpensDashbordPage