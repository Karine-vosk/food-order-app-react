import { useContext } from 'react';
import { currencyFormatter } from '../util/formatting.js';
import Button from './UI/Button.jsx';
import CartContext from '../store/CartContext.jsx';

const MealItem = ({ meal }) => {
  const { addItem } = useContext(CartContext);

  function handleAddItemToCart() {
    addItem(meal);
  }

  return (
    <li className='meal-item'>
      <article>
        <img src={`http://localhost:3000/${meal.image}`} alt='meal image' />
        <div>
          <h3>{meal.name}</h3>
          <p className='meal-item-price'>{meal.labeledPrice}</p>

          <p className='meal-item-description'>{meal.description}</p>
        </div>

        <div className='meal-item-actions'>
          <Button onClick={handleAddItemToCart}>Add to Cart</Button>
        </div>
      </article>
    </li>
  );
};

export default MealItem;
