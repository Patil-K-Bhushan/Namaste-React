import { createSlice } from "@reduxjs/toolkit";

const calculateTotals = (items) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return {
    totalItems,
    subtotal,
  };
};

const initialState = {
  items: [],
  totalItems: 0,
  subtotal: 0,
};

const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {
    addItem: (state, action) => {
      const { id } = action.payload;

      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          ...action.payload,
          quantity: 1,
        });
      }

      Object.assign(state, calculateTotals(state.items));
    },

    removeItem: (state, action) => {
      const { id } = action.payload;

      state.items = state.items.filter((item) => item.id !== id);

      Object.assign(state, calculateTotals(state.items));
    },

    increaseQuantity: (state, action) => {
      const { id } = action.payload;

      const item = state.items.find((item) => item.id === id);

      if (item) {
        item.quantity += 1;
      }

      Object.assign(state, calculateTotals(state.items));
    },

    decreaseQuantity: (state, action) => {
      const { id } = action.payload;

      const item = state.items.find((item) => item.id === id);

      if (!item) return;

      if (item.quantity === 1) {
        state.items = state.items.filter((i) => i.id !== id);
      } else {
        item.quantity -= 1;
      }

      Object.assign(state, calculateTotals(state.items));
    },

    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.subtotal = 0;
    },
  },
});

export const {
  addItem,
  removeItem,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
