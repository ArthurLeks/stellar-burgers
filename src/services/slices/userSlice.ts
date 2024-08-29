import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  forgotPasswordApi,
  getOrdersApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  resetPasswordApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { deleteCookie } from '../../utils/cookie';
import { TOrder } from '@utils-types';

interface IUserState {
  email: string;
  name: string;
  password: string;
  isLoading: boolean;
  error: string | null | undefined;
  orders: {
    data: TOrder[] | null;
    isLoading: boolean;
  };
}

export const initialState: IUserState = {
  email: '',
  name: '',
  password: '',
  isLoading: true,
  error: null,

  orders: {
    data: null,
    isLoading: true
  }
};

export const getOrders = createAsyncThunk('feed/getOrders', async function () {
  return await getOrdersApi();
});

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async function (data: TRegisterData) {
    return await registerUserApi(data);
  }
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async function (data: TLoginData) {
    return await loginUserApi(data);
  }
);

export const forgotPassword = createAsyncThunk(
  'user/forgotPassword',
  async function (data: { email: string }) {
    return await forgotPasswordApi(data);
  }
);

export const resetPassword = createAsyncThunk(
  'user/resetPassword',
  async function (data: { token: string; password: string }) {
    return await resetPasswordApi(data);
  }
);

export const getUser = createAsyncThunk('user/getUser', async function () {
  return await getUserApi();
});

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async function (data: Partial<TRegisterData>) {
    return await updateUserApi(data);
  }
);

export const logout = createAsyncThunk('user/logout', async function () {
  return await logoutApi();
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  selectors: {
    selectUser: function (state) {
      return state;
    },
    selectOrders: function (state) {
      return state.orders;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        const user = action.payload.user;
        state.email = user.email;
        state.name = user.name;
        state.isLoading = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const user = action.payload.user;
        state.email = user.email;
        state.name = user.name;
        state.isLoading = false;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.error = action.error?.message;
        state.isLoading = false;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(resetPassword.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.error = action.error?.message;
        state.isLoading = false;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(getUser.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.error = action.error?.message;
        state.isLoading = false;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        const user = action.payload.user;
        state.email = user.email;
        state.name = user.name;
        state.isLoading = false;
      })
      .addCase(updateUser.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.error?.message;
        state.isLoading = false;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const user = action.payload.user;
        state.email = user.email;
        state.name = user.name;
        state.isLoading = false;
      })
      .addCase(logout.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(logout.rejected, (state, action) => {
        state.error = action.error?.message;
        state.isLoading = false;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.email = '';
        state.name = '';
        state.isLoading = false;
        localStorage?.removeItem('refreshToken');
        deleteCookie('accessToken');
      })
      .addCase(getOrders.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.error = action.error?.message;
        state.isLoading = false;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.orders.data = action.payload;
        state.isLoading = false;
      });
  }
});

export const { selectUser, selectOrders } = userSlice.selectors;
export default userSlice.reducer;
