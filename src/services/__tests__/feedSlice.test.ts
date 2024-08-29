import { describe, expect, test } from '@jest/globals';
import constructorSlice, { initialState, getFeeds } from '../slices/feedSlice';

describe('тестирование асинхронного экшена getFeeds', () => {
  test('экшен начала запроса', () => {
    const action = {
      type: getFeeds.pending.type
    };
    const newState = constructorSlice(initialState, action);
    expect(newState.loading).toBe(true);
    expect(newState.error).toBe(null);
  });
  test('экшен ошибки запроса', () => {
    const action = {
      type: getFeeds.rejected.type,
      error: { message: 'error' }
    };
    const newState = constructorSlice(initialState, action);
    expect(newState.loading).toBe(false);
    expect(newState.error).toBe('error');
  });
  test('экшен успешного выполнения запроса', () => {
    const action = {
      type: getFeeds.fulfilled.type,
      payload: {
        orders: [{ test: 'test' }],
        total: 10,
        totalToday: 1
      }
    };
    const newState = constructorSlice(initialState, action);
    expect(newState.loading).toBe(false);
    expect(newState.error).toBe(null);
    expect(newState.total).toBe(action.payload.total);
    expect(newState.totalToday).toBe(action.payload.totalToday);
    expect(newState.orders).toEqual(action.payload.orders);
  });
});
