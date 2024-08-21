import { TConstructorIngredient, TOrder } from '@utils-types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { orderBurgerApi } from '@api';

interface IConstructorState {
  constructorItems: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  orderRequest: boolean;
  orderModalData: TOrder | null;
  error: string | null | undefined;
}

const initialState: IConstructorState = {
  constructorItems: {
    bun: null,
    ingredients: []
  },
  orderRequest: false,
  orderModalData: null,
  error: null
};

export const orderBurger = createAsyncThunk(
  'feed/createOrderBurger',
  async function (data: string[]) {
    return await orderBurgerApi(data);
  }
);

const constructorSlice = createSlice({
  name: 'constructorItems',
  initialState,
  selectors: {
    selectConstructorItems: function (state) {
      return state.constructorItems;
    },
    selectUserOrder: function (state) {
      return {
        orderRequest: state.orderRequest,
        orderModalData: state.orderModalData
      };
    }
  },
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

      if (direction === 'up') {
        if (index > 0) {
          ingredients.splice(index - 1, 0, ingredients.splice(index, 1)[0]);
        }
      } else if (direction === 'down') {
        if (index < ingredients.length - 1) {
          ingredients.splice(index + 1, 0, ingredients.splice(index, 1)[0]);
        }
      }
    },
    closeOrderModal: function (state) {
      state.constructorItems.bun = null;
      state.constructorItems.ingredients = [];
      state.orderModalData = null;
      state.orderRequest = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderBurger.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
      })
      .addCase(orderBurger.rejected, (state) => {
        state.orderRequest = false;
      });
  }
});

export const {
  addIngredient,
  removeIngredient,
  moveIngredient,
  closeOrderModal
} = constructorSlice.actions;

export const { selectConstructorItems, selectUserOrder } =
  constructorSlice.selectors;
export default constructorSlice.reducer;
