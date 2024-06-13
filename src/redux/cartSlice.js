import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    add(state, action) {
      const existingItem = state.find((item) => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    },
    remove(state, action) {
      return state.filter((item) => item.id !== action.payload);
    },
    decreaseQuantity(state, action) {
      const existingItem = state.find((item) => item.id === action.payload);
      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity--;
      }
    },
    increaseQuantity(state, action) {
      const existingItem = state.find((item) => item.id === action.payload);
      if (existingItem) {
        existingItem.quantity++;
      }
    },
    removeAll(state, action) {
      return [];
    },
    setQuantity(state, action) {
      const { productId, quantity } = action.payload;
      const item = state.cart.find((item) => item.id === productId);
      if (item) {
        item.quantity = quantity;
      }
    },
  },
});

export const { add, remove, decreaseQuantity, removeAll, increaseQuantity , setQuantity} =
  cartSlice.actions;
export default cartSlice.reducer;
