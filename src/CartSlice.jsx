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
        // If the item exists, increment its quantity
        existingItem.quantity += 1;
      } else {
        // Add a new item to the cart with an initial quantity of 1
        state.items.push({ name, image, cost, quantity: 1 });
      }
      // Recalculate the total quantity of items in the cart
      state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
    },
    
    // Reducer to remove an item from the cart
    removeItem: (state, action) => {
      const { name } = action.payload;
      // Remove the item by filtering it out from the state
      state.items = state.items.filter(item => item.name !== name);
      // Recalculate the total quantity of items in the cart after the removal
      state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
    },
    
    // Reducer to update the quantity of a specific item
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      // Find the item to update based on its name
      const itemToUpdate = state.items.find(item => item.name === name);
      
      if (itemToUpdate) {
        // Update the item's quantity
        itemToUpdate.quantity = quantity;
        
        // If the quantity becomes 0 or less, remove the item from the cart
        if (itemToUpdate.quantity <= 0) {
          state.items = state.items.filter(item => item.name !== name);
        }
      }
      // Recalculate the total quantity of items after updating
      state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
    },
  },
});

// Export the reducer actions for dispatching
export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

// Export the reducer for store configuration
export default CartSlice.reducer;
