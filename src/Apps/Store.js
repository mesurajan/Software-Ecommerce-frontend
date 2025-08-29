import { configureStore } from '@reduxjs/toolkit';
import UserSlice from './Reducers/UserSlice';
import cartSlice from './Reducers/cartSlice';
import wishlistReducer from "./Reducers/wishlistSlice";

export const store = configureStore({
  reducer: {
    user: UserSlice,
    cart: cartSlice, 
   wishlist: wishlistReducer,
  },
});
