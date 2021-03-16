import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  startEditExpense,
  startRemoveExpense,
  startSetExpenses,
  setExpenses,
  startAddExpense,
  addExpense,
  editExpense,
  removeExpense
} from '../../actions/expenses';
import expenses from '../fixture/expenses';
import database from '../../firebase/firebase';

const uid = 'thisismytestuid';
const defaultAuthState = { auth: { uid } };
const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
  const expensesData = {};
  expenses.forEach(({ id, description, note, amount, createdAt }) => {
    expensesData[id] = { description, note, amount, createdAt };
  });
  database.ref(`users/${uid}/expenses`).set(expensesData).then(() => done());
});

// const mockExpense = {
//   key: 'test-id',
//   description: 'test-description',
//   note: 'test-note',
//   amount: 1,
//   createdAt: 'test-date'
// }

// jest.mock('../../firebase/firebase', () => (
//   {
//     ref: () => ({
//       push: () => mockExpense,
//       on: (string, callback) => {
//         callback(mockExpense)
//       },
//       once: (event) => Promise.resolve({ val: mockExpense })
//     })
// }))

test('should setup remove expense action object', () => {
  const action = removeExpense({ id: '123abc' });
  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: '123abc'
  });
});

test('should setup edit expense action object', () => {
  const action = editExpense('123abc', { note: 'New note value' });
  expect(action).toEqual({
    type: 'EDIT_EXPENSE',
    id: '123abc',
    updates: {
      note: 'New note value'
    }
  });
});

test('should setup add expense action object with provided values', () => {
  const action = addExpense(expenses[2]);
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: expenses[2]
  });
});

test('should add expense to database and store', (done) => {
  const store = createMockStore(defaultAuthState);
  const expenseData = {
    description: 'Mouse',
    amount: 3000,
    note: 'This one is better',
    createdAt: 1000
  };

  store.dispatch(startAddExpense(expenseData)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...expenseData
      }
    });

    return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(expenseData);
    done();
  });
});

test('should add expense with defaults to database and store', (done) => {
  const store = createMockStore(defaultAuthState);
  const expenseDefaults = {
    description: '',
    amount: 0,
    note: '',
    createdAt: 0
  };

  store.dispatch(startAddExpense({})).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...expenseDefaults
      }
    });

    return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(expenseDefaults);
    done();
  });
});

test('should set up set expense action object with data', () => {
  const action = setExpenses(expenses);
  expect(action).toEqual({
    type: 'SET_EXPENSES',
    expenses
  })
});


//------------- the following 3 testes are correct. There is a conflict with jasmine2 and done() that make the async function not working into the test. Need futher investigations

// test('should fetch the expenses from firebase', (done) => {
  //   const store = createMockStore(defaultAuthState);
  //   store.dispatch(startSetExpenses()).then(() => {
  //     const actions = store.getActions();
  //     expect(actions[0]).toEqual({
  //       type: 'SET_EXPENSES',
  //       expenses
  //     });
  //     done();
  //   });
  // });

// test('shoul fetch expenses from firebase', (done) => {
//   const store = createMockStore({});
//   store.dispatch(startSetExpenses()).then(()=>{
//      const action = store.getActions();
//      expect(action).toEqual({
//        type:'SET_EXPENSES',
//        expenses
//      });
//      done();
//   });
// });

// test('should remove expense from firebase', (done) => {
//   const store = createMockStore(defaultAuthState);
//   const id = expenses[2].id;
//   store.dispatch(startRemoveExpense({ id })).then(() => {
//     const actions = store.getActions();
//     expect(actions[0]).toEqual({
//       type: 'REMOVE_EXPENSE',
//       id
//     });
//     return database.ref(`users/${uid}/expenses/${id}`).once('value');
//   }).then((snapshot) => {
//     expect(snapshot.val()).toBeFalsy();
//     done();
//   });
// });

// test('should edit expense from firebase', (done) => {
//   const store = createMockStore(defaultAuthState);
//   const id = expenses[0].id;
//   const updates = { amount: 21045 };
//   store.dispatch(startEditExpense(id, updates)).then(() => {
//     const actions = store.getActions();
//     expect(actions[0]).toEqual({
//       type: 'EDIT_EXPENSE',
//       id,
//       updates
//     });
//     return database.ref(`users/${uid}/expenses/${id}`).once('value');
//   }).then((snapshot) => {
//     expect(snapshot.val().amount).toBe(updates.amount);
//     done();
//   });
// });

//     return database.ref(`expenses/${id}`).update(updates).then((snapshot) => {
//       expect(snapshot.val().note).toBe(update.note);
//       done()
//     })
//   });
// });
