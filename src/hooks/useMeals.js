import useHttp from './useHttp';
import { currencyFormatter } from '../util/formatting';

const config = { method: 'GET' };

export const useMeals = () => {
  const { error, isLoading, data } = useHttp(
    'http://localhost:3000/meals',
    config,
    [],
  );

  const normalizeResp = data.map((item) => {
    return {
      ...item,
      labeledPrice: currencyFormatter.format(item.price),
    };
  });

  return { error, loadMeals: normalizeResp, isLoading };
};
