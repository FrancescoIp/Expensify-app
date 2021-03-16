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
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const {
      description = '',
      note = '',
      amount = 0,
      createdAt = 0
    } = expenseData;
    const expense = { description, note, amount, createdAt }
    // it seems that firebase can't handle this asynchronous code, so changing to sync code
    const ref = database.ref(`users/${uid}/expenses`).push(expense);
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

export const startRemoveExpense = ({ id } = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid
    return database.ref(`users/${uid}/expenses/${id}`).remove().then(() => {
      dispatch(removeExpense({ id }))
    });
  };
};

// EDIT_EXPENSE. nessun valore di default perchè non serve
export const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
});


export const startEditExpense = (id, updates = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid
    return database.ref(`users/${uid}/expenses/${id}`).update(updates).then(() => {
      dispatch(editExpense(id, updates))
    });
  };
};

// SET_EXPENSES
export const setExpenses = (expenses) => ({
  type: 'SET_EXPENSES',
  expenses
})


export const startSetExpenses = () => {
  return (dispatch, getState) => {
    //1. fetch all expenses of the logged user
    const uid = getState().auth.uid
    return database.ref(`users/${uid}/expenses`).once('value').then((snapshot) => {
      //2. Parse expenses into an array
      const expenses = [];

      snapshot.forEach((childSnapshot) => {
        expenses.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });
      });
      //3. dispatch setExpenses with that array
      dispatch(setExpenses(expenses));
    });
  };
};


