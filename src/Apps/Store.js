import { configureStore } from '@reduxjs/toolkit';
import UserSlice from './Reducers/UserSlice';
import cartSlice from './Reducers/cartSlice';
import wishlistReducer from "./Reducers/wishlistSlice";
import orderReducer from "./Reducers/orderSlice";

export const store = configureStore({
  reducer: {
    user: UserSlice,
    cart: cartSlice, 
   wishlist: wishlistReducer,
   orders: orderReducer,
  },
});
