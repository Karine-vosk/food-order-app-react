import { currencyFormatter } from '../../util/formatting.js';

const CartItem = ({ name, quantity, price, onIncrease, onDecrease }) => {
  return (
    <li className='cart-item'>
      <p>
        {name} - {quantity} x {currencyFormatter.format(price)}
      </p>
      <div className='cart-item-actions'>
        <button onClick={onIncrease}>+</button>
        <span>{quantity}</span>
        <button onClick={onDecrease}>-</button>
      </div>
    </li>
  );
};

export default CartItem;
