import { getFeedsApi } from '@api';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

interface IFeedState {
  orders: TOrder[];
  total: number;
  totalToday: number;
  error: string | null | undefined;
  loading: boolean;
}

export const initialState: IFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  error: null,
  loading: false
};

export const getFeeds = createAsyncThunk('feed/getFeeds', async function () {
  return await getFeedsApi();
});

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    selectFeed: function (state) {
      return state;
    },
    selectAllOrders: function (state) {
      return state.orders;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(getFeeds.rejected, (state, action) => {
        state.error = action.error?.message;
        state.loading = false;
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.loading = false;
      });
  }
});

export const { selectFeed, selectAllOrders } = feedSlice.selectors;
export default feedSlice.reducer;
