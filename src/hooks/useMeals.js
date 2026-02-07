import useHttp from './useHttp';
import { currencyFormatter } from '../util/formatting';
import { API_BASE } from '../util/config';

const config = { method: 'GET' };

export const useMeals = () => {
  const { error, isLoading, data } = useHttp(
    `${API_BASE}/meals`,
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
