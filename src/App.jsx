import { CartContextProvider } from './store/CartContext.jsx';
import { UserProgressProvider } from './store/UserProgressContext.jsx';

import Meals from './components/Meals.jsx';
import Cart from './components/Cart/Cart.jsx';
import Checkout from './components/Checkout.jsx';
import CustomHeader from './components/CustomHeader.jsx';

function App() {
  return (
    <UserProgressProvider>
      <CartContextProvider>
        <CustomHeader />
        <Meals />
        <Cart />
        <Checkout />
      </CartContextProvider>
    </UserProgressProvider>
  );
}

export default App;
