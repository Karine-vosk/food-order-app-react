import { use } from 'react';
import logoImg from '../assets/logo.jpg';
import Button from './UI/Button';
import CartContext from '../store/CartContext.jsx';
import UserProgressContext from '../store/UserProgressContext.jsx';

const Header = () => {
  const { items } = use(CartContext);
  const { showCart } = use(UserProgressContext);

  function handleShowCart() {
    showCart();
  }

  const totalCarts = items.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  return (
    <header id='main-header'>
      <div id='title'>
        <img src={logoImg} alt='logo' />
        <h1>React Food</h1>
      </div>
      <nav>
        <Button onClick={handleShowCart}>Cart({totalCarts})</Button>
      </nav>
    </header>
  );
};

export default Header;
