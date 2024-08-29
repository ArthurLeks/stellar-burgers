import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import userReducer from './slices/userSlice';
import feedReducer from './slices/feedSlice';
import ingredientsReducer from './slices/ingredientsSlice';
import orderDetailsReducer from './slices/orderDetailsSlice';
import constructorReducer from './slices/constructorSlice';

export const rootReducer = combineReducers({
  user: userReducer,
  feed: feedReducer,
  ingredients: ingredientsReducer,
  orderDetails: orderDetailsReducer,
  constructorItems: constructorReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
