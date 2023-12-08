import { configureStore,  } from '@reduxjs/toolkit';
import {cart} from './cart';
import { mealsSlice } from './meals';
import  userSlice  from './user';

const store = configureStore({
    reducer: {cart: cart.reducer, meal: mealsSlice.reducer, user: userSlice.reducer},
});

export default store;

