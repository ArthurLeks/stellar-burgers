import { TIngredient } from '@utils-types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';

interface IIngredientsState {
  data: TIngredient[];
  isLoading: boolean;
  error: string | null | undefined;
}

const initialState: IIngredientsState = {
  data: [],
  isLoading: true,
  error: null
};

export const getIngredients = createAsyncThunk(
  'ingredients/getIngredients',
  async function () {
    return await getIngredientsApi();
  }
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    selectAllIngredients: function (state) {
      return state;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoading = false;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  }
});

export const { selectAllIngredients } = ingredientsSlice.selectors;

export default ingredientsSlice.reducer;
