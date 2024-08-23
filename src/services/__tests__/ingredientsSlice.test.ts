import { describe, expect, test } from '@jest/globals';
import ingredientsSlice, {
  initialState,
  getIngredients
} from '../slices/ingredientsSlice';

describe('тестирование асинхронного экшена getIngredients', () => {
  test('экшен начала запроса', () => {
    const action = {
      type: getIngredients.pending.type
    };
    const newState = ingredientsSlice(initialState, action);
    expect(newState.isLoading).toBe(true);
    expect(newState.error).toBe(null);
  });
  test('экшен ошибки запроса', () => {
    const action = {
      type: getIngredients.rejected.type,
      error: { message: 'error' }
    };
    const newState = ingredientsSlice(initialState, action);
    expect(newState.isLoading).toBe(false);
    expect(newState.error).toBe('error');
  });
  test('экшен успешного выполнения запроса', () => {
    const action = {
      type: getIngredients.fulfilled.type,
      payload: [{ test: 'test' }]
    };
    const newState = ingredientsSlice(initialState, action);
    expect(newState.isLoading).toBe(false);
    expect(newState.error).toBe(null);
    expect(newState.data).toEqual(action.payload);
  });
});
