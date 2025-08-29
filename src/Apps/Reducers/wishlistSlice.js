// src/Apps/Reducers/wishlistSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Load wishlist from localStorage if it exists
const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

const initialState = {
  items: savedWishlist,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const exists = state.items.find(item => item.id === action.payload.id);
      if (!exists) state.items.push({ ...action.payload, quantity: 1 });
      localStorage.setItem("wishlist", JSON.stringify(state.items));
    },
    removeFromWishlist: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      localStorage.setItem("wishlist", JSON.stringify(state.items));
    },
    clearWishlist: (state) => {
      state.items = [];
      localStorage.removeItem("wishlist");
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
