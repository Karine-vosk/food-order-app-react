import MealItem from './MealItem.jsx';
import { useMeals } from '../hooks/useMeals.js';
import Error from './Error.jsx';

const Meals = () => {
  const { error, isLoading, loadMeals } = useMeals();

  //todo - useLayoutEffect vs useEffect

  if (isLoading) {
    <p className='center'>Fetching meals</p>;
  }

  if (error) {
    return <Error title='Failed fetch meals.' message={error} />;
  }

  return (
    <>
      <ul id='meals'>
        {loadMeals.map((meal) => (
          <MealItem meal={meal} key={meal.id} />
        ))}
      </ul>
    </>
  );
};

export default Meals;
