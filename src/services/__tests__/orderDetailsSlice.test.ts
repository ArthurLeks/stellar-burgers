import { describe, expect, test } from '@jest/globals';
import orderDetailsSlice, {
  initialState,
  getOrderByNumber
} from '../slices/orderDetailsSlice';

describe('тестирование асинхронного экшена getOrderByNumber', () => {
  test('экшен начала запроса', () => {
    const action = {
      type: getOrderByNumber.pending.type
    };
    const newState = orderDetailsSlice(initialState, action);
    expect(newState.isLoading).toBe(true);
    expect(newState.error).toBe(null);
  });
  test('экшен ошибки запроса', () => {
    const action = {
      type: getOrderByNumber.rejected.type,
      error: { message: 'error' }
    };
    const newState = orderDetailsSlice(initialState, action);
    expect(newState.isLoading).toBe(false);
    expect(newState.error).toBe('error');
  });
  test('экшен успешного выполнения запроса', () => {
    const action = {
      type: getOrderByNumber.fulfilled.type,
      payload: { orders: [{ test: 'test' }] }
    };
    const newState = orderDetailsSlice(initialState, action);
    expect(newState.isLoading).toBe(false);
    expect(newState.error).toBe(null);
    expect(newState.data).toEqual(action.payload.orders[0]);
  });
});
