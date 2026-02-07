export const cartTotal = (items) =>
  items.reduce((totalPrice, item) => {
    return totalPrice + item.quantity * item.price;
  }, 0);
