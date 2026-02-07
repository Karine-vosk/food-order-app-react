import { CartContextProvider } from './store/CartContext.jsx';
import { UserProgressProvider } from './store/UserProgressContext.jsx';

import Meals from './components/Meals.jsx';
import Cart from './components/Cart/Cart.jsx';
import Checkout from './components/Checkout.jsx';
import Header from './components/Header.jsx';

function App() {
  return (
    <UserProgressProvider>
      <CartContextProvider>
        <Header />
        <Meals />
        <Cart />
        <Checkout />
      </CartContextProvider>
    </UserProgressProvider>
  );
}

export default App;
