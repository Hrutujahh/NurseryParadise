import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
    totalQuantity: 0, // Initialize totalQuantity
  },
  reducers: {
    // Reducer to add an item to the cart
    addItem: (state, action) => {
      const { name, image, cost } = action.payload;
      const existingItem = state.items.find(item => item.name === name);
      
      if (existingItem) {
        // If item exists, increment its quantity
        existingItem.quantity++;
      } else {
        // Otherwise, add a new item to the cart with quantity 1
        state.items.push({ name, image, cost, quantity: 1 });
      }
      // Update the total quantity of items in the cart
      state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
    },
    
    // Reducer to remove an item from the cart
    removeItem: (state, action) => {
      const { name } = action.payload;
      // Filter out the item to be removed by name
      state.items = state.items.filter(item => item.name !== name);
      // Update the total quantity of items in the cart after removal
      state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
    },
    
    // Reducer to update the quantity of an item in the cart
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      // Find the item to update by its name
      const itemToUpdate = state.items.find(item => item.name === name);
      if (itemToUpdate) {
        // Update the quantity of the item
        itemToUpdate.quantity = quantity;
        // Update the total quantity of items in the cart after updating the item
        state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
      }
    },
  },
});

// Export the reducer actions for dispatching
export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

// Export the reducer for store configuration
export default CartSlice.reducer;

