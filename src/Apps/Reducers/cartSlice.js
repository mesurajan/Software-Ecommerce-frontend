// src/Apps/Reducers/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const savedCart = JSON.parse(localStorage.getItem("cart")) || {
  count: 0,
  items: [],
};

const initialState = savedCart;

const saveCart = (state) => {
  localStorage.setItem("cart", JSON.stringify(state));
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existing = state.items.find((item) => item.id === product.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }
      state.count += 1;
      saveCart(state);
    },

    removeFromCart: (state, action) => {
      const productId = action.payload.id;
      const existing = state.items.find((item) => item.id === productId);
      if (existing) {
        state.count -= existing.quantity;
        state.items = state.items.filter((item) => item.id !== productId);
      }
      if (state.count < 0) state.count = 0;
      saveCart(state);
    },

    clearCart: (state) => {
      state.count = 0;
      state.items = [];
      saveCart(state);
    },

    increaseQuantity: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) {
        item.quantity += 1;
        state.count += 1;
        saveCart(state);
      }
    },

    decreaseQuantity: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        state.count -= 1;
      } else if (item && item.quantity === 1) {
        // Remove item completely if reaching 0
        state.items = state.items.filter((i) => i.id !== action.payload.id);
        state.count -= 1;
      }
      if (state.count < 0) state.count = 0;
      saveCart(state);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
