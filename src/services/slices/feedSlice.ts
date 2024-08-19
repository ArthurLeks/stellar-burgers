import {
  getFeedsApi,
  getIngredientsApi,
  getOrderByNumberApi,
  getOrdersApi,
  orderBurgerApi
} from '@api';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TIngredient, TOrder, TConstructorIngredient } from '@utils-types';

interface IFeedState {
  orders: {
    data: TOrder[] | null;
    isLoading: boolean;
  };
  feed: {
    orders: TOrder[];
    total: number;
    totalToday: number;
  };
  ingredients: {
    data: TIngredient[];
    isLoading: boolean;
  };
  constructorItems: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  orderRequest: boolean;
  orderModalData: TOrder | null;
  orderModalDetails: TOrder | null;
  error: string | null | undefined;
}

const initialState: IFeedState = {
  orders: {
    data: null,
    isLoading: true
  },
  feed: {
    orders: [],
    total: 0,
    totalToday: 0
  },
  ingredients: {
    data: [],
    isLoading: true
  },
  constructorItems: {
    bun: null,
    ingredients: []
  },
  orderRequest: false,
  orderModalData: null,
  orderModalDetails: null,
  error: null
};

export const getIngredients = createAsyncThunk(
  'feed/getIngredients',
  async function () {
    return await getIngredientsApi();
  }
);

export const getFeeds = createAsyncThunk('feed/getFeeds', async function () {
  return await getFeedsApi();
});

export const getOrders = createAsyncThunk('feed/getOrders', async function () {
  return await getOrdersApi();
});

export const orderBurger = createAsyncThunk(
  'feed/createOrderBurger',
  async function (data: string[]) {
    return await orderBurgerApi(data);
  }
);

export const getOrderByNumber = createAsyncThunk(
  'feed/getOrderByNumberId',
  async function (id: number) {
    return await getOrderByNumberApi(id);
  }
);

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    addIngredient: function (state, action) {
      if (action.payload.type === 'bun')
        state.constructorItems.bun = action.payload;
      else state.constructorItems.ingredients.push(action.payload);
    },
    removeIngredient: function (state, action) {
      state.constructorItems.ingredients.splice(action.payload, 1);
    },
    moveIngredient: function (state, action) {
      const { index, direction } = action.payload;
      const ingredients = state.constructorItems.ingredients;
      let item = ingredients[index];
      let itemSwitch = ingredients[index + direction];
      if (itemSwitch && item)
        [
          state.constructorItems.ingredients[index],
          state.constructorItems.ingredients[index + direction]
        ] = [itemSwitch, item];
    },
    closeOrderModal: function (state) {
      state.constructorItems.bun = null;
      state.constructorItems.ingredients = [];
      state.orderModalData = null;
      state.orderRequest = false;
    }
  },
  selectors: {
    selectAllIngredients: function (state) {
      return state.ingredients;
    },
    selectFeed: function (state) {
      return state.feed;
    },
    selectAllOrders: function (state) {
      return state.feed.orders;
    },
    selectOrders: function (state) {
      return state.orders;
    },
    selectConstructorItems: function (state) {
      return state.constructorItems;
    },
    selectUserOrder: function (state) {
      return {
        orderRequest: state.orderRequest,
        orderModalData: state.orderModalData
      };
    },
    selectOrderInfo: function (state) {
      return state.orderModalDetails;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.error = null;
        state.ingredients.isLoading = true;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.error = action.error?.message;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.ingredients.data = action.payload;
        state.ingredients.isLoading = false;
      });
    builder
      .addCase(getFeeds.pending, (state) => {
        state.error = null;
        state.ingredients.isLoading = true;
      })
      .addCase(getFeeds.rejected, (state, action) => {
        state.error = action.error?.message;
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.feed.orders = action.payload.orders;
        state.feed.total = action.payload.total;
        state.feed.totalToday = action.payload.totalToday;
      });
    builder
      .addCase(orderBurger.pending, (state) => {
        state.error = null;
        state.orderRequest = true;
      })
      .addCase(orderBurger.rejected, (state, action) => {
        state.error = action.error?.message;
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.constructorItems.bun = null;
        state.constructorItems.ingredients = [];
        state.orderModalData = action.payload.order;
      });
    builder
      .addCase(getOrderByNumber.pending, (state) => {
        state.error = null;
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.error = action.error?.message;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.orderModalDetails = action.payload.orders[0];
      });
    builder
      .addCase(getOrders.pending, (state) => {
        state.error = null;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.error = action.error?.message;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.orders.data = action.payload;
      });
  }
});

export const {
  addIngredient,
  removeIngredient,
  moveIngredient,
  closeOrderModal
} = feedSlice.actions;
export const {
  selectAllIngredients,
  selectFeed,
  selectOrders,
  selectAllOrders,
  selectConstructorItems,
  selectUserOrder,
  selectOrderInfo
} = feedSlice.selectors;
export default feedSlice.reducer;
