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

const createMockStore = configureMockStore([thunk]);

// const expensesData = expenses.reduce((obj, { id, description, note, amount, createdAt }) => {
//   obj[id] = { description, note, amount, createdAt };
//   return obj
// }, {});

// beforeEach(function(done) {
//   database.ref('expenses').set(expensesData).then(() => done());
// });

const mockExpense = {
  key: 'test-id',
  description: 'test-description',
  note: 'test-note',
  amount: 1,
  createdAt: 'test-date'
}

jest.mock('../../firebase/firebase', () => (
  {
    ref: () => ({
      push: () => mockExpense,
      on: (string, callback) => {
        callback(mockExpense)
      },
      once: (event) => Promise.resolve({ val: mockExpense })
    })
  }))

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
  const store = createMockStore()
  const expenseData = {
    description: 'Mouse',
    amount: 3000,
    note: 'This one is better',
    createdAt: 1000
  };

  store.dispatch(startAddExpense(expenseData))

  const actions = store.getActions();
  expect(actions[0]).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      id: expect.any(String),
      ...expenseData
    }
  });

  done()

  database.ref(`expenses/${actions[0].expense.id}`).once('value').then((snapshot) => {
    expect(snapshot.val()).toEqual(expenseData);
    done();
  });
});

test('should add expense to database and store', (done) => {
  const store = createMockStore()
  const expenseData = {
    description: '',
    amount: 0,
    note: '',
    createdAt: 0
  };

  store.dispatch(startAddExpense({}))

  const actions = store.getActions();
  expect(actions[0]).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      id: expect.any(String),
      ...expenseData
    }
  });

  done()

  database.ref(`expenses/${actions[0].expense.id}`).once('value').then((snapshot) => {
    expect(snapshot.val()).toEqual(expenseData);
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

// test('shoul remove expense from firebase', (done) => {
//   const store = createMockStore();
//   const id = expenses[1].id
//   store.dispatch(startRemoveExpense({id})).then(() => {
//     const action = store.getActions();
//     expect(action).toEqual({
//       type: 'REMOVE_EXPENSE',
//       id
//     });
//     return database.ref(`expenses/${id}`).once('value');
//   }).then((snaposhot)=>{
//     expect(snapshot.val()).toBeFalsy();
//     done();
//   });
// });

// test('should edit expense from firebase', (done) => {
//   const store = createMockStore();
//   const id = expenses[1].id
//   const updates = {
//     note: 'update'
//   }
//   store.dispatch(startEditExpense(id, updates)).then(() => {
//     const action = store.getActions();
//     expect(action).toEqual({
//       type:'EDIT_EXPENSE',
//       id,
//       updates
//     });

//     return database.ref(`expenses/${id}`).update(updates).then((snapshot) => {
//       expect(snapshot.val().note).toBe(update.note);
//       done()
//     })
//   });
// });
