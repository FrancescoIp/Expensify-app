import filtersReducer from '../../reducers/filters';
import moment from 'moment'

test('should setup default filters value', () => {
  const state = filtersReducer(undefined, {type: '@@INIT'});
  expect(state).toEqual({
    text: '',
    sortBy: 'date',
    startDate: moment().startOf('Month'),
    endDate: moment().endOf('Month')
  });
});

test('should set sortBy to amount', () => {
  const state = filtersReducer(undefined, {type: 'SORT_BY_AMOUNT'});
  expect(state.sortBy).toBe('amount')
});

test('shoul set sortBy to date', () => {
  const currentState = {
     text:'',
     startDate: undefined,
     endDate: undefined,
     sortBy: 'amount'
  };
  const action = {type: 'SORT_BY_DATE'};
  const state = filtersReducer(currentState, action);
  expect(state.sortBy).toBe('date')
});

test('should set text to given text', () => {
  const action = {type: 'SET_TEXT_FILTER', text: 'text to set'};
  const state = filtersReducer(undefined, action);
  expect(state.text).toBe(action.text)
});

test('should set start date to given date', () => {
  const action = {type: 'SET_START_DATE', startDate:moment().add(1, 'days')};
  const state = filtersReducer(undefined, action);
  expect(state.startDate).toBe(action.startDate)
});

test('should set end date to given date', () => {
  const action = {type: 'SET_END_DATE', endtDate:moment().add(1, 'days')};
  const state = filtersReducer(undefined, action);
  expect(state.endDate).toBe(action.endDate)
});