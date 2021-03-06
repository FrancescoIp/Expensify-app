import uuid from 'uuid';
import database from '../firebase/firebase';
import expenses from '../reducers/expenses';
// Prima di firebase-----
//componets calls action generator
//action generator returns object
//component dispatches object
//redux store changes

//dopo firebase----------
//component call action generator
//action generator returns function (redux need a module as support middleware to dispatch functions)
//component dispatches function
//function runs( has ability to dispatch other action or what he wants )


// ADD_EXPENSE
export const addExpense = (expense) => ({
  type: 'ADD_EXPENSE',
  expense
});

export const startAddExpense = (expenseData = {}) => {
  return (dispatch) => {
    const {
      description = '',
      note = '',
      amount = 0,
      createdAt = 0
    } = expenseData;
    const expense = { description, note, amount, createdAt }
    // it seems that firebase can't handle this asynchronous code, so changing to sync code
    const ref = database.ref('expenses').push(expense)
    dispatch(addExpense({
      id: ref.key,
      ...expense
    }))
    
    return ref
  };
};

// REMOVE_EXPENSE.
export const removeExpense = ({ id } = {}) => ({
  type: 'REMOVE_EXPENSE',
  id
});

// EDIT_EXPENSE. nessun valore di default perchè non serve
export const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
});