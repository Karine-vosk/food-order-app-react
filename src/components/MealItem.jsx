import { useContext } from 'react';
import Button from './UI/Button.jsx';
import CartContext from '../store/CartContext.jsx';
import { API_BASE } from '../util/config.js';

const MealItem = ({ meal }) => {
  const { addItem } = useContext(CartContext);

  function handleAddItemToCart() {
    addItem(meal);
  }

  const imageSrc = API_BASE.startsWith('http') ? `${API_BASE}/${meal.image}` : `/${meal.image}`;

  return (
    <li className='meal-item'>
      <article>
        <img src={imageSrc} alt='meal image' />
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
