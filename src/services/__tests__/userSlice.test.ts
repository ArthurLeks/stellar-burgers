import { describe, expect, test } from '@jest/globals';
import userSlice, {
  initialState,
  getUser,
  logout,
  loginUser,
  getOrders,
  forgotPassword,
  updateUser,
  registerUser,
  resetPassword
} from '../slices/userSlice';

describe('тестирование userSlice', () => {
  describe('тестирование асинхронного экшена getOrders', () => {
    test('экшен начала запроса', () => {
      const action = {
        type: getOrders.pending.type
      };
      const newState = userSlice(initialState, action);
      expect(newState.isLoading).toBe(true);
      expect(newState.error).toBe(null);
    });
    test('экшен ошибки запроса', () => {
      const action = {
        type: getOrders.rejected.type,
        error: { message: 'error' }
      };
      const newState = userSlice(initialState, action);
      expect(newState.isLoading).toBe(false);
      expect(newState.error).toBe('error');
    });
    test('экшен успешного выполнения запроса', () => {
      const action = {
        type: getOrders.fulfilled.type,
        payload: [{ test: 'test' }]
      };
      const newState = userSlice(initialState, action);
      expect(newState.isLoading).toBe(false);
      expect(newState.error).toBe(null);
      expect(newState.orders.data).toEqual(action.payload);
    });
  });

  describe('тестирование асинхронного экшена registerUser', () => {
    test('экшен начала запроса', () => {
      const action = {
        type: registerUser.pending.type
      };
      const newState = userSlice(initialState, action);
      expect(newState.isLoading).toBe(true);
      expect(newState.error).toBe(null);
    });
    test('экшен ошибки запроса', () => {
      const action = {
        type: registerUser.rejected.type,
        error: { message: 'error' }
      };
      const newState = userSlice(initialState, action);
      expect(newState.isLoading).toBe(false);
      expect(newState.error).toBe('error');
    });
    test('экшен успешного выполнения запроса', () => {
      const action = {
        type: registerUser.fulfilled.type,
        payload: {
          user: {
            email: 'testEmail',
            name: 'testName'
          }
        }
      };
      const newState = userSlice(initialState, action);
      expect(newState.isLoading).toBe(false);
      expect(newState.error).toBe(null);
      expect(newState.email).toBe(action.payload.user.email);
      expect(newState.name).toBe(action.payload.user.name);
    });
  });

  describe('тестирование асинхронного экшена loginUser', () => {
    test('экшен начала запроса', () => {
      const action = {
        type: loginUser.pending.type
      };
      const newState = userSlice(initialState, action);
      expect(newState.isLoading).toBe(true);
      expect(newState.error).toBe(null);
    });
    test('экшен ошибки запроса', () => {
      const action = {
        type: loginUser.rejected.type,
        error: { message: 'error' }
      };
      const newState = userSlice(initialState, action);
      expect(newState.isLoading).toBe(false);
      expect(newState.error).toBe('error');
    });
    test('экшен успешного выполнения запроса', () => {
      const action = {
        type: loginUser.fulfilled.type,
        payload: {
          user: {
            email: 'testEmail',
            name: 'testName'
          }
        }
      };
      const newState = userSlice(initialState, action);
      expect(newState.isLoading).toBe(false);
      expect(newState.error).toBe(null);
      expect(newState.email).toBe(action.payload.user.email);
      expect(newState.name).toBe(action.payload.user.name);
    });
  });

  describe('тестирование асинхронного экшена forgotPassword', () => {
    test('экшен начала запроса', () => {
      const action = {
        type: forgotPassword.pending.type
      };
      const newState = userSlice(initialState, action);
      expect(newState.isLoading).toBe(true);
      expect(newState.error).toBe(null);
    });
    test('экшен ошибки запроса', () => {
      const action = {
        type: forgotPassword.rejected.type,
        error: { message: 'error' }
      };
      const newState = userSlice(initialState, action);
      expect(newState.isLoading).toBe(false);
      expect(newState.error).toBe('error');
    });
    test('экшен успешного выполнения запроса', () => {
      const action = {
        type: forgotPassword.fulfilled.type
      };
      const newState = userSlice(initialState, action);
      expect(newState.isLoading).toBe(false);
      expect(newState.error).toBe(null);
    });
  });

  describe('тестирование асинхронного экшена resetPassword', () => {
    test('экшен начала запроса', () => {
      const action = {
        type: resetPassword.pending.type
      };
      const newState = userSlice(initialState, action);
      expect(newState.isLoading).toBe(true);
      expect(newState.error).toBe(null);
    });
    test('экшен ошибки запроса', () => {
      const action = {
        type: resetPassword.rejected.type,
        error: { message: 'error' }
      };
      const newState = userSlice(initialState, action);
      expect(newState.isLoading).toBe(false);
      expect(newState.error).toBe('error');
    });
    test('экшен успешного выполнения запроса', () => {
      const action = {
        type: resetPassword.fulfilled.type
      };
      const newState = userSlice(initialState, action);
      expect(newState.isLoading).toBe(false);
      expect(newState.error).toBe(null);
    });
  });

  describe('тестирование асинхронного экшена getUser', () => {
    test('экшен начала запроса', () => {
      const action = {
        type: getUser.pending.type
      };
      const newState = userSlice(initialState, action);
      expect(newState.isLoading).toBe(true);
      expect(newState.error).toBe(null);
    });
    test('экшен ошибки запроса', () => {
      const action = {
        type: getUser.rejected.type,
        error: { message: 'error' }
      };
      const newState = userSlice(initialState, action);
      expect(newState.isLoading).toBe(false);
      expect(newState.error).toBe('error');
    });
    test('экшен успешного выполнения запроса', () => {
      const action = {
        type: getUser.fulfilled.type,
        payload: {
          user: {
            email: 'testEmail',
            name: 'testName'
          }
        }
      };
      const newState = userSlice(initialState, action);
      expect(newState.isLoading).toBe(false);
      expect(newState.error).toBe(null);
      expect(newState.email).toBe(action.payload.user.email);
      expect(newState.name).toBe(action.payload.user.name);
    });
  });

  describe('тестирование асинхронного экшена updateUser', () => {
    test('экшен начала запроса', () => {
      const action = {
        type: updateUser.pending.type
      };
      const newState = userSlice(initialState, action);
      expect(newState.isLoading).toBe(true);
      expect(newState.error).toBe(null);
    });
    test('экшен ошибки запроса', () => {
      const action = {
        type: updateUser.rejected.type,
        error: { message: 'error' }
      };
      const newState = userSlice(initialState, action);
      expect(newState.isLoading).toBe(false);
      expect(newState.error).toBe('error');
    });
    test('экшен успешного выполнения запроса', () => {
      const action = {
        type: updateUser.fulfilled.type,
        payload: {
          user: {
            email: 'testEmail',
            name: 'testName'
          }
        }
      };
      const newState = userSlice(initialState, action);
      expect(newState.isLoading).toBe(false);
      expect(newState.error).toBe(null);
      expect(newState.email).toBe(action.payload.user.email);
      expect(newState.name).toBe(action.payload.user.name);
    });
  });

  describe('тестирование асинхронного экшена logout', () => {
    test('экшен начала запроса', () => {
      const action = {
        type: logout.pending.type
      };
      const newState = userSlice(initialState, action);
      expect(newState.isLoading).toBe(true);
      expect(newState.error).toBe(null);
    });
    test('экшен ошибки запроса', () => {
      const action = {
        type: logout.rejected.type,
        error: { message: 'error' }
      };
      const newState = userSlice(initialState, action);
      expect(newState.isLoading).toBe(false);
      expect(newState.error).toBe('error');
    });
    test('экшен успешного выполнения запроса', () => {
      const action = {
        type: logout.fulfilled.type
      };
      const newState = userSlice(initialState, action);
      expect(newState.isLoading).toBe(false);
      expect(newState.error).toBe(null);
      expect(newState.email).toBe('');
      expect(newState.name).toBe('');
    });
  });
});
