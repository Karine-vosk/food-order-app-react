import { use } from 'react';
import Modal from '../UI/Modal.jsx';
import CartContext from '../../store/CartContext.jsx';
import { currencyFormatter } from '../../util/formatting.js';
import Button from '../UI/Button.jsx';
import UserProgressContext from '../../store/UserProgressContext.jsx';
import CartItem from './CartItem.jsx';
import { cartTotal } from '../../util/helpers.js';

const Cart = () => {
  const { progress, showCheckout, hideCart } = use(UserProgressContext);
  const { items, removeItem, addItem } = use(CartContext);
  const total = cartTotal(items);

  function handleGoToCheckout() {
    showCheckout();
  }

  function handleCloseCart() {
    hideCart();
  }

  return (
    <Modal
      className='cart'
      open={progress === 'cart'}
      onClose={progress === 'cart' ? handleCloseCart : null}
    >
      <h2>Your modal</h2>

      <ul>
        {items.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            quantity={item.quantity}
            price={item.price}
            onIncrease={() => addItem(item)}
            onDecrease={() => removeItem(item.id)}
          />
        ))}
      </ul>
      <p className='cart-total'>{currencyFormatter.format(total)}</p>
      <p className='modal-actions'>
        <Button textOnly onClick={handleCloseCart}>
          {' '}
          Close
        </Button>
        {items.length > 0 && (
          <Button onClick={handleGoToCheckout}>Go to checkout</Button>
        )}
      </p>
    </Modal>
  );
};

export default Cart;
