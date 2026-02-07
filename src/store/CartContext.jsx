import { createContext, useReducer } from 'react';

function getIndex(items, id) {
  return items.findIndex((item) => item.id === id);
}

function getUpdatedItem(item, action) {
  return {
    ...item,
    quantity: action === 'decrease' ? item.quantity - 1 : item.quantity + 1,
  };
}

const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {},
});

function cartReducer(state, action) {
  if (action.type === 'ADD_ITEM') {
    const existingItemIndex = getIndex(state.items, action.item.id);

    const updatedItems = [...state.items];
    if (existingItemIndex > -1) {
      const existingItem = updatedItems[existingItemIndex];
      updatedItems[existingItemIndex] = getUpdatedItem(
        existingItem,
        'increase',
      );
    } else {
      updatedItems.push({ ...action.item, quantity: 1 });
    }
    return { ...state, items: updatedItems };
  }

  if (action.type === 'REMOVE_ITEM') {
    const existingItemIndex = getIndex(state.items, action.id);

    const existingItem = state.items[existingItemIndex];
    const updatedItems = [...state.items];

    if (existingItem.quantity === 1) {
      updatedItems.splice(existingItemIndex, 1);
    } else {
      const updatedItem = getUpdatedItem(existingItem, 'decrease');

      updatedItems[existingItemIndex] = updatedItem;
    }
    return { ...state, items: updatedItems };
  }

  if (action.type === 'CLEAR_CART') {
    return { ...state, items: [] };
  }

  return state;
}

export function CartContextProvider({ children }) {
  const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });
  function addItem(item) {
    dispatchCartAction({
      type: 'ADD_ITEM',
      item,
    });
  }

  function removeItem(id) {
    dispatchCartAction({
      type: 'REMOVE_ITEM',
      id,
    });
  }

  function clearCart() {
    dispatchCartAction({
      type: 'CLEAR_CART',
    });
  }

  const cartContextValue = {
    items: cart.items,
    addItem,
    removeItem,
    clearCart,
  };

  return (
    <CartContext.Provider value={cartContextValue}>
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;
