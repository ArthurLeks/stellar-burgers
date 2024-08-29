import store, { rootReducer } from '../store';

test('проверка работы rootReducer', () => {
  const res = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
  const expected = store.getState();
  expect(res).toEqual(expected);
});
