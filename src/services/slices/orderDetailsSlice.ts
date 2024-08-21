import { TOrder } from '@utils-types';
import { getOrderByNumberApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface IOrderDetailsState {
  data: TOrder | null;
  isLoading: boolean;
  error: string | null | undefined;
}

const initialState: IOrderDetailsState = {
  data: null,
  isLoading: true,
  error: null
};

export const getOrderByNumber = createAsyncThunk(
  'orders/getOrderByNumberId',
  async function (id: number) {
    return await getOrderByNumberApi(id);
  }
);

export const orderDetailsSlice = createSlice({
  name: 'orderDetails',
  initialState,
  reducers: {},
  selectors: {
    selectOrderInfo: function (state) {
      return state.data;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrderByNumber.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.data = action.payload.orders[0];
        state.isLoading = false;
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  }
});

export const { selectOrderInfo } = orderDetailsSlice.selectors;
export default orderDetailsSlice.reducer;
